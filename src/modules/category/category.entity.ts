import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
	readonly name: string;

	@Column({ type: 'varchar', length: 255, unique: true, nullable: false })
	readonly slug: string;

	@Column({ type: 'boolean', nullable: false, default: true })
	readonly isActive: boolean;

	@CreateDateColumn({ type: 'timestamptz' })
	readonly createdAt: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	readonly updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	readonly deletedAt?: Date;
}
