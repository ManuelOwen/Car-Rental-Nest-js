import { Module } from '@nestjs/common';
import { userService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([user])],
  providers: [userService],
  controllers: [UsersController],
})
export class UsersModule {}
