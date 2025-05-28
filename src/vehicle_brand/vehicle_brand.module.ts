import { Module } from '@nestjs/common';
import { VehicleBrandService } from './vehicle_brand.service';
import { VehicleBrandController } from './vehicle_brand.controller';

@Module({
  controllers: [VehicleBrandController],
  providers: [VehicleBrandService],
})
export class VehicleBrandModule {}
