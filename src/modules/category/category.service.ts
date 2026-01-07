import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, ILike } from 'typeorm';
import {
	DEFAULT_ALLOWED_SORT,
	DefaultWhereOrder,
	DefaultWhereStatus,
} from '../../default';
import {
	CategoryContract,
	CategoryPaginationResponse,
	CategoryProperties,
	CreateCategoryRequest,
	FindAllCategoryRequest,
	UpdateCategoryRequest,
} from './category.contract';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService implements CategoryContract {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async create(request: CreateCategoryRequest): Promise<CategoryProperties> {
		try {
			await this.checkSameCategory(request.slug);
			const entity = this.categoryRepository.create({ ...request });

			Logger.log('SUCCESS, CATEGORY#CATEGORY_SERVICE.CREATE', entity);
			return this.categoryRepository.save(entity);
		} catch (error) {
			Logger.error('ERROR, CATEGORY#CATEGORY_SERVICE.CREATE', error);
			throw error;
		}
	}

	async findAll(query: FindAllCategoryRequest): Promise<CategoryPaginationResponse> {
		try {
			const {
				page = 1,
				limit = 10,
				offset,
				order = DefaultWhereOrder.DESC,
				sort = DEFAULT_ALLOWED_SORT[0],
				search,
				status = DefaultWhereStatus.ALL,
			} = query;

			const where: FindOptionsWhere<CategoryProperties>[] = search
				? [{ name: ILike(`%${search}%`) }, { slug: ILike(`%${search}%`) }]
				: [{}];

			if (status !== DefaultWhereStatus.ALL) {
				where.forEach((entity) => {
					Object.assign(entity, {
						isActive: status === DefaultWhereStatus.ACTIVE,
					});
				});
			}
			const skip = offset ?? (page - 1) * limit;
			const sortBy = DEFAULT_ALLOWED_SORT.includes(sort)
				? sort
				: DEFAULT_ALLOWED_SORT[0];

			const [data, total] = await this.categoryRepository.findAndCount({
				where,
				order: { [sortBy]: order },
				skip,
				take: limit,
			});

			Logger.log('SUCCESS, CATEGORY#CATEGORY_SERVICE.FIND_ALL', data);

			return {
				data,
				meta: {
					offset: skip,
					limit,
					total,
				},
			};
		} catch (error) {
			Logger.error('ERROR, CATEGORY#CATEGORY_SERVICE.FIND_ALL', error);
			throw error;
		}
	}

	async findOne(id: string, withDeleted: boolean = false): Promise<CategoryProperties> {
		try {
			const entity = await this.categoryRepository.findOne({
				where: { id },
				withDeleted,
			});

			if (!entity) {
				Logger.error(
					'ERROR, CATEGORY#CATEGORY_SERVICE.FIND_ONE',
					'category not found',
					entity,
				);
				throw new NotFoundException('category not found');
			}

			Logger.log('SUCCESS, CATEGORY#CATEGORY_SERVICE.FIND_ONE', entity);
			return entity;
		} catch (error) {
			Logger.error('ERROR, CATEGORY#CATEGORY_SERVICE.FIND_ONE', error);
			throw error;
		}
	}

	async update(
		id: string,
		request: UpdateCategoryRequest,
	): Promise<CategoryProperties> {
		try {
			const entity = await this.findOne(id);

			if (request.slug && request.slug !== entity.slug) {
				await this.checkSameCategory(request.slug);
			}

			Logger.log('SUCCESS, CATEGORY#CATEGORY_SERVICE.UPDATE', entity);
			return this.categoryRepository.save({ ...entity, ...request });
		} catch (error) {
			Logger.error('ERROR, CATEGORY#CATEGORY_SERVICE.UPDATE', error);
			throw error;
		}
	}

	async delete(id: string): Promise<void> {
		try {
			const entity = await this.findOne(id);

			Logger.log('SUCCESS, CATEGORY#CATEGORY_SERVICE.DELETE', entity);
			await this.categoryRepository.softDelete(entity.id);
		} catch (error) {
			Logger.error('ERROR, CATEGORY#CATEGORY_SERVICE.DELETE', error);
			throw error;
		}
	}

	async restore(id: string): Promise<void> {
		try {
			const entity = await this.findOne(id, true);

			Logger.log('SUCCESS, CATEGORY#CATEGORY_SERVICE.RESTORE', entity);
			await this.categoryRepository.restore(entity.id);
		} catch (error) {
			Logger.error('ERROR, CATEGORY#CATEGORY_SERVICE.RESTORE', error);
			throw error;
		}
	}

	async forceDelete(id: string): Promise<void> {
		try {
			const entity = await this.findOne(id);

			Logger.log('SUCCESS, CATEGORY#CATEGORY_SERVICE.FORCE_DELETE', entity);
			await this.categoryRepository.delete(entity.id);
		} catch (error) {
			Logger.error('ERROR, CATEGORY#CATEGORY_SERVICE.FORCE_DELETE', error);
			throw error;
		}
	}

	private async checkSameCategory(slug: string): Promise<void> {
		const entity = await this.categoryRepository.findOne({ where: { slug } });

		if (entity) {
			throw new ConflictException('category already exists');
		}
	}
}
