import { TechDto } from '@/app/tech/dto/tech.dto';
import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import {
	DefaultFindAllDtoRequest,
	DefaultFindOneDtoRequest,
	DefaultMetaDtoResponse,
} from 'src/default';

// find all
export class FindAllTechDtoRequest extends DefaultFindAllDtoRequest {}

export class PaginationTechDtoResponse {
	@ApiProperty({ type: () => DefaultMetaDtoResponse })
	meta: DefaultMetaDtoResponse;

	@ApiProperty({ type: () => [TechDto] })
	data: TechDto[];
}

export class FindAllTechDtoResponse {
	@ApiProperty({ example: 'Find all tech successful' })
	message: string;

	@ApiProperty({ type: () => PaginationTechDtoResponse })
	data: PaginationTechDtoResponse;
}

// find one
export class FindOneTechDtoRequest extends DefaultFindOneDtoRequest {
	@ApiPropertyOptional({ example: faker.lorem.slug() })
	@IsOptional()
	@IsString()
	slug?: string;
}

export class FindOneTechDtoResponse {
	@ApiProperty({ example: 'Find one tech successful' })
	message: string;

	@ApiProperty({ type: () => TechDto })
	data: TechDto;
}

// not found
export class NotFoundTechDtoResponse {
	@ApiProperty({ example: 'Tech not found' })
	message: string;

	@ApiProperty({ example: 'Not Found' })
	error: string;
}

// confilct
export class ConflictTechDtoResponse {
	@ApiProperty({ example: 'Tech already exists' })
	message: string;

	@ApiProperty({ example: 'Conflict' })
	error: string;
}
