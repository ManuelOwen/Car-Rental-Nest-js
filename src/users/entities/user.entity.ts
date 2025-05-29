import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  Relation,
  JoinTable,
} from 'typeorm';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { Testimonial } from 'src/testimonials/entities/testimonial.entity';

@Entity('user')
export class user {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  status: boolean;

  @Column()
  phone_number: number;
  @Column({ nullable: true })
  profile_picture: string;

  @Column({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  last_login: Date;

  // relations
  // one to many(one user many vehicles)
  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Relation<Vehicle[]>;

  // one to one (one user one vehicle)
  @OneToOne(() => Vehicle, (vehicle) => vehicle.user)
  vehicle: Relation<Vehicle>;
  // many to many (many users many vehicles)
  @ManyToMany(() => Vehicle, (vehicle) => vehicle.user)
  users: Relation<Vehicle[]>;
  //  one to many relation with user(one user many testimonials)
  @OneToMany(() => Testimonial, (testimonial) => testimonial.user_id)
  testimonials: Testimonial[];
  // many to many relation with user(many users many testimonials)
  @ManyToMany(() => Testimonial, (testimonial) => testimonial.users)
  @JoinTable()
  manyToManyTestimonials: Testimonial[];
}
