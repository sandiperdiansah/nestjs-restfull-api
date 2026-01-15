import { ProjectDto } from '@/app/project/dto';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { DefaultFindAllDtoQuery, DefaultMetaDtoResponse } from 'src/default';

// find all
export class FindAllProjectDtoQuery extends DefaultFindAllDtoQuery {}

export class PaginationProjectDtoResponse {
	@ApiProperty({ type: () => DefaultMetaDtoResponse })
	meta: DefaultMetaDtoResponse;

	@ApiProperty({ type: () => ProjectDto, isArray: true })
	data: ProjectDto[];
}

export class FindAllProjectDtoResponse {
	@ApiProperty({ example: HttpStatus.OK })
	statusCode: number;

	@ApiProperty({ example: 'Find all project successful' })
	message: string;

	@ApiProperty({ type: () => PaginationProjectDtoResponse })
	data: PaginationProjectDtoResponse;
}

// find one
export class FindOneProjectDtoResponse {
	@ApiProperty({ example: HttpStatus.OK })
	statusCode: number;

	@ApiProperty({ example: 'Find one project successful' })
	message: string;

	@ApiProperty({ type: () => ProjectDto })
	data: ProjectDto;
}

// not found
export class NotFoundProjectDtoResponse {
	@ApiProperty({ example: HttpStatus.NOT_FOUND })
	statusCode: number;

	@ApiProperty({ example: 'Project not found' })
	message: string;

	@ApiProperty({ example: 'Not Found' })
	error: string;
}

// confilct
export class ConflictProjectDtoResponse {
	@ApiProperty({ example: HttpStatus.CONFLICT })
	statusCode: number;

	@ApiProperty({ example: 'Project already exists' })
	message: string;

	@ApiProperty({ example: 'Conflict' })
	error: string;
}
