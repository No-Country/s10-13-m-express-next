import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: Function) {
    console.log('UserMiddleware');
    try {
      const { userid } = req.headers;
      const { id: idBody } = req.body;
      const idParams = req.originalUrl.split('/')[3];
      const sameUser = userid === idBody || userid === idParams;
      if (sameUser) {
        next();
      } else {
        throw new UnauthorizedException('Invalid userId');
      }
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid userId or server error');
    }
  }
}
