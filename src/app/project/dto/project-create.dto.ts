import { CreateMediaDtoRequest } from '@/app/media/dto';
import { ProjectWithMediaDto } from '@/app/project/dto';
import { DefaultMediaType } from '@/default';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsNotEmpty,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';

export class CreateProjectDtoRequest {
	@ApiProperty({ example: 'Project Name' })
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({ example: 'project-slug' })
	@IsNotEmpty()
	@IsString()
	slug: string;

	@ApiPropertyOptional({ example: 'Project Description' })
	@IsOptional()
	@IsString()
	description?: string;

	@ApiPropertyOptional({ example: 'Project Thumbnail' })
	@IsOptional()
	@IsString()
	thumbnail?: string;

	@ApiPropertyOptional({ example: true })
	@IsOptional()
	@IsBoolean()
	isActive?: boolean;

	@ApiPropertyOptional({
		type: [CreateMediaDtoRequest],
		example: [
			{ type: DefaultMediaType.IMAGE, url: 'https://example.com/image.jpg' },
			{ type: DefaultMediaType.VIDEO, url: 'https://example.com/video.mp4' },
		],
	})
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateMediaDtoRequest)
	medias?: CreateMediaDtoRequest[];
}

export class CreateProjectDtoResponse {
	@ApiProperty({ example: HttpStatus.CREATED })
	statusCode: number;

	@ApiProperty({ example: 'Create project successful' })
	message: string;

	@ApiProperty({
		type: () => ProjectWithMediaDto,
	})
	data: ProjectWithMediaDto;
}
