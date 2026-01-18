import { CategoryDto } from '@/app/category/dto';
import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import {
	DefaultFindAllDtoRequest,
	DefaultFindOneDtoRequest,
	DefaultMetaDtoResponse,
} from 'src/default';

// find all
export class FindAllCategoryDtoRequest extends DefaultFindAllDtoRequest {}

export class PaginationCategoryDtoResponse {
	@ApiProperty({ type: () => DefaultMetaDtoResponse })
	meta: DefaultMetaDtoResponse;

	@ApiProperty({ type: () => [CategoryDto] })
	data: CategoryDto[];
}

export class FindAllCategoryDtoResponse {
	@ApiProperty({ example: 'Find all category successful' })
	message: string;

	@ApiProperty({ type: () => PaginationCategoryDtoResponse })
	data: PaginationCategoryDtoResponse;
}

// find one
export class FindOneCategoryDtoRequest extends DefaultFindOneDtoRequest {
	@ApiPropertyOptional({ example: faker.lorem.slug() })
	@IsOptional()
	@IsString()
	slug?: string;
}

export class FindOneCategoryDtoResponse {
	@ApiProperty({ example: 'Find one category successful' })
	message: string;

	@ApiProperty({ type: () => CategoryDto })
	data: CategoryDto;
}

// not found
export class NotFoundCategoryDtoResponse {
	@ApiProperty({ example: 'Category not found' })
	message: string;

	@ApiProperty({ example: 'Not Found' })
	error: string;
}

// confilct
export class ConflictCategoryDtoResponse {
	@ApiProperty({ example: 'Category already exists' })
	message: string;

	@ApiProperty({ example: 'Conflict' })
	error: string;
}
