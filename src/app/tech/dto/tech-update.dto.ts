import { TechDto } from '@/app/tech/dto';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTechDtoRequest {
	@ApiPropertyOptional({ example: 'Tech Name' })
	@IsOptional()
	@IsString()
	name?: string;

	@ApiPropertyOptional({ example: 'tech-slug' })
	@IsOptional()
	@IsString()
	slug?: string;

	@ApiPropertyOptional({ example: 'Tech Description' })
	@IsOptional()
	@IsString()
	description?: string;

	@ApiPropertyOptional({ example: true })
	@IsOptional()
	@IsBoolean()
	isActive?: boolean;
}

export class UpdateTechDtoResponse {
	@ApiProperty({ example: HttpStatus.OK })
	statusCode: number;

	@ApiProperty({ example: 'Update tech successful' })
	message: string;

	@ApiProperty({ type: () => TechDto })
	data: TechDto;
}
