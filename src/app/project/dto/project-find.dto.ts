import { ProjectDto } from '@/app/project/dto/project.dto';
import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import {
	DefaultFindAllDtoRequest,
	DefaultFindOneDtoRequest,
	DefaultMetaDtoResponse,
} from 'src/default';

// find all
export class FindAllProjectDtoRequest extends DefaultFindAllDtoRequest {}

export class PaginationProjectDtoResponse {
	@ApiProperty({ type: () => DefaultMetaDtoResponse })
	meta: DefaultMetaDtoResponse;

	@ApiProperty({ type: () => [ProjectDto] })
	data: ProjectDto[];
}

export class FindAllProjectDtoResponse {
	@ApiProperty({ example: 'Find all project successful' })
	message: string;

	@ApiProperty({ type: () => PaginationProjectDtoResponse })
	data: PaginationProjectDtoResponse;
}

// find one
export class FindOneProjectDtoRequest extends DefaultFindOneDtoRequest {
	@ApiPropertyOptional({ example: faker.lorem.slug() })
	@IsOptional()
	@IsString()
	slug?: string;
}

export class FindOneProjectDtoResponse {
	@ApiProperty({ example: 'Find one project successful' })
	message: string;

	@ApiProperty({ type: () => ProjectDto })
	data: ProjectDto;
}

// not found
export class NotFoundProjectDtoResponse {
	@ApiProperty({ example: 'Project not found' })
	message: string;

	@ApiProperty({ example: 'Not Found' })
	error: string;
}

// confilct
export class ConflictProjectDtoResponse {
	@ApiProperty({ example: 'Project already exists' })
	message: string;

	@ApiProperty({ example: 'Conflict' })
	error: string;
}
