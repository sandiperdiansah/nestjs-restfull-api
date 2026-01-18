import { CreateMediaDtoRequest } from '@/app/media/dto';
import { ProjectWithMediaDto } from '@/app/project/dto';
import { DefaultMediaType } from '@/default';
import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUrl,
	ValidateNested,
} from 'class-validator';

export class CreateProjectDtoRequest {
	@ApiProperty({ example: faker.lorem.word() })
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({ example: faker.lorem.slug() })
	@IsNotEmpty()
	@IsString()
	slug: string;

	@ApiPropertyOptional({ example: faker.lorem.sentence() })
	@IsOptional()
	@IsString()
	description?: string;

	@ApiPropertyOptional({ example: faker.image.url() })
	@IsOptional()
	@IsString()
	@IsUrl()
	image?: string;

	@ApiPropertyOptional({
		type: [CreateMediaDtoRequest],
		example: [
			{ type: DefaultMediaType.IMAGE, url: faker.image.url() },
			{ type: DefaultMediaType.VIDEO, url: faker.image.url() },
		],
	})
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateMediaDtoRequest)
	medias?: CreateMediaDtoRequest[];
}

export class CreateProjectDtoResponse {
	@ApiProperty({ example: 'Create project successful' })
	message: string;

	@ApiProperty({ type: () => ProjectWithMediaDto })
	data: ProjectWithMediaDto;
}
