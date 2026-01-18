import { CategoryDto } from '@/app/category/dto';
import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDtoRequest {
	@ApiProperty({ example: faker.lorem.word() })
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({ example: faker.lorem.slug() })
	@IsNotEmpty()
	@IsString()
	slug: string;

	@ApiPropertyOptional({ example: faker.lorem.sentence() })
	@IsOptional()
	@IsString()
	description?: string;
}

export class CreateCategoryDtoResponse {
	@ApiProperty({ example: 'Create category successful' })
	message: string;

	@ApiProperty({ type: () => CategoryDto })
	data: CategoryDto;
}
