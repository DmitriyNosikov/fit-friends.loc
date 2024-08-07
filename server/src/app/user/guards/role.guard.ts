import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export const ROLES_METADATA_KEY = 'role';

@Injectable()
/** 
 * To use this guard, you have to set route-metadata with key ROLES_METADATA_KEY and roles list
 * Use @SetMetadata(ROLES_METADATA_KEY, [ UserRoleEnum.CLIENT, UserRoleEnum.TRAINER ... ])
 */
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let roles = this.reflector.get<string | string[]>(ROLES_METADATA_KEY, context.getHandler());
        const request = context.switchToHttp().getRequest();

        if(!roles) {
            throw new Error(`Route ${request.url} protected by roles policy, but roles Metadata wasn't set.`);
        }

        if(!Array.isArray(roles)) {
            roles = [roles];
        }

        const user = request.user;

        if(!roles.includes(user.role)) {
            throw new UnauthorizedException('Route isn`t exists or user haven`t access to this');
        }

        return true;
    }
}