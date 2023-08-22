import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class PrismaService {
  constructor() {
    this.client = new PrismaClient();
  }

  private readonly client: PrismaClient;
}
