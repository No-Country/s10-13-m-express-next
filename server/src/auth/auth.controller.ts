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
  Redirect,
  HttpStatus,
  NotAcceptableException,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local/local.auth.guard';
import { Response } from 'express';
import { GoogleOauthGuard } from './google/google-oauth.guard';
import { LocalResponseDto } from './dto/localResponse.dto';
import { LocalRequestDto } from './dto/localRequest.dto';
import { VerificationResponseDto } from './dto/verificationResponse.dto';
import { VerificationRequestDto } from './dto/verificationRequest.dto';

const cookieConfig: any = {
  expires: new Date(Date.now() + process.env.SESSION_MAX_AGE),
  httpOnly: false,
  secure: true,
  sameSite: 'none',
};

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, type: LocalResponseDto })
  @ApiBody({ type: LocalRequestDto })
  async login(
    @Request() req,
    @Session() session,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    try {
      const { user, sessionID } = req;

      response.cookie('sessionId', sessionID, {
        maxAge: process.env.SESSION_MAX_AGE as any,
        httpOnly: false,
        secure: true,
        sameSite: 'none',
      });

      response.cookie('userId', user.id, {
        maxAge: process.env.SESSION_MAX_AGE as any,
        httpOnly: false,
        secure: true,
        sameSite: 'none',
      });

      req.session.destroy();
      return {
        userId: user.id,
        message: 'Login successful',
      };
    } catch (error) {
      console.log('error', error);
      throw new NotAcceptableException();
    }
  }

  @Get('/google')
  @UseGuards(GoogleOauthGuard)
  @ApiOperation({
    summary: 'Autenticación con Google',
    description: 'Dirijete a esta ruta para autenticarte con Google',
  })
  async googleAuth(@Query('redirectURL') redirectURL: string) {}

  @Get('/google/callback')
  @UseGuards(GoogleOauthGuard)
  @ApiExcludeEndpoint()
  @Redirect()
  async googleAuthRedirect(
    @Session() session,
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const { session, user, sessionID } = req;
      const slug = session.redirectURL ?? process.env.GOOGLE_DEFAULT_REDIRECT;

      response.cookie('sessionId', sessionID, {
        maxAge: process.env.SESSION_MAX_AGE as any,
        httpOnly: false,
        secure: true,
        sameSite: 'none',
      });

      response.cookie('userId', user.id, {
        maxAge: process.env.SESSION_MAX_AGE as any,
        httpOnly: false,
        secure: true,
        sameSite: 'none',
      });

      req.session.destroy();
      const url = user
        ? `${process.env.CLIENT_URL}/${slug}?userId=${user.id}`
        : `${process.env.CLIENT_URL}/login?failed=true`;
      return { url };
    } catch (error) {
      throw new NotAcceptableException();
    }
  }

  @Get('/verify')
  @ApiResponse({ status: HttpStatus.OK, type: VerificationResponseDto })
  @ApiBody({ type: VerificationRequestDto })
  async verify(@Body() body, @Res() res: Response, @Request() req): Promise<any> {
    try {
      const { userId, sessionId } = req.cookies;
      console.log(req);
      const session = await this.authService.findSessionById(userId);
      if (session) {
        return res.status(200).json({ verified: true });
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Get('/test')
  async test(@Res() res: Response): Promise<any> {
    try {
      return res.status(200).json({ message: 'test' });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Get('/logout')
  async logout(@Res() res: Response): Promise<any> {
    try {
      res.clearCookie('sessionId', {
        sameSite: 'none',
        secure: true,
      });
      
      res.clearCookie('userId', {
        sameSite: 'none',
        secure: true,
      });
      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
