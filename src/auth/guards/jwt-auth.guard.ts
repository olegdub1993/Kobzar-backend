/* eslint-disable prettier/prettier */

import { AuthGuard } from "@nestjs/passport"
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JsonWebTokenError } from "jsonwebtoken"

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any, context: any, status?: any) {

        if (info instanceof JsonWebTokenError) {
            throw new UnauthorizedException("Invalid JWT")
        }
        return super.handleRequest(err, user, info, context, status)
    }
}
