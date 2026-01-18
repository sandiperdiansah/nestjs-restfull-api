import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { version } from '../../package.json';

class AppDtoResponse {
	@ApiProperty({ example: 'Welcome to API!' })
	message: string;

	@ApiProperty({ example: process.env.APP_ENV })
	environment: string;

	@ApiProperty({ example: version })
	version: string;
}

@ApiTags('App')
@Controller()
export class AppController {
	@ApiOperation({ summary: 'Welcome' })
	@ApiOkResponse({ type: AppDtoResponse })
	@Get()
	@HttpCode(HttpStatus.OK)
	welcome(): AppDtoResponse {
		return {
			message: 'Welcome to API!',
			environment: process.env.APP_ENV!,
			version: version,
		};
	}

	@ApiOperation({ summary: 'Health check' })
	@ApiOkResponse({ type: String })
	@Get('health')
	@HttpCode(HttpStatus.OK)
	health(): string {
		return 'Server is healthy';
	}
}
