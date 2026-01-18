import {
	AcceptLanguageResolver,
	HeaderResolver,
	I18nOptions,
	QueryResolver,
} from 'nestjs-i18n';
import path from 'path';

export const i18nConfig: I18nOptions = {
	fallbackLanguage: 'en',
	loaderOptions: {
		path: path.join(__dirname, '/i18n/'),
		watch: true,
	},
	resolvers: [
		{
			use: QueryResolver,
			options: 'lang',
		},
		AcceptLanguageResolver,
		new HeaderResolver(['x-lang']),
	],
};
