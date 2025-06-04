import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { GuestUsersModule } from './guest_users/guest_users.module';
import { LoggerMiddleware } from './logger.middleware';
import { VehicleBrandModule } from './vehicle_brand/vehicle_brand.module';
import { VehicleModule } from './vehicle/vehicle.module';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
// import databaseConfig from './database/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/db.config';
import { SeedModule } from './seed/seed.module';

import { BookingsModule } from './bookings/bookings.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

import { ConfigService, ConfigModule } from '@nestjs/config';
// import { CacheMeModule } from './cache-me/cache-me.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    DatabaseModule,
    UsersModule,
    AdminModule,
    GuestUsersModule,
    VehicleBrandModule,
    VehicleModule,
    SeedModule,
    BookingsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      // load: [databaseConfig],
    }),
    TestimonialsModule,
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: 60000, // time to live in milliseconds

        // To use Redis, install 'cache-manager-redis-store' and uncomment below:
        store: await import('cache-manager-redis-store').then(
          (m) => m.redisStore,
        ),
        url: configService.getOrThrow<string>('REDIS_URL'),
      }),
    }),
    AuthModule,
    // CacheMeModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
