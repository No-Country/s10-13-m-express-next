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

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Session() session): Promise<any> {
    const user = req.user;
    console.log('user', req.session, user);
    session.userId = user.userId;
    session.email = user.email;

    // Obtiene el ID de la sesión actual
    const sessionId = req.sessionID;

    return { User: user, SessionID: sessionId, msg: 'User logged in' };
  }

  @Get('/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Request() req, @Session() session) {
    // const session = await this.authService.createSession(req.user);
    console.log('session', session, req);
    // return { User: req.user, SessionID: session.id, msg: 'User logged in' };
  }

  @Post('/verify')
  async verify(@Body() body, @Res() res: Response): Promise<any> {
    const SessionID = body.SessionID;
    console.log('SessionID', SessionID);
    const session = await this.authService.findOneById(SessionID);
    if (session) {
      console.log('session', session);
      return res.status(200).json({ verified: true });
    } else {
      //devolvemos 401
      throw new UnauthorizedException();
    }
  }

  @Get('/session')
  async getAllSessions(@Res() res: Response): Promise<any> {
    const sessions = await this.authService.findAll();
    return res.status(200).json({ sessions });
  }
}
