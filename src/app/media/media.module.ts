import { MediaEntity } from '@/app/media/media.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([MediaEntity])],
})
export class MediaModule {}
