import { MediaDto } from '@/app/media/dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

export class ProjectDto {
	@ApiProperty({ example: uuid() })
	id: string;

	@ApiProperty({ example: 'Project Name' })
	name: string;

	@ApiProperty({ example: 'project-slug' })
	slug: string;

	@ApiPropertyOptional({ example: 'Project Description' })
	description?: string;

	@ApiPropertyOptional({ example: 'Project Thumbnail' })
	thumbnail?: string;

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
