import { TechDto } from '@/app/tech/dto';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTechDtoRequest {
	@ApiProperty({ example: 'Tech Name' })
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({ example: 'tech-slug' })
	@IsNotEmpty()
	@IsString()
	slug: string;

	@ApiPropertyOptional({ example: 'Tech Description' })
	@IsOptional()
	@IsString()
	description?: string;

	@ApiPropertyOptional({ example: true })
	@IsOptional()
	@IsBoolean()
	isActive?: boolean;
}

export class CreateTechDtoResponse {
	@ApiProperty({ example: HttpStatus.CREATED })
	statusCode: number;

	@ApiProperty({ example: 'Create tech successful' })
	message: string;

	@ApiProperty({ type: () => TechDto })
	data: TechDto;
}
