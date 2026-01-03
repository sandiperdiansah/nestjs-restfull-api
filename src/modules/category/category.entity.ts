import { ApiProperty } from '@nestjs/swagger';
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
	@ApiProperty({ example: 'uuid-1234', description: 'id', default: 'uuid-1234' })
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@ApiProperty({
		example: 'category name',
		description: 'category name',
		default: 'category name',
	})
	@Column({ type: 'varchar', length: 255, nullable: false })
	readonly name: string;

	@ApiProperty({
		example: 'category-slug',
		description: 'category slug',
		default: 'category-slug',
	})
	@Column({ type: 'varchar', length: 255, unique: true, nullable: false })
	readonly slug: string;

	@ApiProperty({ example: true, description: 'category status', default: true })
	@Column({ type: 'boolean', nullable: false, default: true })
	readonly isActive: boolean;

	@ApiProperty({
		example: new Date(),
		description: 'created at',
		default: new Date(),
	})
	@CreateDateColumn({ type: 'timestamptz' })
	readonly createdAt: Date;

	@ApiProperty({
		example: new Date(),
		description: 'updated at',
		default: new Date(),
	})
	@UpdateDateColumn({ type: 'timestamptz' })
	readonly updatedAt: Date;

	@ApiProperty({
		example: null,
		description: 'deleted at',
		default: null,
	})
	@DeleteDateColumn({ type: 'timestamptz' })
	readonly deletedAt?: Date;
}
