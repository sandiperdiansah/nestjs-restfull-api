import { DefaultMediaType } from '@/default';
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateMsMediasTable1768418191661 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'ms_medias',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'url',
						type: 'text',
						isNullable: false,
					},
					{
						name: 'type',
						type: 'enum',
						enum: Object.values(DefaultMediaType),
						isNullable: false,
					},
					{
						name: 'projectId',
						type: 'uuid',
						isNullable: true,
					},
					{
						name: 'createdAt',
						type: 'timestamptz',
						default: 'CURRENT_TIMESTAMP',
					},
					{
						name: 'updatedAt',
						type: 'timestamptz',
						default: 'CURRENT_TIMESTAMP',
						onUpdate: 'CURRENT_TIMESTAMP',
					},
					{
						name: 'deletedAt',
						type: 'timestamptz',
						isNullable: true,
					},
				],
			}),
		);

		// Add foreign key constraint
		await queryRunner.createForeignKey(
			'ms_medias',
			new TableForeignKey({
				columnNames: ['projectId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'ms_projects',
				onDelete: 'CASCADE',
				name: 'FK_medias_projects',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// Drop foreign key first
		await queryRunner.dropForeignKey('ms_medias', 'FK_medias_projects');
		// Then drop table
		await queryRunner.dropTable('ms_medias');
	}
}
