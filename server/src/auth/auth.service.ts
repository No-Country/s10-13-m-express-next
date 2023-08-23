import { Injectable, NotAcceptableException, BadRequestException } from '@nestjs/common';
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
        id: user.id,
        email: user.email,
        provider: 'local',
      };
    }
    return null;
  }

  async findOneById(id: string) {
    try {
      const idPattern = /^[0-9a-f]{24}$/i;

      if (!id || !idPattern.test(id)) {
        throw new BadRequestException('User ID entered is incorrect');
      }
  
      const result = await this.prisma.session.findUnique({
        where: { id: id },
      });

      if (result) {
        return result;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }
}
