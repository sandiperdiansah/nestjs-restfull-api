import { DefaultMediaType } from '@/default';
import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

export class MediaDto {
	@ApiProperty({ example: uuid() })
	id: string;

	@ApiProperty({ example: faker.image.url() })
	url: string;

	@ApiProperty({ example: DefaultMediaType.IMAGE })
	type: DefaultMediaType;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ example: new Date() })
	updatedAt: Date;

	@ApiPropertyOptional({ example: null })
	deletedAt?: Date;
}
