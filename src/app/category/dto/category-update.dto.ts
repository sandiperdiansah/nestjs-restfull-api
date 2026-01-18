import { CategoryDto } from '@/app/category/dto';
import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDtoRequest {
	@ApiPropertyOptional({ example: faker.lorem.word() })
	@IsOptional()
	@IsString()
	name?: string;

	@ApiPropertyOptional({ example: faker.lorem.slug() })
	@IsOptional()
	@IsString()
	slug?: string;

	@ApiPropertyOptional({ example: faker.lorem.sentence() })
	@IsOptional()
	@IsString()
	description?: string;
}

export class UpdateCategoryDtoResponse {
	@ApiProperty({ example: 'Update category successful' })
	message: string;

	@ApiProperty({ type: () => CategoryDto })
	data: CategoryDto;
}
