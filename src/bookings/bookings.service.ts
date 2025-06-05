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
  async create(createBookingDto: CreateBookingDto): Promise<{ message: string; booking: Booking }> {
    const booking = this.bookingRepository.create(createBookingDto);
    const savedBooking = await this.bookingRepository.save(booking);
    return { message: 'Booking created successfully', booking: savedBooking };
  }

  findAll() {
    return this.bookingRepository.find();
  }

  async findOne(id: number) {
    const booking = await this.bookingRepository.findOneBy({ id });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto): Promise<{ message: string; booking: Booking }> {
    const booking = await this.bookingRepository.preload({
      id,
      ...updateBookingDto,
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    const updatedBooking = await this.bookingRepository.save(booking);

    return { message: 'Booking updated successfully', booking: updatedBooking };
  }

  async remove(id: number): Promise<{ message: string }> {
    const booking = await this.bookingRepository.findOneBy({ id });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    await this.bookingRepository.remove(booking);
    return { message: 'Booking deleted successfully' };
  }}
