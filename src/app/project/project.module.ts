import { MediaModule } from '@/app/media/media.module';
import { ProjectController } from '@/app/project/project.controller';
import { ProjectEntity } from '@/app/project/project.entity';
import { ProjectRepository } from '@/app/project/project.repository';
import { ProjectService } from '@/app/project/project.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([ProjectEntity]), MediaModule],
	providers: [ProjectService, ProjectRepository],
	controllers: [ProjectController],
})
export class ProjectModule {}
