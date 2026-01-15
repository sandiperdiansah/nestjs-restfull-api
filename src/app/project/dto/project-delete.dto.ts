import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteProjectDtoResponse {
	@ApiProperty({ example: HttpStatus.OK })
	statusCode: number;

	@ApiProperty({ example: 'Delete project successful' })
	message: string;
}
