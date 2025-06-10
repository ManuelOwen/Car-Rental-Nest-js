import { Injectable } from '@nestjs/common';
import { CreateVehicleBrandDto } from './dto/create-vehicle_brand.dto';
import { UpdateVehicleBrandDto } from './dto/update-vehicle_brand.dto';

@Injectable()
export class VehicleBrandService {
  private vehicleBrands = [
    {
      brand_id: 1,
      brand_name: 'Toyota',
      created_at: new Date(),
    },
    {
      brand_id: 2,
      brand_name: 'Honda',
      created_at: new Date(),
    },
    {
      brand_id: 3,
      brand_name: 'Ford',
      created_at: new Date(),
    },
    {
      brand_id: 4,
      brand_name: 'Chevrolet',
      created_at: new Date(),
    },
    {
      brand_id: 5,
      brand_name: 'Nissan',
      created_at: new Date(),
    },
  ];

  create(createVehicleBrandDto: CreateVehicleBrandDto) {
    const newBrand = {
      ...createVehicleBrandDto,
      brand_id: this.vehicleBrands.length + 1,
      created_at: new Date(),
    };
    this.vehicleBrands.push(newBrand);
    return {
      message: 'Vehicle brand created successfully',
      brand: newBrand,
    };
  }

  update(id: number, updateVehicleBrandDto: UpdateVehicleBrandDto) {
    const brandIndex = this.vehicleBrands.findIndex(
      (brand) => brand.brand_id === id,
    );
    if (brandIndex !== -1) {
      this.vehicleBrands[brandIndex] = {
        ...this.vehicleBrands[brandIndex],
        ...updateVehicleBrandDto,
      };
      return {
        message: 'Vehicle brand updated successfully',
        brand: this.vehicleBrands[brandIndex],
      };
    }
    return { message: 'Vehicle brand not found' };
  }

  remove(id: number) {
    const brandIndex = this.vehicleBrands.findIndex(
      (brand) => brand.brand_id === id,
    );
    if (brandIndex !== -1) {
      this.vehicleBrands.splice(brandIndex, 1);
      return { message: 'Vehicle brand deleted successfully' };
    }
    return { message: 'Vehicle brand not found' };
  }
  findAll(search?: string) {
    if (search) {
      return this.vehicleBrands.filter((brand) =>
        brand.brand_name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return this.vehicleBrands;
  }
  findOne(id: number) {
    const brand = this.vehicleBrands.find((brand) => brand.brand_id === id);
    if (!brand) {
      return { message: 'Vehicle brand not found' };
    }
    return brand;
  }
}
