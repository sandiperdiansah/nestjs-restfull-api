import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { WhereOrder } from './enum.default';

export abstract class DefaultFindAllWhereRequest {
	@ApiPropertyOptional({ example: 0, description: 'offset', default: 0 })
	@Type(() => Number)
	@IsNumber()
	@Min(0)
	@IsOptional()
	readonly offset?: number = 0;

	@ApiPropertyOptional({ example: 1, description: 'page', default: 1 })
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	@IsOptional()
	readonly page?: number = 1;

	@ApiPropertyOptional({ example: 10, description: 'limit', default: 10 })
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	@IsOptional()
	readonly limit?: number = 10;

	@ApiPropertyOptional({
		enum: WhereOrder,
		example: WhereOrder.DESC,
		description: 'order',
		default: WhereOrder.DESC,
	})
	@IsOptional()
	@IsEnum(WhereOrder)
	readonly order?: WhereOrder = WhereOrder.DESC;

	@ApiPropertyOptional({
		example: 'createdAt',
		description: 'sort',
		default: 'createdAt',
	})
	@IsOptional()
	readonly sort?: string = 'createdAt';

	@ApiPropertyOptional({ example: '', description: 'search', default: '' })
	@IsOptional()
	readonly search?: string = '';
}

export abstract class DefaultPaginationMeta {
	@ApiProperty({ example: 0, description: 'offset', default: 0 })
	readonly offset: number = 0;

	@ApiProperty({ example: 10, description: 'limit', default: 10 })
	readonly limit: number = 10;

	@ApiProperty({ example: 1, description: 'total', default: 0 })
	readonly total: number = 0;
}

export abstract class DefaultFindOneWhereRequest {
	@ApiProperty({ example: false, description: 'with deleted', default: false })
	@IsBoolean()
	@IsOptional()
	readonly withDeleted?: boolean = false;
}

export interface DefaultResourceContract<
	TEntity,
	TCreateRequest,
	TUpdateRequest,
	TFindAllWhereRequest,
	TFindOneWhereRequest,
> {
	create?(request: TCreateRequest): Promise<TEntity>;
	findAll?(query: TFindAllWhereRequest): Promise<[TEntity[], number]>;
	findOne?(id: string, request?: TFindOneWhereRequest): Promise<TEntity>;
	update?(id: string, request: TUpdateRequest): Promise<TEntity>;
	delete?(id: string): Promise<void>;
	restore?(id: string): Promise<void>;
	forceDelete?(id: string): Promise<void>;
}
