import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CacheMeService } from './cache-me.service';
import { CreateCacheMeDto } from './dto/create-cache-me.dto';
import { UpdateCacheMeDto } from './dto/update-cache-me.dto';

@Controller('cache-me')
export class CacheMeController {
  constructor(private readonly cacheMeService: CacheMeService) {}

  @Post()
  create(@Body() createCacheMeDto: CreateCacheMeDto) {
    return this.cacheMeService.create(createCacheMeDto);
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.cacheMeService.get(key);
  }

  @Patch(':key')
  update(
    @Param('key') key: string,
    @Body() updateCacheMeDto: UpdateCacheMeDto,
  ) {
    return this.cacheMeService.update(key, updateCacheMeDto);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.cacheMeService.remove(key);
  }
}
