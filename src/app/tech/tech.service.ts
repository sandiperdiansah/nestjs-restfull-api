import {
	CreateTechDtoRequest,
	FindAllTechDtoQuery,
	PaginationTechDtoResponse,
	UpdateTechDtoRequest,
} from '@/app/tech/dto';
import { TechEntity } from '@/app/tech/tech.entity';
import { TechRepository } from '@/app/tech/tech.repository';
import { DefaultWhereOrder, DefaultWhereSort, createUniqueSlugHelper } from '@/default';
import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, Like } from 'typeorm';

@Injectable()
export class TechService {
	constructor(private readonly techRepository: TechRepository) {}

	async create(request: CreateTechDtoRequest): Promise<TechEntity> {
		try {
			const slug = createUniqueSlugHelper(request.slug);
			await this.conflicTech(slug);
			const entity = this.techRepository.create({
				...request,
				slug,
			});

			Logger.log('TECH_SERVICE#CREATE');
			return await this.techRepository.save(entity);
		} catch (error) {
			Logger.error('TECH_SERVICE#CREATE', error);
			throw error;
		}
	}

	async findAll(query: FindAllTechDtoQuery): Promise<PaginationTechDtoResponse> {
		try {
			const {
				page = 1,
				limit = 10,
				sort = DefaultWhereSort.CREATED_AT,
				order = DefaultWhereOrder.DESC,
				search,
			} = query;

			const where: FindOptionsWhere<TechEntity>[] = search
				? [{ name: Like(`%${search}%`) }, { slug: Like(`%${search}%`) }]
				: [{}];

			const [data, count] = await this.techRepository.findAndCount({
				where,
				order: { [sort]: order },
				skip: (page - 1) * limit,
				take: limit,
			});

			Logger.log('TECH_SERVICE#FIND_ALL');

			return {
				data,
				meta: {
					page,
					limit,
					count: count,
					pages: Math.ceil(count / limit),
				},
			};
		} catch (error) {
			Logger.error('PROJECT_SERVICE#FIND_ALL', error);
			throw error;
		}
	}

	async findOne(id: string, withDeleted = false): Promise<TechEntity> {
		try {
			const entity = await this.techRepository.findOne({
				where: { id },
				withDeleted,
			});

			if (!entity) {
				Logger.log('TECH_SERVICE#FIND_ONE');
				throw new NotFoundException('Tech not found');
			}

			Logger.log('TECH_SERVICE#FIND_ONE');
			return entity;
		} catch (error) {
			Logger.error('TECH_SERVICE#FIND_ONE', error);
			throw error;
		}
	}

	async update(id: string, request: UpdateTechDtoRequest): Promise<TechEntity> {
		try {
			const entity = await this.findOne(id);

			if (request.slug && request.slug !== entity.slug) {
				await this.conflicTech(request.slug);
			}

			await this.techRepository.update(entity.id, {
				...request,
				slug: request.slug ? createUniqueSlugHelper(request.slug) : entity.slug,
			});

			Logger.log('TECH_SERVICE#UPDATE');
			return this.findOne(entity.id);
		} catch (error) {
			Logger.error('TECH_SERVICE#UPDATE', error);
			throw error;
		}
	}

	async delete(id: string): Promise<void> {
		try {
			await this.findOne(id);
			await this.techRepository.softDelete(id);
			Logger.log('TECH_SERVICE#DELETE');
		} catch (error) {
			Logger.error('TECH_SERVICE#DELETE', error);
			throw error;
		}
	}

	async restore(id: string): Promise<void> {
		try {
			const entity = await this.findOne(id, true);
			await this.techRepository.restore(entity.id);
			Logger.log('TECH_SERVICE#RESTORE');
		} catch (error) {
			Logger.error('TECH_SERVICE#RESTORE', error);
			throw error;
		}
	}

	async forceDelete(id: string): Promise<void> {
		try {
			const entity = await this.findOne(id);
			await this.techRepository.delete(entity.id);
			Logger.log('TECH_SERVICE#FORCE_DELETE');
		} catch (error) {
			Logger.error('TECH_SERVICE#FORCE_DELETE', error);
			throw error;
		}
	}

	private async conflicTech(slug: string): Promise<void> {
		const entity = await this.techRepository.findOneBy({ slug });

		if (entity) {
			Logger.log('TECH_SERVICE#CONFLICT', entity);
			throw new ConflictException('Tech already exists');
		}
	}
}
