import { ApiProperty } from '@nestjs/swagger';

export class DeleteProjectDtoResponse {
	@ApiProperty({ example: 'Delete project successful' })
	message: string;
}

export class RestoreProjectDtoResponse {
	@ApiProperty({ example: 'Restore project successful' })
	message: string;
}
