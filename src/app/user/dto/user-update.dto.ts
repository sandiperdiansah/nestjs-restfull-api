import { CreateUserDtoRequest } from '@/app/user/dto/user-create.dto';
import { UserDto } from '@/app/user/dto/user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDtoRequest extends CreateUserDtoRequest {
	@ApiPropertyOptional({ example: new Date() })
	@IsOptional()
	@IsString()
	emailVerifiedAt?: Date;

	@ApiPropertyOptional({ example: new Date() })
	@IsOptional()
	@IsString()
	phoneVerifiedAt?: Date;
}

export class UpdateUserDtoResponse {
	@ApiProperty({ example: 'Update user successful' })
	message: string;

	@ApiProperty({ type: () => UserDto })
	data: UserDto;
}
