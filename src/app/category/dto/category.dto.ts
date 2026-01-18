import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

export class CategoryDto {
	@ApiProperty({ example: uuid() })
	id: string;

	@ApiProperty({ example: faker.lorem.word() })
	name: string;

	@ApiProperty({ example: faker.lorem.slug() })
	slug: string;

	@ApiProperty({ example: faker.lorem.sentence() })
	description?: string;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ example: new Date() })
	updatedAt: Date;

	@ApiPropertyOptional({ example: null })
	deletedAt?: Date;
}
