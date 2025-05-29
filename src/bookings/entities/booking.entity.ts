import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Relation,
  OneToMany,
} from 'typeorm';
import { user } from '../../users/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  vehicle_id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  booking_date: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  return_date: Date;

  // relations
  @OneToMany(() => user, (user) => user.user_id)
  user: Relation<user>;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.id)
  vehicle: Relation<Vehicle>;
}
