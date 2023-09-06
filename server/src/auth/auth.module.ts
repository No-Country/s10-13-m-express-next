import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { GoogleStrategy } from './google/google.strategy';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GoogleSerializer } from './google/google.serializer';
import { LocalSerializer } from './local/local.serializer';
import { UuidService } from 'src/uuid/uuid.service';

@Module({
  imports: [UsersModule, PassportModule, PrismaModule],
  providers: [
    AuthService,
    LocalStrategy,
    PrismaService,
    GoogleStrategy,
    GoogleSerializer,
    LocalSerializer,
    UuidService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
