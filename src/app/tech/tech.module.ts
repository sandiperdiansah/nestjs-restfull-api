import { TechController } from '@/app/tech/tech.controller';
import { TechEntity } from '@/app/tech/tech.entity';
import { TechRepository } from '@/app/tech/tech.repository';
import { TechService } from '@/app/tech/tech.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([TechEntity])],
	providers: [TechService, TechRepository],
	controllers: [TechController],
})
export class TechModule {}
