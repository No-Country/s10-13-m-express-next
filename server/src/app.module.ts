import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
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
import { AuthMiddleware } from './auth/auth.middleware';
import { UserMiddleware } from './users/users.middleware';
import { UuidService } from './uuid/uuid.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    InitiativesModule,
    PostsModule,
    ReviewsModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, CloudinaryService, UuidService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'users/(.*)', method: RequestMethod.GET }, 'users')
      .forRoutes('users');
      //EXCEPCION EN POST, GET, GET ID
    //APLICADO A USERS EN PUT, DELETE
    consumer
      .apply(UserMiddleware)
      .exclude(
        { path: 'users/(.*)', method: RequestMethod.GET },
        { path: 'users/(.*)', method: RequestMethod.POST },
        'users',
              )
      .forRoutes('users');
    //EXCEPCION EN POST, GET, GET ID
    //APLICADO A USERS EN DELETE, PUT
  }
}
