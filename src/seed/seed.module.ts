import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
// import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { SeedController } from './seed.controller';
// import { VehicleBrand } from 'src/vehicle_brand/entities/vehicle_brand.entity';
import { user } from 'src/users/entities/user.entity';
import { Testimonial } from 'src/testimonials/entities/testimonial.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { VehicleBrand } from 'src/vehicle_brand/entities/vehicle_brand.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      user,
      Testimonial,
      Vehicle,
      Booking,
      VehicleBrand,
    ]),
  ],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
