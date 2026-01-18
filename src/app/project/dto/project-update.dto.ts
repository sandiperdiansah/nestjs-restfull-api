import { CreateMediaDtoRequest } from '@/app/media/dto/media-create.dto';
import { ProjectDto } from '@/app/project/dto';
import { DefaultMediaType } from '@/default';
import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';

export class UpdateProjectDtoRequest {
	@ApiPropertyOptional({ example: faker.lorem.word() })
	@IsOptional()
	@IsString()
	name?: string;

	@ApiPropertyOptional({ example: faker.lorem.slug() })
	@IsOptional()
	@IsString()
	slug?: string;

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

export class UpdateProjectDtoResponse {
	@ApiProperty({ example: 'Update project successful' })
	message: string;

	@ApiProperty({ type: () => ProjectDto })
	data: ProjectDto;
}
