import { MediaEntity } from '@/app/media/media.entity';
import {
	CreateProjectDtoRequest,
	FindAllProjectDtoRequest,
	FindOneProjectDtoRequest,
	PaginationProjectDtoResponse,
	UpdateProjectDtoRequest,
} from '@/app/project/dto';
import { ProjectEntity } from '@/app/project/project.entity';
import { ProjectRepository } from '@/app/project/project.repository';
import { DefaultWhereSort, createUniqueSlugHelper } from '@/default';
import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, ILike, QueryRunner } from 'typeorm';

@Injectable()
export class ProjectService {
	constructor(private readonly projectRepository: ProjectRepository) {}

	async create(request: CreateProjectDtoRequest): Promise<ProjectEntity> {
		const queryRunner = this.projectRepository.dataSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const slug = createUniqueSlugHelper(request.slug);
			await this.conflicProject({ slug }, queryRunner);

			const projectEntity = await queryRunner.manager.save(
				ProjectEntity,
				queryRunner.manager.create(ProjectEntity, {
					...request,
					slug,
				}),
			);

			if (request.medias && request.medias.length > 0) {
				const mediaEntities = request.medias.map((media) => {
					return queryRunner.manager.create(MediaEntity, {
						...media,
						project: projectEntity,
					});
				});

				await queryRunner.manager.save(MediaEntity, mediaEntities);
			}

			const projectWithMedias = await queryRunner.manager.findOne(ProjectEntity, {
				where: { id: projectEntity.id },
				relations: ['medias'],
			});

			if (!projectWithMedias) {
				throw new NotFoundException('Project not found');
			}

			Logger.log('PROJECT_SERVICE#CREATE');
			await queryRunner.commitTransaction();

			return projectWithMedias;
		} catch (error) {
			Logger.error('PROJECT_SERVICE#CREATE', error);
			await queryRunner.rollbackTransaction();
			throw error;
		} finally {
			await queryRunner.release();
		}
	}

	async findAll(
		request: FindAllProjectDtoRequest,
	): Promise<PaginationProjectDtoResponse> {
		try {
			const { page = 1, limit = 10, sort, order, search } = request;

			const where: FindOptionsWhere<ProjectEntity>[] = search
				? [{ name: ILike(`%${search}%`) }, { slug: ILike(`%${search}%`) }]
				: [{}];

			const [data, count] = await this.projectRepository.findAndCount({
				where,
				order: { [sort as DefaultWhereSort]: order },
				skip: (page - 1) * limit,
				take: limit,
			});

			Logger.log('PROJECT_SERVICE#FIND_ALL');

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
			Logger.error('PROJECT_SERVICE#FIND_ALL', error);
			throw error;
		}
	}

	async findOne(
		request: FindOneProjectDtoRequest,
		queryRunner?: QueryRunner,
	): Promise<ProjectEntity> {
		try {
			const { id, withDeleted } = request;
			const entity = await (queryRunner?.manager || this.projectRepository).findOne(
				ProjectEntity,
				{
					where: { id },
					withDeleted,
				},
			);

			if (!entity) {
				throw new NotFoundException('Project not found');
			}

			Logger.log('PROJECT_SERVICE#FIND_ONE');
			return entity;
		} catch (error) {
			Logger.error('PROJECT_SERVICE#FIND_ONE', error);
			throw error;
		}
	}

	async update(id: string, request: UpdateProjectDtoRequest): Promise<ProjectEntity> {
		const queryRunner = this.projectRepository.dataSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const entity = await this.findOne({ id, withDeleted: false }, queryRunner);

			if (request.slug && request.slug !== entity.slug) {
				await this.conflicProject({ slug: request.slug }, queryRunner);
			}

			const projectEntity = await queryRunner.manager.save(
				ProjectEntity,
				queryRunner.manager.merge(ProjectEntity, entity, {
					...request,
					slug: request.slug
						? createUniqueSlugHelper(request.slug)
						: entity.slug,
				}),
			);

			if (request.medias && request.medias.length > 0) {
				const mediaEntities = request.medias.map((media) => {
					return queryRunner.manager.create(MediaEntity, {
						...media,
						project: projectEntity,
					});
				});

				await queryRunner.manager.save(MediaEntity, mediaEntities);
			}

			const projectWithMedias = await queryRunner.manager.findOne(ProjectEntity, {
				where: { id: projectEntity.id },
				relations: ['medias'],
			});

			if (!projectWithMedias) {
				throw new NotFoundException('Project not found');
			}

			Logger.log('PROJECT_SERVICE#UPDATE');
			await queryRunner.commitTransaction();

			return projectWithMedias;
		} catch (error) {
			Logger.error('PROJECT_SERVICE#UPDATE', error);
			await queryRunner.rollbackTransaction();
			throw error;
		} finally {
			await queryRunner.release();
		}
	}

	async delete(id: string): Promise<void> {
		try {
			await this.findOne({ id });
			Logger.log('PROJECT_SERVICE#DELETE');

			await this.projectRepository.softDelete(id);
		} catch (error) {
			Logger.error('PROJECT_SERVICE#DELETE', error);
			throw error;
		}
	}

	async restore(id: string): Promise<void> {
		try {
			const entity = await this.findOne({ id, withDeleted: true });
			Logger.log('PROJECT_SERVICE#RESTORE');

			await this.projectRepository.restore(entity.id);
		} catch (error) {
			Logger.error('PROJECT_SERVICE#RESTORE', error);
			throw error;
		}
	}

	async forceDelete(id: string): Promise<void> {
		try {
			const entity = await this.findOne({ id, withDeleted: true });
			Logger.log('PROJECT_SERVICE#FORCE_DELETE');

			await this.projectRepository.delete(entity.id);
		} catch (error) {
			Logger.error('PROJECT_SERVICE#FORCE_DELETE', error);
			throw error;
		}
	}

	private async conflicProject(
		request: FindOneProjectDtoRequest,
		queryRunner: QueryRunner,
	): Promise<void> {
		const entity = await queryRunner.manager.findOne(ProjectEntity, {
			where: { slug: request.slug },
		});

		if (entity) {
			throw new ConflictException('Project already exists');
		}
	}
}
