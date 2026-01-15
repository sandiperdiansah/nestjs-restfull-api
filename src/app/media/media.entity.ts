import { ProjectEntity } from '@/app/project/project.entity';
import { DefaultMediaType } from '@/default';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('ms_medias')
export class MediaEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'text', nullable: false })
	url: string;

	@Column({ type: 'enum', enum: DefaultMediaType, nullable: false })
	type: DefaultMediaType;

	@CreateDateColumn({ type: 'timestamptz' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	deletedAt?: Date;

	@ManyToOne(() => ProjectEntity, (project) => project.medias)
	project: ProjectEntity;
}
