import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { appConfig, PORT } from 'src/configs/app.config';
import { swaggerConfig } from 'src/configs/swagger.config';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, appConfig);

	app.setGlobalPrefix('api', {
		exclude: ['health'],
	});
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	swaggerConfig(app);

	await app.listen(PORT, () => {
		Logger.log(`server runing -> http://localhost:${PORT}`);
	});
}
void bootstrap();
