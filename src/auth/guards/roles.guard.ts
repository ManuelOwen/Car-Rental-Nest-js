import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { JWTPayload } from '../../auth/guards/at.guards';
// import { Observable } from 'rxjs';

interface UserRequest extends Request {
  user?: JWTPayload;
}
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(user) private userRepository: Repository<user>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<UserRequest>();
    const user = request.user;
    if (!user) {
      return false; // if there is no user in the request
    }
    // fetch user's profile to get their role
    const userProfile = await this.userRepository.findOne({
      where: { user_id: user.sub },
      select: ['user_id', 'role'],
    });
    if (!userProfile) {
      return false; // user profile not found
    }
    // check if user roles is available in the required roles
    return requiredRoles.some((role) => userProfile.role === role);
  }
}
