import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { user } from '../../users/entities/user.entity';
// import {Testimonial } from './testimonial.entity';

@Entity('testimonials')
export class Testimonial {
  @PrimaryGeneratedColumn()
  testimonial_id: number;

  @Column()
  user_id: number;

  @Column()
  testimonial: string;

  @Column()
  status: boolean;

  @Column()
  created_at: Date;

  // relations
  //    many to one (many testimonials one user)
  @ManyToOne(() => user, (user) => user.testimonials, { onDelete: 'CASCADE' })
  user: user;
  // many to Many(manytestimonials to many users)
  @ManyToMany(() => user, (user) => user.testimonials)
  users: user[];
  // one to many (one testimonial many testimonials)
  // @OneToMany(() => Testimonial, (testimonial) => testimonial.testimonial_id)
  // testimonials: Testimonial[];
}
