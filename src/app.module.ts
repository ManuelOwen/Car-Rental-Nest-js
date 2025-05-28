import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { GuestUsersModule } from './guest_users/guest_users.module';
import { LoggerMiddleware } from './logger.middleware';
import { VehicleBrandModule } from './vehicle_brand/vehicle_brand.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import  databaseConfig  from './database/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/db.config';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
      
  
    

  DatabaseModule,
  UsersModule,
  AdminModule,
  GuestUsersModule,
  VehicleBrandModule,
  VehicleModule,
  ],
  controllers: [],
  providers: [],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
  