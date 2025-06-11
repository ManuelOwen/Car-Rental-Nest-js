import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { DatabaseModule } from 'src/database/database.module';
import { user } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, user]), DatabaseModule],
  controllers: [VehicleController],
  providers: [VehicleService],
  exports: [VehicleService],
})
export class VehicleModule {}
