import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehicleRepository.create(createVehicleDto);
    return this.vehicleRepository.save(vehicle);
  }

  findAll() {
    return this.vehicleRepository.find();
  }

  findOne(id: number) {
    return this.vehicleRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateVehicleDto) {
    const vehicle = await this.vehicleRepository.preload({ id, ...dto });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return this.vehicleRepository.save(vehicle);
  }

  remove(id: number) {
    return this.vehicleRepository.delete(id);
  }
}
