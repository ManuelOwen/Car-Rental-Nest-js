import { Module } from '@nestjs/common';
import { userService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './entities/user.entity';
import { DatabaseModule } from '../database/database.module';
import { AtStrategy, RolesGuard } from 'src/auth/guards';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([user])],
  providers: [userService, AtStrategy, RolesGuard],
  controllers: [UsersController],
  exports: [userService, TypeOrmModule],
})
export class UsersModule {}
