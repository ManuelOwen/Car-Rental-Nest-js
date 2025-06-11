import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { GuestUsersModule } from './guest_users/guest_users.module';
import { LoggerMiddleware } from './logger.middleware';
import { VehicleBrandModule } from './vehicle_brand/vehicle_brand.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/db.config';
import { SeedModule } from './seed/seed.module';
import { BookingsModule } from './bookings/bookings.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CustomThrottlerGuard } from './throttler.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
  ThrottlerModule.forRoot({
    throttlers:[
      {
        ttl: 30000,
        limit: 3,
      },
    ],
  }),
    
    DatabaseModule,
    UsersModule,
    AdminModule,
    GuestUsersModule,
    VehicleBrandModule,
    VehicleModule,
    SeedModule,
    BookingsModule,
    TestimonialsModule,
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<number>('CACHE_TTL', 60000),
        store: configService.get<string>('REDIS_URL')
          ? await import('cache-manager-redis-store').then((m) => m.redisStore)
          : 'memory',
        url: configService.get<string>('REDIS_URL'),
      }),
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}