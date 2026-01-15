import { CategoryDto } from '@/app/category/dto';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDtoRequest {
	@ApiProperty({ example: 'Category Name' })
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({ example: 'category-slug' })
	@IsNotEmpty()
	@IsString()
	slug: string;

	@ApiPropertyOptional({ example: 'Category Description' })
	@IsOptional()
	@IsString()
	description?: string;

	@ApiPropertyOptional({ example: true })
	@IsOptional()
	@IsBoolean()
	isActive?: boolean;
}

export class CreateCategoryDtoResponse {
	@ApiProperty({ example: HttpStatus.CREATED })
	statusCode: number;

	@ApiProperty({ example: 'Create category successful' })
	message: string;

	@ApiProperty({ type: () => CategoryDto })
	data: CategoryDto;
}
