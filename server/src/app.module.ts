import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { InitiativesModule } from './initiatives/initiatives.module';
import { PostsModule } from './posts/posts.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, UsersModule, AuthModule, InitiativesModule, PostsModule, ReviewsModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, CloudinaryService],
})
export class AppModule {}
