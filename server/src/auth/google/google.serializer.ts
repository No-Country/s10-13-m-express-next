import { UsersService } from '../../users/users.service';
import { User } from '@prisma/client';
import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, {
      userId: user.id,
      email: user.email,
      provider: 'google',
    });
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    const user = await this.usersService.findOneById(userId);
    done(null, {
      userId: user.id,
      email: user.email,
      provider: 'google',
    });
  }
}
