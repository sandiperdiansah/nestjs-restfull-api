import { ApiProperty } from '@nestjs/swagger';

export class DeleteCategoryDtoResponse {
	@ApiProperty({ example: 'Delete category successful' })
	message: string;
}

export class RestoreCategoryDtoResponse {
	@ApiProperty({ example: 'Restore category successful' })
	message: string;
}
