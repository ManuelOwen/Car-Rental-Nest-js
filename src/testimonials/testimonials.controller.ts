import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { AtGuard } from 'src/auth/token/token.guard';
import { RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators';
import { Role } from 'src/users/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('testimonials')
@ApiBearerAuth()
@UseGuards(AtGuard, RolesGuard)
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Roles(Role.ADMIN, Role.USER)
  @Post()
  create(@Body() createTestimonialDto: CreateTestimonialDto) {
    return this.testimonialsService.create(createTestimonialDto);
  }

  @Roles(Role.ADMIN, Role.USER, Role.GUEST)
  @Get()
  findAll() {
    return this.testimonialsService.findAll();
  }

  @Roles(Role.ADMIN, Role.USER, Role.GUEST)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.testimonialsService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
  ) {
    return this.testimonialsService.update(id, updateTestimonialDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.testimonialsService.remove(id);
  }
}
