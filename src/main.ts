import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { appConfig, PORT, swaggerConfig } from 'src/config';
import { MainModule } from './main.module';

async function bootstrap() {
	const app = await NestFactory.create(MainModule, appConfig);

	app.setGlobalPrefix('api', {
		exclude: ['/', '/health'],
	});
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	swaggerConfig(app);

	await app.listen(PORT, () => {
		Logger.log(`server runing -> http://localhost:${PORT}`);
	});
}
void bootstrap();
