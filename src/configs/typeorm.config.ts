import 'dotenv/config';
import path from 'path';
import { DataSourceOptions } from 'typeorm';

export const typeOrmConfig: DataSourceOptions = {
	type: process.env.DB_TYPE || 'postgres',
	host: process.env.DB_HOST || 'localhost',
	port: Number(process.env.DB_PORT) || 5432,
	username: process.env.DB_USERNAME || 'postgres',
	password: process.env.DB_PASSWORD || 'postgres',
	database: process.env.DB_DATABASE || 'postgres',
	logging: Boolean(process.env.DB_LOGGING) || false,
	ssl: false,
	synchronize: false,

	entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],
	migrations: [path.join(__dirname, '..', 'database', 'migrations', '*.{ts,js}')],
} as DataSourceOptions;
