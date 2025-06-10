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

  async create(
    createVehicleDto: CreateVehicleDto,
  ): Promise<{ message: string; vehicle: Vehicle }> {
    const vehicle = this.vehicleRepository.create(createVehicleDto);
    const savedVehicle = await this.vehicleRepository.save(vehicle);
    return { message: 'Vehicle created successfully', vehicle: savedVehicle };
  }

  findAll() {
    return this.vehicleRepository.find();
  }

  findOne(id: number) {
    return this.vehicleRepository.findOneBy({ id });
  }

  async update(
    id: number,
    dto: UpdateVehicleDto,
  ): Promise<{ message: string; vehicle: Vehicle }> {
    const vehicle = await this.vehicleRepository.preload({ id, ...dto });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    const updatedVehicle = await this.vehicleRepository.save(vehicle);
    return { message: 'Vehicle updated successfully', vehicle: updatedVehicle };
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.vehicleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return { message: 'Vehicle deleted successfully' };
  }
}
