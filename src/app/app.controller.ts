import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
	@ApiOperation({ summary: 'Welcome' })
	@ApiOkResponse({ type: String })
	@Get()
	@HttpCode(HttpStatus.OK)
	welcome(): string {
		return 'Welcome to the API!';
	}

	@ApiOperation({ summary: 'Health check' })
	@ApiOkResponse({ type: String })
	@Get('health')
	@HttpCode(HttpStatus.OK)
	health(): string {
		return 'Server is healthy';
	}
}
