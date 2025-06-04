import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Testimonial } from './entities/testimonial.entity'; // Assuming Testimonial is an entity defined elsewhere
import { Repository } from 'typeorm';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly testimonialRepository: Repository<Testimonial>,
  ) {}

  async create(createTestimonialDto: CreateTestimonialDto) {
    const testimonial = this.testimonialRepository.create(createTestimonialDto);
    await this.testimonialRepository.save(testimonial);
    return 'Testimonial created successfully';
    // Optionally, you can return the saved testimonial
    return this.testimonialRepository.save(testimonial);
  }

  findAll() {
    return this.testimonialRepository.find();
  }

  async findOne(id: number) {
    const testimonial = await this.testimonialRepository.findOneBy({
      testimonial_id: id,
    });
    if (!testimonial) {
      throw new NotFoundException(`Testimonial with id ${id} not found`);
    }
    return testimonial;
  }

  async update(id: number, updateTestimonialDto: UpdateTestimonialDto) {
    const testimonial = await this.testimonialRepository.preload({
      testimonial_id: id,
      ...updateTestimonialDto,
    });
    if (!testimonial) {
      throw new NotFoundException(`Testimonial with id ${id} not found`);
      console.log('error');
    }
    return this.testimonialRepository.save(testimonial);
  }

  remove(id: number) {
    return this.testimonialRepository.delete({ testimonial_id: id });
  }
}
