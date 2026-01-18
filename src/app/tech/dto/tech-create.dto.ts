import { TechDto } from '@/app/tech/dto';
import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTechDtoRequest {
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

export class CreateTechDtoResponse {
	@ApiProperty({ example: 'Create tech successful' })
	message: string;

	@ApiProperty({ type: () => TechDto })
	data: TechDto;
}
