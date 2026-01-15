import { CategoryEntity } from '@/app/category/category.entity';
import { CategoryRepository } from '@/app/category/category.repository';
import {
	CreateCategoryDtoRequest,
	FindAllCategoryDtoQuery,
	PaginationCategoryDtoResponse,
	UpdateCategoryDtoRequest,
} from '@/app/category/dto';
import { DefaultWhereOrder, DefaultWhereSort, createUniqueSlugHelper } from '@/default';
import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, Like } from 'typeorm';

@Injectable()
export class CategoryService {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async create(request: CreateCategoryDtoRequest): Promise<CategoryEntity> {
		try {
			const slug = createUniqueSlugHelper(request.slug);
			await this.conflicCategory(slug);
			const entity = this.categoryRepository.create({
				...request,
				slug,
			});

			Logger.log('CATEGORY_SERVICE#CREATE');
			return await this.categoryRepository.save(entity);
		} catch (error) {
			Logger.error('CATEGORY_SERVICE#CREATE', error);
			throw error;
		}
	}

	async findAll(
		query: FindAllCategoryDtoQuery,
	): Promise<PaginationCategoryDtoResponse> {
		try {
			const {
				page = 1,
				limit = 10,
				sort = DefaultWhereSort.CREATED_AT,
				order = DefaultWhereOrder.DESC,
				search,
			} = query;

			const where: FindOptionsWhere<CategoryEntity>[] = search
				? [{ name: Like(`%${search}%`) }, { slug: Like(`%${search}%`) }]
				: [{}];

			const [data, count] = await this.categoryRepository.findAndCount({
				where,
				order: { [sort]: order },
				skip: (page - 1) * limit,
				take: limit,
			});

			Logger.log('CATEGORY_SERVICE#FIND_ALL');

			return {
				data,
				meta: {
					page,
					limit,
					count,
					pages: Math.ceil(count / limit),
				},
			};
		} catch (error) {
			Logger.error('CATEGORY_SERVICE#FIND_ALL', error);
			throw error;
		}
	}

	async findOne(id: string, withDeleted = false): Promise<CategoryEntity> {
		try {
			const entity = await this.categoryRepository.findOne({
				where: { id },
				withDeleted,
			});

			if (!entity) {
				Logger.log('CATEGORY_SERVICE#FIND_ONE');
				throw new NotFoundException('Category not found');
			}

			Logger.log('CATEGORY_SERVICE#FIND_ONE');
			return entity;
		} catch (error) {
			Logger.error('CATEGORY_SERVICE#FIND_ONE', error);
			throw error;
		}
	}

	async update(id: string, request: UpdateCategoryDtoRequest): Promise<CategoryEntity> {
		try {
			const entity = await this.findOne(id);

			if (request.slug && request.slug !== entity.slug) {
				await this.conflicCategory(request.slug);
			}

			await this.categoryRepository.update(entity.id, {
				...request,
				slug: request.slug ? createUniqueSlugHelper(request.slug) : entity.slug,
			});

			Logger.log('CATEGORY_SERVICE#UPDATE');
			return this.findOne(entity.id);
		} catch (error) {
			Logger.error('CATEGORY_SERVICE#UPDATE', error);
			throw error;
		}
	}

	async delete(id: string): Promise<void> {
		try {
			await this.findOne(id);
			await this.categoryRepository.softDelete(id);
			Logger.log('CATEGORY_SERVICE#DELETE');
		} catch (error) {
			Logger.error('CATEGORY_SERVICE#DELETE', error);
			throw error;
		}
	}

	async restore(id: string): Promise<void> {
		try {
			const entity = await this.findOne(id, true);
			await this.categoryRepository.restore(entity.id);
			Logger.log('CATEGORY_SERVICE#RESTORE');
		} catch (error) {
			Logger.error('CATEGORY_SERVICE#RESTORE', error);
			throw error;
		}
	}

	async forceDelete(id: string): Promise<void> {
		try {
			const entity = await this.findOne(id);
			await this.categoryRepository.delete(entity.id);
			Logger.log('CATEGORY_SERVICE#FORCE_DELETE');
		} catch (error) {
			Logger.error('CATEGORY_SERVICE#FORCE_DELETE', error);
			throw error;
		}
	}

	private async conflicCategory(slug: string): Promise<void> {
		const entity = await this.categoryRepository.findOneBy({ slug });

		if (entity) {
			Logger.log('CATEGORY_SERVICE#CONFLICT', entity);
			throw new ConflictException('Category already exists');
		}
	}
}
