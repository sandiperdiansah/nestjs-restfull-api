import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsEnum,
	IsInt,
	IsOptional,
	IsString,
	Max,
	MaxLength,
	Min,
} from 'class-validator';
import { DefaultWhereOrder, DefaultWhereSort, DefaultWhereStatus } from './enum.default';

export abstract class DefaultFindAllDtoQuery {
	@ApiPropertyOptional({ example: 1, description: 'page', default: 1 })
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	page?: number = 1;

	@ApiPropertyOptional({ example: 10, description: 'limit', default: 10 })
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(100)
	limit?: number = 10;

	@ApiPropertyOptional({
		enum: DefaultWhereOrder,
		example: DefaultWhereOrder.DESC,
	})
	@IsOptional()
	@IsEnum(DefaultWhereOrder)
	order?: DefaultWhereOrder = DefaultWhereOrder.DESC;

	@ApiPropertyOptional({
		enum: DefaultWhereSort,
		example: DefaultWhereSort.CREATED_AT,
	})
	@IsOptional()
	@IsEnum(DefaultWhereSort)
	sort?: DefaultWhereSort = DefaultWhereSort.CREATED_AT;

	@ApiPropertyOptional({ example: '', description: 'search' })
	@IsOptional()
	@IsString()
	@MaxLength(100)
	search?: string;

	@ApiPropertyOptional({
		enum: DefaultWhereStatus,
		example: DefaultWhereStatus.ALL,
	})
	@IsOptional()
	@IsEnum(DefaultWhereStatus)
	filterStatus?: DefaultWhereStatus = DefaultWhereStatus.ALL;
}

export class DefaultMetaDtoResponse {
	@ApiProperty({ example: 1, description: 'page' })
	page: number;

	@ApiProperty({ example: 10, description: 'limit' })
	limit: number;

	@ApiProperty({ example: 100, description: 'count' })
	count: number;

	@ApiProperty({ example: 10, description: 'pages' })
	pages: number;
}
