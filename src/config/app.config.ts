import { NestApplicationOptions } from '@nestjs/common';
import 'dotenv/config';

export const PORT = Number(process.env.APP_PORT) || 3001;
const CORS_ALLOWED_ORIGINS = process.env.CORS_ALLOWED_ORIGINS?.split(',') || [];
const CORS_ALLOWED_METHODS = process.env.CORS_ALLOWED_METHODS?.split(',') || [];
const CORS_ALLOWED_HEADERS = process.env.CORS_ALLOWED_HEADERS?.split(',') || [];

export const appConfig: NestApplicationOptions = {
	logger: ['verbose', 'log', 'warn', 'error'],
	cors: {
		origin: CORS_ALLOWED_ORIGINS,
		credentials: true,
		methods: CORS_ALLOWED_METHODS,
		allowedHeaders: CORS_ALLOWED_HEADERS,
	},
};
