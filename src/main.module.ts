import { Module } from '@nestjs/common';

import { AppModule } from '@/app/app.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		TypeOrmModule.forRoot(typeOrmConfig),
		AppModule,
	],
})
export class MainModule {}
