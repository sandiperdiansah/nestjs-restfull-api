import { DefaultUserRole } from '@/default';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1768654969164 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'name',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'firstName',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'middleName',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'lastName',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'username',
						type: 'varchar',
						isUnique: true,
						isNullable: true,
					},
					{
						name: 'email',
						type: 'varchar',
						isUnique: true,
						isNullable: true,
					},
					{
						name: 'phone',
						type: 'varchar',
						isUnique: true,
						isNullable: true,
					},
					{
						name: 'image',
						type: 'text',
						isNullable: true,
					},
					{
						name: 'role',
						type: 'enum',
						enum: Object.values(DefaultUserRole),
						isNullable: false,
						default: `'${DefaultUserRole.USER}'`,
					},
					{
						name: 'emailVerifiedAt',
						type: 'timestamptz',
						isNullable: true,
					},
					{
						name: 'phoneVerifiedAt',
						type: 'timestamptz',
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
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}
}
