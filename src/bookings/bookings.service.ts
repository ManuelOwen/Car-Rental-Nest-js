import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}
  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const booking = this.bookingRepository.create(createBookingDto);
    return this.bookingRepository.save(booking);
  }

  findAll() {
    return this.bookingRepository.find();
  }

  findOne(id: number) {
    return this.bookingRepository.findOneBy({ id });
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingRepository.preload({
      id,
      ...updateBookingDto,
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    // ✅ Save the updated entity to persist changes
    await this.bookingRepository.save(booking);

    return 'Booking updated successfully';
  }

  async remove(id: number) {
    const booking = await this.bookingRepository.findOneBy({ id });
    if (booking) {
      await this.bookingRepository.remove(booking);
    }
    return booking;
  }
}
