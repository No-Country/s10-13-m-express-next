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
    @Res() res: Response,
  ): Promise<any> {
    try {
      const user = req.user;
      return res.status(200).json({
        sessionId: req.sessionID,
        user: {
          id: user.id,
          email: user.email,
          provider: 'local',
        },
      });
    } catch (error) {
      throw new NotAcceptableException();
    }
  }

  @Get('/google')
  @UseGuards(GoogleOauthGuard)
  @ApiOperation({
    summary: 'Autenticación con Google',
    description: 'Dirijete a esta ruta para autenticarte con Google',
  })
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(GoogleOauthGuard)
  @ApiExcludeEndpoint()
  @Redirect()
  async googleAuthRedirect(
    @Session() session,
    @Request() req,
    @Res() res: Response,
  ) {
    try {
      if (req.user) {
        return {
          url: `${process.env.CLIENT_URL}/feed?sessionId=${req.sessionID}&userId=${req.user.id}`,
        };
      } else {
        return {
          url: `${process.env.CLIENT_URL}/login?failed=true`,
        };
      }
    } catch (error) {
      throw new NotAcceptableException();
    }
  }

  @Post('/verify')
  @ApiResponse({ status: HttpStatus.OK, type: VerificationResponseDto })
  @ApiBody({ type: VerificationRequestDto })
  async verify(@Body() body, @Res() res: Response): Promise<any> {
    try {
      const userId = body.userId;
      const session = await this.authService.findOneById(userId);
      if (session) {
        return res.status(200).json({ verified: true });
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
