import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategoriesTable1767373755616 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'categories',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						isNullable: false,
						default: 'uuid_generate_v4()',
					},
					{
						name: 'name',
						type: 'varchar',
						length: '255',
						isNullable: false,
					},
					{
						name: 'slug',
						type: 'varchar',
						length: '255',
						isNullable: false,
						isUnique: true,
					},
					{
						name: 'isActive',
						type: 'boolean',
						isNullable: false,
						default: true,
					},
					{
						name: 'createdAt',
						type: 'timestamp',
						isNullable: false,
						default: 'CURRENT_TIMESTAMP',
					},
					{
						name: 'updatedAt',
						type: 'timestamp',
						isNullable: false,
						default: 'CURRENT_TIMESTAMP',
						onUpdate: 'CURRENT_TIMESTAMP',
					},
					{
						name: 'deletedAt',
						type: 'timestamp',
						isNullable: true,
						default: null,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('categories');
	}
}
