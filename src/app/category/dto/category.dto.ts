import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

export class CategoryDto {
	@ApiProperty({ example: uuid() })
	id: string;

	@ApiProperty({ example: 'Category Name' })
	name: string;

	@ApiProperty({ example: 'category-slug' })
	slug: string;

	@ApiProperty({ example: 'Category Description' })
	description?: string;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ example: new Date() })
	updatedAt: Date;

	@ApiPropertyOptional({ example: null })
	deletedAt?: Date;
}
