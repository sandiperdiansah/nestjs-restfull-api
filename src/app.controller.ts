import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
	@ApiOperation({ summary: 'Health check' })
	@ApiResponse({ status: 200, description: 'health check' })
	@Get('health')
	get(): string {
		return 'OK';
	}
}
