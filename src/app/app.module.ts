import { AppController } from '@/app/app.controller';
import { CategoryModule } from '@/app/category/category.module';
import { ProjectModule } from '@/app/project/project.module';
import { TechModule } from '@/app/tech/tech.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
	imports: [UserModule, CategoryModule, TechModule, ProjectModule],
	controllers: [AppController],
})
export class AppModule {}
