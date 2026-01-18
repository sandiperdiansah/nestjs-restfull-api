import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDtoResponse {
	@ApiProperty({ example: 'Delete user successful' })
	message: string;
}

export class RestoreUserDtoResponse {
	@ApiProperty({ example: 'Restore user successful' })
	message: string;
}
