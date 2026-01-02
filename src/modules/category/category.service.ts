import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, ILike, IsNull } from 'typeorm';
import {
	CategoryContract,
	CreateCategoryRequest,
	FindAllCategoryWhereRequest,
	FindOneCategoryWhereRequest,
	UpdateCategoryRequest,
} from './category.contract';
import { CategoryEntity } from './category.entity';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService implements CategoryContract {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async create(request: CreateCategoryRequest): Promise<CategoryEntity> {
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

	async findAll(
		query: FindAllCategoryWhereRequest,
	): Promise<[CategoryEntity[], number]> {
		const { offset, limit = 10, search, sort, order, page } = query;
		const where: FindOptionsWhere<CategoryEntity>[] = [];

		if (search) {
			where.push(
				{ deletedAt: IsNull(), name: ILike(`%${search}%`) },
				{ deletedAt: IsNull(), slug: ILike(`%${search}%`) },
			);
		} else {
			where.push({
				deletedAt: IsNull(),
			});
		}

		return this.categoryRepository.findAndCount({
			where,
			skip: page ? (page - 1) * limit : offset,
			take: limit,
			order: {
				[sort as string]: order,
			},
		});
	}

	async findOne(
		id: string,
		request?: FindOneCategoryWhereRequest,
	): Promise<CategoryEntity> {
		try {
			const entity = await this.categoryRepository.findOne({
				where: { id },
				withDeleted: request?.withDeleted || false,
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

	async update(id: string, request: UpdateCategoryRequest): Promise<CategoryEntity> {
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
			const entity = await this.findOne(id, {
				withDeleted: true,
			});

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
			Logger.error(
				'ERROR, CATEGORY#CATEGORY_SERVICE.CHECK_SAME_CATEGORY',
				'category already exists',
				entity,
			);
			throw new ConflictException('category already exists');
		}
	}
}
