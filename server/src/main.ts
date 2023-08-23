import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as passport from 'passport';
import * as session from 'express-session';
const MongoDBStore = require('connect-mongodb-session')(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  ConfigModule.forRoot();
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      name: 'sessionId',
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000,
      },
      store: MongoDBStore({
        collection: 'Session',
        uri: process.env.DATABASE_URL,
      }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const port = process.env.PORT;
  const coloredPort = `\x1b[33m\x1b[1m${port}\x1b[0m`;
  const coloredText = `\x1b[32m\x1b[1m]> Server running on port\x1b[0m`;
  const message = `${coloredText} ${coloredPort}`;

  await app.listen(port);
  console.log(message);
}

bootstrap();
