import { CategoryController } from '@/app/category/category.controller';
import { CategoryEntity } from '@/app/category/category.entity';
import { CategoryRepository } from '@/app/category/category.repository';
import { CategoryService } from '@/app/category/category.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([CategoryEntity])],
	providers: [CategoryService, CategoryRepository],
	controllers: [CategoryController],
})
export class CategoryModule {}
