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
  ApiHeader,
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
      const { user } = req;
      return {
        userId: user.id,
        sessionId: session.sessionId,
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
      const { session, user } = req;

      const slug = session.redirectURL ?? process.env.GOOGLE_DEFAULT_REDIRECT;

      delete req.session.redirectURL;
      const url = user
        ? `${process.env.CLIENT_URL}/${slug}?userId=${user.id}&sessionId=${session.sessionId}`
        : `${process.env.CLIENT_URL}/login?failed=true`;
      return { url };
    } catch (error) {
      throw new NotAcceptableException();
    }
  }

  @Get('/verify')
  @ApiResponse({ status: HttpStatus.OK, type: VerificationResponseDto })
  @ApiBody({ type: VerificationRequestDto }) /**@ApiHeader({ name: 'userId' }) */
  async verify(
    @Body() body,
    @Res() res: Response,
    @Request() req,
  ): Promise<any> {
    try {
      const { userid, sessionid } = req.headers;
      const session = await this.authService.findSessionById(sessionid);
      if (session) {
        return res.status(200).json({ verified: true });
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Get('/logout')
  async logout(@Res() res: Response): Promise<any> {
    try {
      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
