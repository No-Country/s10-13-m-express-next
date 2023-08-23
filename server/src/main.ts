import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as passport from 'passport';
import * as session from 'express-session';
const MongoDBStore = require('connect-mongodb-session')(session);
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  ConfigModule.forRoot();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());  

  app.use(
    session({
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

  // Docs
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('S10 NEST NEXT - REST-FULL API')
    .setDescription('S10 NEST NEXT endpoints')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT;
  const coloredPort = `\x1b[33m\x1b[1m${port}\x1b[0m`;
  const coloredText = `\x1b[32m\x1b[1m]> Server running on port\x1b[0m`;
  const message = `${coloredText} ${coloredPort}`;

  await app.listen(port);
  console.log(message);
}

bootstrap();
