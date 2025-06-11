import { Module, forwardRef } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { AtStrategy, RolesGuard } from 'src/auth/guards';
import { UsersModule } from '../users/users.module'; // <-- Import UsersModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    forwardRef(() => UsersModule), // <-- Add this line
  ],
  controllers: [BookingsController],
  providers: [BookingsService, AtStrategy, RolesGuard],
  exports: [BookingsService],
})
export class BookingsModule {}
