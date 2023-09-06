import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: Function) {
    try {
      const { userid, sessionid } = req.headers;
      console.log('userId headers', req.headers);
      const session = await this.authService.findSessionById(sessionid as string);
      if (session) {
        next();
      } else {
        throw new UnauthorizedException('Invalid session');
      }
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid session or server error');
    }
  }
}
