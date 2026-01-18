import { DefaultUserRole } from '@/default';
import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

export class UserDto {
	@ApiProperty({ example: uuid() })
	id: string;

	@ApiPropertyOptional({ example: faker.person.fullName() })
	name?: string;

	@ApiPropertyOptional({ example: faker.person.firstName() })
	firstName?: string;

	@ApiPropertyOptional({ example: faker.person.middleName() })
	middleName?: string;

	@ApiPropertyOptional({ example: faker.person.lastName() })
	lastName?: string;

	@ApiPropertyOptional({ example: faker.internet.username() })
	username?: string;

	@ApiPropertyOptional({ example: faker.internet.email() })
	email?: string;

	@ApiPropertyOptional({ example: faker.phone.number({ style: 'international' }) })
	phone?: string;

	@ApiPropertyOptional({ example: faker.image.avatar() })
	image?: string;

	@ApiProperty({
		example: DefaultUserRole.USER,
		enum: DefaultUserRole,
	})
	role: DefaultUserRole;

	@ApiPropertyOptional({ example: null })
	emailVerifiedAt?: Date;

	@ApiPropertyOptional({ example: null })
	phoneVerifiedAt?: Date;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ example: new Date() })
	updatedAt: Date;

	@ApiPropertyOptional({ example: null })
	deletedAt?: Date;
}
