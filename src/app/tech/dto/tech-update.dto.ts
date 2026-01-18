import { TechDto } from '@/app/tech/dto/tech.dto';
import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTechDtoRequest {
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

export class UpdateTechDtoResponse {
	@ApiProperty({ example: 'Update tech successful' })
	message: string;

	@ApiProperty({ type: () => TechDto })
	data: TechDto;
}
