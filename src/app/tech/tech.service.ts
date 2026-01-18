import {
	CreateTechDtoRequest,
	FindAllTechDtoRequest,
	FindOneTechDtoRequest,
	PaginationTechDtoResponse,
	UpdateTechDtoRequest,
} from '@/app/tech/dto';
import { TechEntity } from '@/app/tech/tech.entity';
import { TechRepository } from '@/app/tech/tech.repository';
import { DefaultWhereSort, createUniqueSlugHelper } from '@/default';
import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, ILike } from 'typeorm';

@Injectable()
export class TechService {
	constructor(private readonly techRepository: TechRepository) {}

	async create(request: CreateTechDtoRequest): Promise<TechEntity> {
		try {
			const slug = createUniqueSlugHelper(request.slug);
			await this.conflicTech({ slug });
			const entity = this.techRepository.create({
				...request,
				slug,
			});

			Logger.log('TECH_SERVICE#CREATE');
			return this.techRepository.save(entity);
		} catch (error) {
			Logger.error('TECH_SERVICE#CREATE', error);
			throw error;
		}
	}

	async findAll(request: FindAllTechDtoRequest): Promise<PaginationTechDtoResponse> {
		try {
			const { page = 1, limit = 10, sort, order, search } = request;

			const where: FindOptionsWhere<TechEntity>[] = search
				? [{ name: ILike(`%${search}%`) }, { slug: ILike(`%${search}%`) }]
				: [{}];

			const [data, count] = await this.techRepository.findAndCount({
				where,
				order: { [sort as DefaultWhereSort]: order },
				skip: (page - 1) * limit,
				take: limit,
			});

			Logger.log('TECH_SERVICE#FIND_ALL');

			return {
				meta: {
					page,
					limit,
					count,
					pages: Math.ceil(count / limit),
				},
				data,
			};
		} catch (error) {
			Logger.error('TECH_SERVICE#FIND_ALL', error);
			throw error;
		}
	}

	async findOne(request: FindOneTechDtoRequest): Promise<TechEntity> {
		try {
			const { id, withDeleted } = request;

			const entity = await this.techRepository.findOne({
				where: { id },
				withDeleted,
			});

			if (!entity) {
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
			const entity = await this.findOne({ id });

			if (request.slug && request.slug !== entity.slug) {
				await this.conflicTech({ slug: request.slug });
			}

			await this.techRepository.update(entity.id, {
				...request,
				slug: request.slug ? createUniqueSlugHelper(request.slug) : entity.slug,
			});

			Logger.log('TECH_SERVICE#UPDATE');
			return this.findOne({ id });
		} catch (error) {
			Logger.error('TECH_SERVICE#UPDATE', error);
			throw error;
		}
	}

	async delete(id: string): Promise<void> {
		try {
			await this.findOne({ id });
			Logger.log('TECH_SERVICE#DELETE');

			await this.techRepository.softDelete(id);
		} catch (error) {
			Logger.error('TECH_SERVICE#DELETE', error);
			throw error;
		}
	}

	async restore(id: string): Promise<void> {
		try {
			await this.findOne({ id, withDeleted: true });
			Logger.log('TECH_SERVICE#RESTORE');

			await this.techRepository.restore(id);
		} catch (error) {
			Logger.error('TECH_SERVICE#RESTORE', error);
			throw error;
		}
	}

	async forceDelete(id: string): Promise<void> {
		try {
			const entity = await this.findOne({ id, withDeleted: true });
			Logger.log('TECH_SERVICE#FORCE_DELETE');

			await this.techRepository.delete(entity.id);
		} catch (error) {
			Logger.error('TECH_SERVICE#FORCE_DELETE', error);
			throw error;
		}
	}

	private async conflicTech(request: FindOneTechDtoRequest): Promise<void> {
		const entity = await this.techRepository.findOne({
			where: {
				slug: request.slug,
			},
		});

		if (entity) {
			throw new ConflictException('Category already exists');
		}
	}
}
