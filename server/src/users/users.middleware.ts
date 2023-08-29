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
      const { userId } = req.cookies;
      const { id: idBody } = req.body;
      const idParams = req.originalUrl.split('/')[3];
      const sameUser = userId === idBody || userId === idParams;
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
