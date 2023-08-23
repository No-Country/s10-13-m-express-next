import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { GoogleStrategy } from "./google/google.strategy";
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [UsersModule, PassportModule, PrismaModule],
  providers: [AuthService, LocalStrategy, PrismaService, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
