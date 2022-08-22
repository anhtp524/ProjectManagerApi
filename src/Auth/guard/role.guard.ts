import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from 'src/Api/Account/enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  private rolePass: Role;
  constructor(role: Role) {
    this.rolePass = role;
  }

  canActivate(context: ExecutionContext) {
    const request: any = context.switchToHttp().getRequest<Request>();
    const user = request.user;
    return this.rolePass === user.role;
  }
}