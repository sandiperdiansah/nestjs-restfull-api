import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../../package.json';

const configService = new ConfigService();

export const swaggerConfig = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle('API Documentation')
		.setDescription('Documentation for API endpoints')
		.setVersion(version)
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(
		configService.get<string>('SWAGGER_DOCS_PATH', 'api/docs'),
		app,
		document,
	);
};
