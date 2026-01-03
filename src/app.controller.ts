import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';

@ApiTags('App')
@Controller()
export class AppController {
	@Get()
	getHello(@I18n() i18n: I18nContext) {
		return i18n.t('');
	}
	@ApiOperation({ summary: 'Health check' })
	@ApiResponse({ status: 200, description: 'health check' })
	@Get('health')
	get(): string {
		return 'OK';
	}
}
