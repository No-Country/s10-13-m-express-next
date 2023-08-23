import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Session,
  UnauthorizedException,
  Res,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local/local.auth.guard';
import { Response } from 'express';
import { GoogleOauthGuard } from './google/google-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Session() session): Promise<any> {
    const user = req.user;
    console.log('user', session, user);
    return { msg: 'User logged in' };
  }

  @Get('/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Session() session, @Request() req) {
    console.log('session', session, req.user, req.sessionID);
  }

  @Post('/verify')
  async verify(@Body() body, @Res() res: Response): Promise<any> {
    const userId = body.userId;
    const session = await this.authService.findOneById(userId);
    if (session) {
      console.log('session', session);
      return res.status(200).json({ verified: true });
    } else {
      throw new UnauthorizedException();
    }
  }
}
