import { DefaultUserRole } from '@/default';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', nullable: true })
	name?: string;

	@Column({ type: 'varchar', nullable: true })
	firstName?: string;

	@Column({ type: 'varchar', nullable: true })
	middleName?: string;

	@Column({ type: 'varchar', nullable: true })
	lastName?: string;

	@Column({ type: 'varchar', nullable: true, unique: true })
	username?: string;

	@Column({ type: 'varchar', nullable: true, unique: true })
	email?: string;

	@Column({ type: 'varchar', nullable: true, unique: true })
	phone?: string;

	@Column({ type: 'text', nullable: true })
	image?: string;

	@Column({ type: 'enum', enum: DefaultUserRole, default: DefaultUserRole.USER })
	role: DefaultUserRole;

	@Column({ type: 'timestamptz', nullable: true })
	emailVerifiedAt?: Date;

	@Column({ type: 'timestamptz', nullable: true })
	phoneVerifiedAt?: Date;

	@CreateDateColumn({ type: 'timestamptz' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	deletedAt?: Date;
}
