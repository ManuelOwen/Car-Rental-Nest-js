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
]


  create(createVehicleBrandDto: CreateVehicleBrandDto) {
    return createVehicleBrandDto
  }

  findAll(search?: string) {
    if (search) {
      return this.vehicleBrands.filter(brand =>
        brand.brand_name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return this.vehicleBrands;
  }

  findOne(id: number) {
    return this.vehicleBrands.find(brand => brand.brand_id === id);
  }

  // update(id: number, updateVehicleBrandDto: UpdateVehicleBrandDto) {
  //   const brandIndex = this.vehicleBrands.findIndex(brand => brand.brand_id === id);
  //   if (brandIndex !== -1) {
  //     this.vehicleBrands[brandIndex] = {
  //       ...this.vehicleBrands[brandIndex],
  //       ...updateVehicleBrandDto,
  //     };
  //     return this.vehicleBrands[brandIndex];
  //   }
  //   return null;
  // }
  update(id:number, UpdateVehicleBrandDto:UpdateVehicleBrandDto){
    return{id, ...UpdateVehicleBrandDto
    };
  }


  remove(id: number) {
    const brandIndex = this.vehicleBrands.findIndex(brand => brand.brand_id === id);
    if (brandIndex !== -1) {
      this.vehicleBrands.splice(brandIndex, 1);
      return { deleted: true };
    }
    return { deleted: false };
  }
}
