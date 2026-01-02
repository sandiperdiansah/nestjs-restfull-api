import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
	ConflictCategoryResponse,
	CreateCategoryRequest,
	CreateCategoryResponse,
	DeleteCategoryResponse,
	FindAllCategoryResponse,
	FindAllCategoryWhereRequest,
	FindOneCategoryResponse,
	NotFoundCategoryResponse,
	RestoreCategoryResponse,
	UpdateCategoryRequest,
	UpdateCategoryResponse,
} from './category.contract';
import { CategoryService } from './category.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@ApiOperation({ summary: 'create category' })
	@ApiResponse({
		status: 201,
		description: 'create category success',
		type: CreateCategoryResponse,
	})
	@ApiResponse({
		status: 409,
		description: 'category already exists',
		type: ConflictCategoryResponse,
	})
	@Post()
	async create(
		@Body() request: CreateCategoryRequest,
	): Promise<CreateCategoryResponse> {
		const response = await this.categoryService.create(request);
		return {
			statusCode: 201,
			message: 'create category success',
			data: response,
		};
	}

	@ApiOperation({ summary: 'find all categories' })
	@ApiResponse({
		status: 200,
		description: 'find all categories success',
		type: FindAllCategoryResponse,
	})
	@Get()
	async findAll(
		@Query() query: FindAllCategoryWhereRequest,
	): Promise<FindAllCategoryResponse> {
		const { offset = 0, limit = 10, ...rest } = query;

		const [data, total] = await this.categoryService.findAll({
			...rest,
			offset,
			limit,
		});

		return {
			statusCode: 200,
			message: 'find all categories success',
			data: {
				data,
				meta: {
					offset,
					limit,
					total,
				},
			},
		};
	}

	@ApiOperation({ summary: 'find one category' })
	@ApiResponse({
		status: 200,
		description: 'find one category success',
		type: FindOneCategoryResponse,
	})
	@ApiResponse({
		status: 404,
		description: 'category not found',
		type: NotFoundCategoryResponse,
	})
	@Get(':id')
	async findOne(@Param('id') id: string): Promise<FindOneCategoryResponse> {
		const response = await this.categoryService.findOne(id);
		return {
			statusCode: 200,
			message: 'find one category success',
			data: response,
		};
	}

	@ApiOperation({ summary: 'update category' })
	@ApiResponse({
		status: 200,
		description: 'update category success',
		type: UpdateCategoryResponse,
	})
	@ApiResponse({
		status: 404,
		description: 'category not found',
		type: NotFoundCategoryResponse,
	})
	@ApiResponse({
		status: 409,
		description: 'category already exists',
		type: ConflictCategoryResponse,
	})
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() request: UpdateCategoryRequest,
	): Promise<UpdateCategoryResponse> {
		const response = await this.categoryService.update(id, request);
		return {
			statusCode: 200,
			message: 'update category success',
			data: response,
		};
	}

	@ApiOperation({ summary: 'delete category (soft delete)' })
	@ApiResponse({
		status: 200,
		description: 'delete category success',
		type: DeleteCategoryResponse,
	})
	@ApiResponse({
		status: 404,
		description: 'category not found',
		type: NotFoundCategoryResponse,
	})
	@Delete(':id')
	async delete(@Param('id') id: string): Promise<DeleteCategoryResponse> {
		await this.categoryService.delete(id);
		return {
			statusCode: 200,
			message: 'delete category success',
		};
	}

	@ApiOperation({ summary: 'restore category' })
	@ApiResponse({
		status: 200,
		description: 'restore category success',
		type: RestoreCategoryResponse,
	})
	@ApiResponse({
		status: 404,
		description: 'category not found',
		type: NotFoundCategoryResponse,
	})
	@Patch(':id/restore')
	async restore(@Param('id') id: string): Promise<RestoreCategoryResponse> {
		await this.categoryService.restore(id);
		return {
			statusCode: 200,
			message: 'restore category success',
		};
	}

	@ApiOperation({ summary: 'delete category (force delete)' })
	@ApiResponse({
		status: 200,
		description: 'force delete category success',
		type: DeleteCategoryResponse,
	})
	@ApiResponse({
		status: 404,
		description: 'category not found',
		type: NotFoundCategoryResponse,
	})
	@Delete(':id/force')
	async forceDelete(@Param('id') id: string): Promise<DeleteCategoryResponse> {
		await this.categoryService.forceDelete(id);
		return {
			statusCode: 200,
			message: 'force delete category success',
		};
	}
}
