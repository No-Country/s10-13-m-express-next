import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as passport from 'passport';
import * as session from 'express-session';
import * as connectMongoDBSession from 'connect-mongodb-session';
import * as cookieParser from 'cookie-parser';
import rawBodyMiddleware from './middleware/rawBody.middleware';

const MongoDBStore = connectMongoDBSession(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  });

  ConfigModule.forRoot();
  app.use(cookieParser());
  app.setGlobalPrefix('api/');
  app.useGlobalPipes(new ValidationPipe());
  app.use(rawBodyMiddleware()); // Raw body for stripe web hook
  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000,
      },
      store: new MongoDBStore({
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
