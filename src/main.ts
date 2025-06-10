import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // using middleware globbally
  app.use(new LoggerMiddleware().use.bind(new LoggerMiddleware()));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  // database configuration
  const configService = app.get(ConfigService);

  console.log('Database config:', {
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    database: configService.get<string>('DB_NAME'),
    autoLoadEntities: configService.get<boolean>('DB_AUTOLOAD'),
    synchronize: configService.get<boolean>('DB_SYNC'),
  });
  console.log('this app is running on port:', process.env.PORT ?? 3000);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
  process.exit(1);
});
