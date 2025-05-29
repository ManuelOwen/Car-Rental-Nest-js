import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
// import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { VehicleBrand } from 'src/vehicle_brand/entities/vehicle_brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, VehicleBrand])],
  providers: [SeedService],
  // controllers: [SeedController],
})
export class SeedModule {}
