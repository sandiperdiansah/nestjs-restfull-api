import { MediaDto } from '@/app/media/dto';
import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

export class ProjectDto {
	@ApiProperty({ example: uuid() })
	id: string;

	@ApiProperty({ example: faker.lorem.word() })
	name: string;

	@ApiProperty({ example: faker.lorem.slug() })
	slug: string;

	@ApiPropertyOptional({ example: faker.lorem.sentence() })
	description?: string;

	@ApiPropertyOptional({ example: faker.image.url() })
	image?: string;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ example: new Date() })
	updatedAt: Date;

	@ApiPropertyOptional({ example: null })
	deletedAt?: Date;
}

export class ProjectWithMediaDto extends ProjectDto {
	@ApiPropertyOptional({ type: () => [MediaDto] })
	medias?: MediaDto[];
}
