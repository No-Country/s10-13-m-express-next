import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PostsModule } from './posts/posts.module';
import { InitiativesModule } from './initiatives/initiatives.module';

@Module({
  imports: [PrismaModule, UsersModule, PostsModule, InitiativesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
