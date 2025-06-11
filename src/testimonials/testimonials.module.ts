import { Module } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { TestimonialsController } from './testimonials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testimonial } from './entities/testimonial.entity';
import { AtStrategy, RolesGuard } from 'src/auth/guards';
import { user } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Testimonial, user])],
  controllers: [TestimonialsController],
  providers: [TestimonialsService, AtStrategy, RolesGuard],
})
export class TestimonialsModule {}
