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
  app.use(new LoggerMiddleware().use)
  app.useGlobalPipes(new ValidationPipe(
    { whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
     }));
     const configService = app.get(ConfigService);
  console.log('Database config:', {
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    database: configService.get('DB_NAME'),
    autoLoadEntities: configService.get('DB_AUTOLOAD'),
    synchronize: configService.get('DB_SYNC'),
  });
    console.log('this app is running on port:', process.env.PORT ?? 3000);
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
