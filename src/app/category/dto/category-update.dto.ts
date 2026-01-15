import { CategoryDto } from '@/app/category/dto';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDtoRequest {
	@ApiPropertyOptional({ example: 'Category Name' })
	@IsOptional()
	@IsString()
	name?: string;

	@ApiPropertyOptional({ example: 'category-slug' })
	@IsOptional()
	@IsString()
	slug?: string;

	@ApiPropertyOptional({ example: 'Category Description' })
	@IsOptional()
	@IsString()
	description?: string;

	@ApiPropertyOptional({ example: true })
	@IsOptional()
	@IsBoolean()
	isActive?: boolean;
}

export class UpdateCategoryDtoResponse {
	@ApiProperty({ example: HttpStatus.OK })
	statusCode: number;

	@ApiProperty({ example: 'Update category successful' })
	message: string;

	@ApiProperty({ type: () => CategoryDto })
	data: CategoryDto;
}
