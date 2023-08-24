import { HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleOauthGuard extends AuthGuard('google') {
  constructor() {
    super();
  }

  handleRequest(err: any, user: any) {
    try {
      return user;
    } catch (error) {
      console.log("error 1", err);
      throw new HttpException(err.message, err.status);
    }
  }
}
