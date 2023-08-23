import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { NotAcceptableException } from '@nestjs/common';
import { GoogleSerializer } from './google.serializer';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly usersService: UsersService,
    private readonly googleSerializer: GoogleSerializer,
  ) {
    super({
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
      callbackURL: 'http://localhost:3001/auth/google/callback',
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const { emails } = profile;
    const user = await this.usersService.findByEmail(emails[0].value);

    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }

    this.googleSerializer.serializeUser(user, (err, userSerialized) => {
      if (err) {
        throw err;
      }
      request.session.user = userSerialized;
    });

    return user;
  }
}
