import { CategoryDto } from '@/app/category/dto';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { DefaultFindAllDtoQuery, DefaultMetaDtoResponse } from 'src/default';

// find all
export class FindAllCategoryDtoQuery extends DefaultFindAllDtoQuery {}

export class PaginationCategoryDtoResponse {
	@ApiProperty({ type: () => DefaultMetaDtoResponse })
	meta: DefaultMetaDtoResponse;

	@ApiProperty({ type: () => CategoryDto, isArray: true })
	data: CategoryDto[];
}

export class FindAllCategoryDtoResponse {
	@ApiProperty({ example: HttpStatus.OK })
	statusCode: number;

	@ApiProperty({ example: 'Find all category successful' })
	message: string;

	@ApiProperty({ type: () => PaginationCategoryDtoResponse })
	data: PaginationCategoryDtoResponse;
}

// find one
export class FindOneCategoryDtoResponse {
	@ApiProperty({ example: HttpStatus.OK })
	statusCode: number;

	@ApiProperty({ example: 'Find one category successful' })
	message: string;

	@ApiProperty({ type: () => CategoryDto })
	data: CategoryDto;
}

// not found
export class NotFoundCategoryDtoResponse {
	@ApiProperty({ example: HttpStatus.NOT_FOUND })
	statusCode: number;

	@ApiProperty({ example: 'Category not found' })
	message: string;

	@ApiProperty({ example: 'Not Found' })
	error: string;
}

// confilct
export class ConflictCategoryDtoResponse {
	@ApiProperty({ example: HttpStatus.CONFLICT })
	statusCode: number;

	@ApiProperty({ example: 'Category already exists' })
	message: string;

	@ApiProperty({ example: 'Conflict' })
	error: string;
}
