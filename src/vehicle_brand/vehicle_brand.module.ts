import { Module } from '@nestjs/common';
import { VehicleBrandService } from './vehicle_brand.service';
import { VehicleBrandController } from './vehicle_brand.controller';
import { AtStrategy, RolesGuard } from 'src/auth/guards';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { VehicleBrand } from './entities/vehicle_brand.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([VehicleBrand]),
    UsersModule,
  ],
  controllers: [VehicleBrandController],
  providers: [VehicleBrandService, AtStrategy, RolesGuard],
  exports: [VehicleBrandService, TypeOrmModule],
})
export class VehicleBrandModule {}
