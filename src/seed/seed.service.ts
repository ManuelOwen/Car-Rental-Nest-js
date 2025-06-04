import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { user } from '../users/entities/user.entity';
// Make sure the user entity has 'email', 'firstName', 'lastName', etc. as properties, not 'first_name', 'last_name', etc.
import { Testimonial } from '../testimonials/entities/testimonial.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { VehicleBrand } from 'src/vehicle_brand/entities/vehicle_brand.entity';
// import { profile } from 'console';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(user)
    private readonly userRepository: Repository<user>,
    private readonly dataSource: DataSource,

    @InjectRepository(Testimonial)
    private readonly testimonialRepository: Repository<Testimonial>,

    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,

    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(VehicleBrand)
    private readonly vehicleBrandRepository: Repository<VehicleBrand>,
  ) {}

  async seed() {
    this.logger.log('Seeding database...');
    // declare queryRunner outside try-catch so it's accessible in both
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      // clear all tables in the correct order to avoid foreign key constrains
      this.logger.log('clear all exiting data from the database');
      // using queryrunner for query support
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.commitTransaction();
      this.logger.log('Database cleared successfully');
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Error clearing database', err);
      throw err;
    } finally {
      await queryRunner.release();
      this.logger.log('QueryRunner released');
    }
    // seed users
    this.logger.log('Seeding users...');
    const user = [
      {
        email: 'ten@example.com',
        first_name: 'john',
        last_name: 'doe',
        password: 'password123',
        status: true,
        phone_number: 1234567890,
        profile_picture: 'https://example.com/profile1.jpg',
        last_login: new Date(),
      },
      {
        email: 'mari@example.com',
        first_name: 'jane',
        last_name: 'doe',
        password: 'password123', // Ensure you hash passwords in a real application
        status: true,
        phone_number: 987654321,
        profile_picture: 'https://example.com/profile2.jpg',
        last_login: new Date(),
      },
    ];

    // Create users
    await this.userRepository.save(user);
    this.logger.log('Users seeded successfully');

    // seed testimonials
    this.logger.log('Seeding testimonials...');
    const testimonials = [
      {
        user_id: 1,
        testimonial: 'This is a great service!',
        testimonial_id: 1,
        status: true,
        created_at: new Date(),
      },
      {
        user_id: 2,
        testimonial: 'I had an amazing experience!',
        testimonial_id: 2,
        status: true,
        created_at: new Date(),
      },
    ];

    await this.testimonialRepository.save(testimonials);
    this.logger.log('Testimonials seeded successfully');
    // seed vehicles
    this.logger.log('Seeding vehicles...');
    const vehicle = {
      brand_id: 1,
      vehicle_id: 1,
      price_per_day: 50,
      model: 'Corolla',
      year: 2020,
      color: 'Blue',
      status: true,
      availability: true,
      created_at: new Date(),
    };
    const vehicles = [
      vehicle,
      {
        brand_id: 2,
        user_id: 2,
        vehicle_id: 2,
        make: 'Honda',
        model: 'Civic',
        year: 2021,
        color: 'Red',
        status: true,
      },
      {
        brand_id: 2,
        user_id: 2,
        vehicle_id: 2,
        make: 'Honda',
        model: 'Civic',
        year: 2021,
        color: 'Red',
        status: true,
        availability: true,
        created_at: new Date(),
      },
    ];
    if (this.vehicleRepository) {
      await this.vehicleRepository.save(vehicle);
      this.logger.log('Vehicles seeded successfully');
    } else {
      this.logger.warn(
        'Vehicle repository is not defined, skipping vehicle seeding.',
      );
    }
    // seed bookings
    this.logger.log('Seeding bookings...');
    const bookings = [
      {
        user_id: 1,
        booking_id: 1,
        vehicle_id: 1,
        booking_date: new Date(),
        return_date: new Date(),
        status: 'confirmed',
      },
      {
        user_id: 2,
        vehicle_id: 2,
        start_date: new Date(),
        end_date: new Date(),
        status: 'pending',
      },
    ];

    await this.bookingRepository.save(bookings);
    this.logger.log('Bookings seeded successfully');
    this.logger.log('Database seeding completed successfully');
  }
  // seed vehicle brands
  async seedVehicleBrands() {
    this.logger.log('Seeding vehicle brands...');
    // Add your vehicle brand seeding logic here
    // Example:
    const vehicleBrands = [
      { brand_id: 1, brand_name: 'Toyota', created_at: new Date() },
      { brand_id: 2, brand_name: 'Honda', created_at: new Date() },
      { brand_id: 3, brand_name: 'Ford', created_at: new Date() },
      { brand_id: 4, brand_name: 'Chevrolet', created_at: new Date() },
      { brand_id: 5, brand_name: 'Nissan', created_at: new Date() },
      { brand_id: 6, brand_name: 'BMW', created_at: new Date() },
      { brand_id: 7, brand_name: 'Mercedes-Benz', created_at: new Date() },
      { brand_id: 8, brand_name: 'Volkswagen', created_at: new Date() },
      { brand_id: 9, brand_name: 'Hyundai', created_at: new Date() },
      { brand_id: 10, brand_name: 'Kia', created_at: new Date() },
    ];
    await this.vehicleBrandRepository.save(vehicleBrands);
    this.logger.log('Vehicle brands seeded successfully');

    //seed admin
    this.logger.log('Seeding admin user...');
    const adminUser = [
      {
        email: 'toi@example.com',
        first_name: 'Admin',
        last_name: 'User',
        password: 'adminpassword',
        status: true,
        phone_number: 1234567890,
        profile_picture: 'https://example.com/admin_profile.jpg',
        last_login: new Date(),
      },
    ];

    await this.userRepository.save(adminUser);
    this.logger.log('Admin user seeded successfully');
  }
}
