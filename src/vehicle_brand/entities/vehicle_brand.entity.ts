import { Vehicle } from 'src/vehicle/entities/vehicle.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  Relation,
} from 'typeorm';
@Entity('vehicle_brands')
export class VehicleBrand {
  @PrimaryGeneratedColumn()
  brand_id: number;

  @Column({ length: 100 })
  brand_name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  // relations
  // one to many (one vehicle brand many vehicles)
  @OneToMany(() => Vehicle, (vehicle) => vehicle.id)
  vehicles: Relation<Vehicle[]>;
  // many to many (many vehicle brands many vehicles)
  @ManyToMany(() => Vehicle, (vehicle) => vehicle.id)
  vehicleBrands: Relation<Vehicle[]>;
}
