/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from './../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Token } from './schemas/refreshToken.schema';
import { TokenSchema } from './schemas/refreshToken.schema';


@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]), UsersModule]
})


export class AuthModule { }
