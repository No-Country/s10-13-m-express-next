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
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
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
    try {
      const { emails } = profile;
      let user = await this.usersService.findByEmail(emails[0].value);

      if (!user) {
        const newUser = await this.usersService.createUsers({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: emails[0].value,
          phone: '0000000000',
          profileImage: profile.photos[0].value,
          role: 'volunteer',
          password: '',
        });

        if (!newUser) {
          throw new NotAcceptableException('Error creating user');
        }

        user = newUser;
      }

      this.googleSerializer.serializeUser(user, (err, userSerialized) => {
        if (err) {
          throw err;
        }
        request.session.user = userSerialized;
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
