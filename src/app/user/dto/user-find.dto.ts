import { UserDto } from '@/app/user/dto/user.dto';
import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import {
	DefaultFindAllDtoRequest,
	DefaultFindOneDtoRequest,
	DefaultMetaDtoResponse,
	DefaultUserRole,
	DefaultWhereStatus,
} from 'src/default';

// find all
export class FindAllUserDtoRequest extends DefaultFindAllDtoRequest {
	@ApiPropertyOptional({ enum: DefaultUserRole })
	@IsOptional()
	@IsString()
	@IsEnum(DefaultUserRole)
	filterRole?: DefaultUserRole;

	@ApiPropertyOptional({ enum: DefaultWhereStatus })
	@IsOptional()
	@IsString()
	@IsEnum(DefaultWhereStatus)
	filterEmailVerified?: DefaultWhereStatus;

	@ApiPropertyOptional({ enum: DefaultWhereStatus })
	@IsOptional()
	@IsString()
	@IsEnum(DefaultWhereStatus)
	filterPhoneVerified?: DefaultWhereStatus;
}

export class PaginationUserDtoResponse {
	@ApiProperty({ type: () => DefaultMetaDtoResponse })
	meta: DefaultMetaDtoResponse;

	@ApiProperty({ type: () => [UserDto] })
	data: UserDto[];
}

export class FindAllUserDtoResponse {
	@ApiProperty({ example: 'Find all user successful' })
	message: string;

	@ApiProperty({ type: () => PaginationUserDtoResponse })
	data: PaginationUserDtoResponse;
}

// find one
export class FindOneUserDtoRequest extends DefaultFindOneDtoRequest {
	@ApiPropertyOptional({ example: faker.internet.username() })
	@IsOptional()
	@IsString()
	username?: string;

	@ApiPropertyOptional({ example: faker.internet.email() })
	@IsOptional()
	@IsString()
	@IsEmail()
	email?: string;

	@ApiPropertyOptional({ example: faker.phone.number() })
	@IsOptional()
	@IsString()
	@IsPhoneNumber()
	phone?: string;
}

export class FindOneUserDtoResponse {
	@ApiProperty({ example: 'Find one user successful' })
	message: string;

	@ApiProperty({ type: () => UserDto })
	data: UserDto;
}

// not found
export class NotFoundUserDtoResponse {
	@ApiProperty({ example: 'User not found' })
	message: string;

	@ApiProperty({ example: 'Not Found' })
	error: string;
}

// confilct
export class ConflictUserDtoResponse {
	@ApiProperty({ example: 'User already exists' })
	message: string;

	@ApiProperty({ example: 'Conflict' })
	error: string;
}
