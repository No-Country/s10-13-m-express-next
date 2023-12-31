import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from '../../users/users.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, {
      userId: user.id,
      email: user.email,
      provider: 'local',
    });
  }

  async deserializeUser(serializedUser: any, done: CallableFunction) {
    const user = await this.usersService.findOneById(serializedUser.userId);
    done(null, {
      userId: user.id,
      email: user.email,
      provider: 'local',
    });
  }
}
