import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Relation,
  ManyToOne,
} from 'typeorm';
import { VehicleBrand } from '../../vehicle_brand/entities/vehicle_brand.entity';
import { user } from '../../users/entities/user.entity';
@Entity('vehicle')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  brand_id: number;
  @Column()
  model: string;
  @Column()
  price_per_day: number;
  @Column()
  availability: boolean;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
  @OneToOne(() => Vehicle, (vehicle) => vehicle.brand_id)
  vehicleBrand: Relation<VehicleBrand>;

  // many to one (many vehicles one user)
  @ManyToOne(() => user, (user) => user.vehicles)
  user: Relation<user>;
}
