import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from '../users/entities/user.entity';
import { Testimonial } from '../testimonials/entities/testimonial.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Booking } from '../bookings/entities/booking.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(user)
    private readonly userRepository: Repository<user>,

    @InjectRepository(Testimonial)
    private readonly testimonialRepository: Repository<Testimonial>,

    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,

    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async seed() {
    this.logger.log('Seeding database...');

    // Create users
    const users: user[] = [];

    const user1 = this.userRepository.create({
      email: 'alice@example.com',
      first_name: 'Alice',
      last_name: 'Smith',
      password: 'password1',
      status: 'active',
      phone_number: '123-456-7890',
      profile_picture: 'https://example.com/profile/alice.jpg',
      last_login: new Date(),
    });
    users.push(user1);

    const user2 = this.userRepository.create({
      email: 'bob@example.com',
      first_name: 'Bob',
      last_name: 'Johnson',
      password: 'password2',
      status: 'active',
      phone_number: '098-765-4321',
      profile_picture: 'https://example.com/profile/bob.jpg',
      last_login: new Date(),
    });
    users.push(user2);

    // Save users
    await this.userRepository.save(users);

    // Create vehicles
    const vehicles = this.vehicleRepository.create([
      { make: 'Toyota', model: 'Corolla', year: 2020 },
      { make: 'Honda', model: 'Civic', year: 2021 },
    ]);
    await this.vehicleRepository.save(vehicles);

    // Create testimonials
    const testimonials = this.testimonialRepository.create([
      {
        user_id: users[0].user_id,
        testimonial: 'Great service!',
        status: true,
        created_at: new Date(),
      },
      {
        user_id: users[1].user_id,
        testimonial: 'Very satisfied!',
        status: true,
        created_at: new Date(),
      },
    ]);
    await this.testimonialRepository.save(testimonials);

    // Create bookings
    const bookings = [
      {
        user_id: users[0].user_id,
        vehicle_id: vehicles[0].vehicle_id,
        booking_date: new Date(),
        status: 'confirmed',
      },
      {
        user_id: users[1].user_id,
        vehicle_id: vehicles[1].vehicle_id,
        booking_date: new Date(),
        status: 'pending',
      },
    ].map(data => this.bookingRepository.create(data));
    await this.bookingRepository.save(bookings);

    this.logger.log('Seeding completed!');
    return 'Seeding completed!';
  }
}
