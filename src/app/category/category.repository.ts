import { CategoryEntity } from '@/app/category/category.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CategoryRepository extends Repository<CategoryEntity> {
	constructor(readonly dataSource: DataSource) {
		super(CategoryEntity, dataSource.createEntityManager());
	}
}
