import { Injectable, NotAcceptableException } from '@nestjs/common';
import { comparePasswords } from '../utils/bcrypt.utils';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email: username },
    });

    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }

    const passwordValid = await comparePasswords(password, user.password);

    if (!passwordValid) {
      throw new NotAcceptableException('Invalid password');
    }

    return {
      id: user.id,
      email: user.email,
    };
  }

  async findSessionById(userId: string) {
    try {
      const sessions = await this.prisma.session.findMany();
      const filteredSessions = sessions.filter((session) => {
        const sessionInfo = session.session;
        return sessionInfo.user.userId === userId;
      });

      if (filteredSessions && filteredSessions.length > 0) {
        return filteredSessions;
      }

      return null;
    } catch (error) {
      console.log('Error findSessionById', error);
      throw new Error('Error while fetching sessions: ' + error.message);
    }
  }
}
