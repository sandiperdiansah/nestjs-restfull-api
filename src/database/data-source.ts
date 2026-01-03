import { typeOrmConfig } from 'src/config';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
	...typeOrmConfig,
	migrationsTableName: 'migrations',
});

export default dataSource;
