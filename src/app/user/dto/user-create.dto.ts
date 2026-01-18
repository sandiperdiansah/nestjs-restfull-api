import { UserDto } from '@/app/user/dto/user.dto';
import { DefaultUserRole } from '@/default';
import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsEmail,
	IsEnum,
	IsOptional,
	IsPhoneNumber,
	IsString,
	IsUrl,
} from 'class-validator';

export class CreateUserDtoRequest {
	@ApiPropertyOptional({ example: faker.person.fullName() })
	@IsOptional()
	@IsString()
	name?: string;

	@ApiPropertyOptional({ example: faker.person.firstName() })
	@IsOptional()
	@IsString()
	firstName?: string;

	@ApiPropertyOptional({ example: faker.person.middleName() })
	@IsOptional()
	@IsString()
	middleName?: string;

	@ApiPropertyOptional({ example: faker.person.lastName() })
	@IsOptional()
	@IsString()
	lastName?: string;

	@ApiPropertyOptional({ example: faker.internet.username() })
	@IsOptional()
	@IsString()
	username?: string;

	@ApiPropertyOptional({ example: faker.internet.email() })
	@IsOptional()
	@IsString()
	@IsEmail()
	email?: string;

	@ApiPropertyOptional({ example: faker.phone.number({ style: 'international' }) })
	@IsOptional()
	@IsString()
	@IsPhoneNumber()
	phone?: string;

	@ApiPropertyOptional({ example: faker.image.avatar() })
	@IsOptional()
	@IsString()
	@IsUrl()
	image?: string;

	@ApiPropertyOptional({ example: DefaultUserRole.USER, enum: DefaultUserRole })
	@IsOptional()
	@IsString()
	@IsEnum(DefaultUserRole)
	role?: DefaultUserRole;
}

export class CreateUserDtoResponse {
	@ApiProperty({ example: 'Create user successful' })
	message: string;

	@ApiProperty({ type: () => UserDto })
	data: UserDto;
}
