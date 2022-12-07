import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailService } from './../mail/mail.service';
import { MongooseModule } from '@nestjs/mongoose'
import { User } from 'src/users/schemas/user.schema';
import { UserSchema } from './schemas/user.schema';
import { FileService } from 'src/file/file.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, MailService, FileService],
  exports: [UsersService],
})
export class UsersModule { }
