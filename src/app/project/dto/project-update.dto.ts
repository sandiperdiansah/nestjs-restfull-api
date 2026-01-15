import { CreateMediaDtoRequest } from '@/app/media/dto/media-create.dto';
import { MediaType } from '@/app/media/media.entity';
import { ProjectDto } from '@/app/project/dto';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';

export class UpdateProjectDtoRequest {
	@ApiPropertyOptional({ example: 'Project Name' })
	@IsOptional()
	@IsString()
	name?: string;

	@ApiPropertyOptional({ example: 'project-slug' })
	@IsOptional()
	@IsString()
	slug?: string;

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
			{ type: MediaType.IMAGE, url: 'https://example.com/image.jpg' },
			{ type: MediaType.VIDEO, url: 'https://example.com/video.mp4' },
		],
	})
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateMediaDtoRequest)
	medias?: CreateMediaDtoRequest[];
}

export class UpdateProjectDtoResponse {
	@ApiProperty({ example: HttpStatus.OK })
	statusCode: number;

	@ApiProperty({ example: 'Update project successful' })
	message: string;

	@ApiProperty({ type: () => ProjectDto })
	data: ProjectDto;
}
