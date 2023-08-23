import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../../users/users.service';
import { LocalSerializer } from './local.serializer';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly usersService: UsersService,
    private readonly localSerializer: LocalSerializer,
    private readonly authService: AuthService,
  ) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(
    request: any,
    username: string,
    password: string,
  ): Promise<any> {
    console.log('user log', username, password);
    const eMail = username.toLowerCase();
    const user = await this.authService.validateUser(eMail, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    this.localSerializer.serializeUser(user, (err, userSerialized) => {
      if (err) {
        throw err;
      }
      request.session.user = userSerialized;
    });

    return user;
  }
}
