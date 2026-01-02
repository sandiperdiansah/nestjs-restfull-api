import { typeOrmConfig } from 'src/configs/typeorm.config';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
	...typeOrmConfig,
	migrationsTableName: 'migrations',
});

export default dataSource;
