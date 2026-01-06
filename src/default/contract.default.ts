import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { DEFAULT_ALLOWED_SORT } from 'src/default/constant.default';
import { DefaultWhereOrder, DefaultWhereStatus } from './enum.default';

export interface DefaultResourceContract<
	TEntity,
	TCreateRequest,
	TUpdateRequest,
	TFindAllRequest,
	TFindAllResponse,
> {
	create?(request: TCreateRequest): Promise<TEntity>;
	findAll?(query: TFindAllRequest): Promise<TFindAllResponse>;
	findOne?(id: string, withDeleted?: boolean): Promise<TEntity>;
	update?(id: string, request: TUpdateRequest): Promise<TEntity>;
	delete?(id: string): Promise<void>;
	restore?(id: string): Promise<void>;
	forceDelete?(id: string): Promise<void>;
}

export abstract class DefaultFindAllRequest {
	@ApiPropertyOptional({ example: 1, description: 'page', default: 1 })
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	@IsOptional()
	readonly page?: number = 1;

	@ApiPropertyOptional({ example: 0, description: 'offset' })
	@Type(() => Number)
	@IsNumber()
	@Min(0)
	@IsOptional()
	readonly offset?: number;

	@ApiPropertyOptional({ example: 10, description: 'limit', default: 10 })
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	@IsOptional()
	readonly limit?: number = 10;

	@ApiPropertyOptional({
		enum: DefaultWhereOrder,
		example: DefaultWhereOrder.DESC,
		description: 'order',
		default: DefaultWhereOrder.DESC,
	})
	@IsOptional()
	@IsEnum(DefaultWhereOrder)
	readonly order?: DefaultWhereOrder = DefaultWhereOrder.DESC;

	@ApiPropertyOptional({
		example: DEFAULT_ALLOWED_SORT[0],
		description: 'sort',
		default: DEFAULT_ALLOWED_SORT[0],
	})
	@IsOptional()
	readonly sort?: string = DEFAULT_ALLOWED_SORT[0];

	@ApiPropertyOptional({ example: '', description: 'search' })
	@IsOptional()
	readonly search?: string;

	@ApiPropertyOptional({
		enum: DefaultWhereStatus,
		example: DefaultWhereStatus.ALL,
		description: 'status',
		default: DefaultWhereStatus.ALL,
	})
	@IsOptional()
	@IsEnum(DefaultWhereStatus)
	readonly status?: DefaultWhereStatus = DefaultWhereStatus.ALL;
}

export abstract class DefaultPaginationMeta {
	@ApiProperty({ example: 0, description: 'offset', default: 0 })
	readonly offset: number = 0;

	@ApiProperty({ example: 10, description: 'limit', default: 10 })
	readonly limit: number = 10;

	@ApiProperty({ example: 1, description: 'total', default: 0 })
	readonly total: number = 0;
}

export abstract class DefaultFindOneRequest {
	@ApiProperty({ example: false, description: 'with deleted', default: false })
	@IsBoolean()
	@IsOptional()
	readonly withDeleted?: boolean = false;
}
