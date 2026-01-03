import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config';
import { CategoryModule } from 'src/modules/category/category.module';
import { AppController } from './app.controller';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		TypeOrmModule.forRoot(typeOrmConfig),
		CategoryModule,
	],
	controllers: [AppController],
})
export class AppModule {}
