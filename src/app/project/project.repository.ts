import { ProjectEntity } from '@/app/project/project.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProjectRepository extends Repository<ProjectEntity> {
	constructor(readonly dataSource: DataSource) {
		super(ProjectEntity, dataSource.createEntityManager());
	}
}
