import { TechDto } from '@/app/tech/dto';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { DefaultFindAllDtoQuery, DefaultMetaDtoResponse } from 'src/default';

// find all
export class FindAllTechDtoQuery extends DefaultFindAllDtoQuery {}

export class PaginationTechDtoResponse {
	@ApiProperty({ type: () => DefaultMetaDtoResponse })
	meta: DefaultMetaDtoResponse;

	@ApiProperty({ type: () => TechDto, isArray: true })
	data: TechDto[];
}

export class FindAllTechDtoResponse {
	@ApiProperty({ example: HttpStatus.OK })
	statusCode: number;

	@ApiProperty({ example: 'Find all tech successful' })
	message: string;

	@ApiProperty({ type: () => PaginationTechDtoResponse })
	data: PaginationTechDtoResponse;
}

// find one
export class FindOneTechDtoResponse {
	@ApiProperty({ example: HttpStatus.OK })
	statusCode: number;

	@ApiProperty({ example: 'Find one tech successful' })
	message: string;

	@ApiProperty({ type: () => TechDto })
	data: TechDto;
}

// not found
export class NotFoundTechDtoResponse {
	@ApiProperty({ example: HttpStatus.NOT_FOUND })
	statusCode: number;

	@ApiProperty({ example: 'Tech not found' })
	message: string;

	@ApiProperty({ example: 'Not Found' })
	error: string;
}

// confilct
export class ConflictTechDtoResponse {
	@ApiProperty({ example: HttpStatus.CONFLICT })
	statusCode: number;

	@ApiProperty({ example: 'Tech already exists' })
	message: string;

	@ApiProperty({ example: 'Conflict' })
	error: string;
}
