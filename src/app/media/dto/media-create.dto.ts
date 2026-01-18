import { DefaultMediaType } from '@/default';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateMediaDtoRequest {
	@ApiProperty({ example: faker.image.url() })
	@IsNotEmpty()
	@IsUrl()
	url: string;

	@ApiProperty({ example: DefaultMediaType.IMAGE })
	@IsNotEmpty()
	@IsEnum(DefaultMediaType)
	type: DefaultMediaType;
}
