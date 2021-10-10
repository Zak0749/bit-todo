import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { UsersModule } from '../../db/users.module';
import { UserController } from './user.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [UserController],
})
export class UserModule {}
