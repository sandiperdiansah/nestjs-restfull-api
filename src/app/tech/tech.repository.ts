import { TechEntity } from '@/app/tech/tech.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TechRepository extends Repository<TechEntity> {
	constructor(readonly dataSource: DataSource) {
		super(TechEntity, dataSource.createEntityManager());
	}
}
