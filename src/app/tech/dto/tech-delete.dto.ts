import { ApiProperty } from '@nestjs/swagger';

export class DeleteTechDtoResponse {
	@ApiProperty({ example: 'Delete tech successful' })
	message: string;
}

export class RestoreTechDtoResponse {
	@ApiProperty({ example: 'Restore tech successful' })
	message: string;
}
