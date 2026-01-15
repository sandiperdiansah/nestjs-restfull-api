import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteTechDtoResponse {
	@ApiProperty({ example: HttpStatus.OK })
	statusCode: number;

	@ApiProperty({ example: 'Delete tech successful' })
	message: string;
}
