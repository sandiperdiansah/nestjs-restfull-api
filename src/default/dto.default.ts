import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsBoolean,
	IsEnum,
	IsInt,
	IsOptional,
	IsString,
	IsUUID,
	Max,
	MaxLength,
	Min,
} from 'class-validator';
import { v4 as uuid } from 'uuid';
import { DefaultWhereOrder, DefaultWhereSort } from './enum.default';

export abstract class DefaultFindAllDtoRequest {
	@ApiPropertyOptional()
	@IsOptional()
	@Type(() => Number)
	@Min(1)
	@IsInt()
	page?: number;

	@ApiPropertyOptional()
	@IsOptional()
	@Type(() => Number)
	@Min(5)
	@Max(100)
	@IsInt()
	limit?: number;

	@ApiPropertyOptional({ enum: DefaultWhereOrder })
	@IsOptional()
	@IsEnum(DefaultWhereOrder)
	order?: DefaultWhereOrder;

	@ApiPropertyOptional({ enum: DefaultWhereSort })
	@IsOptional()
	@IsEnum(DefaultWhereSort)
	sort?: DefaultWhereSort;

	@ApiPropertyOptional()
	@IsOptional()
	@MaxLength(100)
	@IsString()
	search?: string;
}

export class DefaultMetaDtoResponse {
	@ApiProperty({ example: 1 })
	page: number;

	@ApiProperty({ example: 10 })
	limit: number;

	@ApiProperty({ example: 100 })
	count: number;

	@ApiProperty({ example: 10 })
	pages: number;
}

export class DefaultFindOneDtoRequest {
	@ApiPropertyOptional({ example: uuid() })
	@IsOptional()
	@IsString()
	@IsUUID()
	id?: string;

	@ApiPropertyOptional({ example: false })
	@IsOptional()
	@IsBoolean()
	withDeleted?: boolean = false;
}
