import { DefaultMediaType } from '@/default';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateMediaDtoRequest {
	@ApiProperty({ example: 'https://placehold.co/600*400.webp' })
	@IsNotEmpty()
	@IsUrl()
	url: string;

	@ApiProperty({ example: DefaultMediaType.IMAGE })
	@IsNotEmpty()
	@IsEnum(DefaultMediaType)
	type: DefaultMediaType;
}
