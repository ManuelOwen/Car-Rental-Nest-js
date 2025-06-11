import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RolesGuard } from 'src/auth/guards';
import { user } from 'src/users/entities/user.entity';
// import { UsersModule } from 'src/users/users.module';
// import { Admin } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([user]), JwtModule.register({})],
  controllers: [AdminController],
  providers: [AdminService, AtStrategy, RolesGuard],
  exports: [RolesGuard, AdminService],
})
export class AdminModule {}
