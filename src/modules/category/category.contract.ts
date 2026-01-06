import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { v4 as uuid } from 'uuid';
import {
	DefaultFindAllRequest,
	DefaultFindOneRequest,
	DefaultPaginationMeta,
	DefaultResourceContract,
} from '../../default';

// contract
export type CategoryContract = DefaultResourceContract<
	CategoryProperties,
	CreateCategoryRequest,
	UpdateCategoryRequest,
	FindAllCategoryRequest,
	CategoryPaginationResponse
>;

// properties
export class CategoryProperties {
	@ApiProperty({ example: uuid(), description: 'id' })
	readonly id: string;

	@ApiProperty({
		example: 'category name',
		description: 'category name',
	})
	readonly name: string;

	@ApiProperty({
		example: 'category-slug',
		description: 'category slug',
	})
	readonly slug: string;

	@ApiProperty({ example: true, description: 'category status' })
	readonly isActive: boolean;

	@ApiProperty({
		example: new Date(),
		description: 'created at',
		default: new Date(),
	})
	readonly createdAt: Date;

	@ApiProperty({
		example: new Date(),
		description: 'updated at',
		default: new Date(),
	})
	readonly updatedAt: Date;

	@ApiProperty({
		example: null,
		description: 'deleted at',
		default: null,
	})
	readonly deletedAt?: Date;
}

// create
export class CreateCategoryRequest {
	@ApiProperty({
		example: 'category name',
		description: 'category name',
	})
	@IsNotEmpty()
	readonly name: string;

	@ApiProperty({
		example: 'category-slug',
		description: 'category slug',
	})
	@IsNotEmpty()
	readonly slug: string;

	@ApiPropertyOptional({
		example: true,
		description: 'category status',
		default: true,
	})
	@IsBoolean()
	@IsOptional()
	readonly isActive?: boolean;
}

export class CreateCategoryResponse {
	@ApiProperty({ example: 201, description: 'status code' })
	readonly statusCode: number;

	@ApiProperty({ example: 'create category success', description: 'message' })
	readonly message: string;

	@ApiProperty({ type: CategoryProperties })
	readonly data: CategoryProperties;
}

// find all
export class FindAllCategoryRequest extends DefaultFindAllRequest {}

export class CategoryPaginationResponse {
	@ApiProperty({ type: CategoryProperties, isArray: true })
	data: CategoryProperties[];

	@ApiProperty({ type: DefaultPaginationMeta })
	meta: DefaultPaginationMeta;
}

export class FindAllCategoryResponse {
	@ApiProperty({ example: 200, description: 'status code' })
	readonly statusCode: number;

	@ApiProperty({ example: 'find all categories success', description: 'message' })
	readonly message: string;

	@ApiProperty({ type: CategoryPaginationResponse, description: 'data' })
	readonly data: CategoryPaginationResponse;
}

// find one
export class FindOneCategoryRequest extends DefaultFindOneRequest {}

export class FindOneCategoryResponse {
	@ApiProperty({ example: 200, description: 'status code' })
	readonly statusCode: number;

	@ApiProperty({ example: 'find one category success', description: 'message' })
	readonly message: string;

	@ApiProperty({ type: CategoryProperties, description: 'data' })
	readonly data: CategoryProperties;
}

// update
export class UpdateCategoryRequest {
	@ApiPropertyOptional({
		example: 'category name',
		description: 'category name',
	})
	@IsOptional()
	readonly name?: string;

	@ApiPropertyOptional({
		example: 'category-slug',
		description: 'category slug',
	})
	@IsOptional()
	readonly slug?: string;

	@ApiPropertyOptional({
		example: true,
		description: 'category status',
		default: true,
	})
	@IsOptional()
	@IsBoolean()
	readonly isActive?: boolean;
}

export class UpdateCategoryResponse {
	@ApiProperty({ example: 200, description: 'status code' })
	readonly statusCode: number;

	@ApiProperty({ example: 'update category success', description: 'message' })
	readonly message: string;

	@ApiProperty({ type: CategoryProperties })
	readonly data: CategoryProperties;
}

// delete
export class DeleteCategoryResponse {
	@ApiProperty({ example: 200, description: 'status code' })
	readonly statusCode: number;

	@ApiProperty({ example: 'delete category success', description: 'message' })
	readonly message: string;
}

// restore
export class RestoreCategoryResponse {
	@ApiProperty({ example: 200, description: 'status code' })
	readonly statusCode: number;

	@ApiProperty({ example: 'restore category success', description: 'message' })
	readonly message: string;
}

// not found
export class NotFoundCategoryResponse {
	@ApiProperty({ example: 404, description: 'status code' })
	readonly statusCode: number;

	@ApiProperty({ example: 'category not found', description: 'message' })
	readonly message: string;

	@ApiProperty({ example: 'Not Found', description: 'error' })
	readonly error: string;
}

// conflict
export class ConflictCategoryResponse {
	@ApiProperty({ example: 409, description: 'status code' })
	readonly statusCode: number;

	@ApiProperty({ example: 'category already exists', description: 'message' })
	readonly message: string;

	@ApiProperty({ example: 'Conflict', description: 'error' })
	readonly error: string;
}
