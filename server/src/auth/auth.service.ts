import { Injectable, NotAcceptableException } from '@nestjs/common';
import { comparePasswords } from '../utils/bcrypt.utils';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);

    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }

    const passwordValid = await comparePasswords(password, user.password);

    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      console.log('password valid', user.id);
      return {
        userId: user.id,
        email: user.email,
      };
    }
    return null;
  }

  async findOneById(id:string) {
    try {
      //pasamos a obj id
      const user = await this.prisma.session.findMany({ where: { sessionId: id } });
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      const sessions = await this.prisma.session.findMany();
      if (sessions) {
        return sessions;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async createSession(user) {
    const uuid = uuidv4();
    const newSession = {
      sessionId: uuid,
      expires: new Date(Date.now() + 3600000),
      session: {
        userId: user.userId,
        email: user.email,
      },
    };

    try {
      const session = await this.prisma.session.create({
        data: newSession,
      });

      return session;
    } catch (error) {
      console.log(error);
    }
  }
}
