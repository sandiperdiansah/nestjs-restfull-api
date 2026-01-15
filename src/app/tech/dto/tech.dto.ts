import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

export class TechDto {
	@ApiProperty({ example: uuid() })
	id: string;

	@ApiProperty({ example: 'Tech Name' })
	name: string;

	@ApiProperty({ example: 'tech-slug' })
	slug: string;

	@ApiProperty({ example: 'Tech Description' })
	description?: string;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ example: new Date() })
	updatedAt: Date;

	@ApiPropertyOptional({ example: null })
	deletedAt?: Date;
}
