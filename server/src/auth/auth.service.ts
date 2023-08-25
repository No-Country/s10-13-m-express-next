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

    if (user && passwordValid) {
      const session = await this.prisma.session.create({
        data: {
          expires: new Date(),
          userId: user.id,
        },
      });

      return {
        sessionId: session.id,
        email: user.email,
      };
    }
    return null;
  }

  async findSessionById(userId: string) {
    try {
      const sessions = await this.prisma.session.findMany({
        where: { userId },
      });

      if (sessions && sessions.length > 0) {
        return sessions;
      }

      return null;
    } catch (error) {
      throw new Error('Error while fetching sessions: ' + error.message);
    }
  }
}
