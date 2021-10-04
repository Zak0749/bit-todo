import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { UsersModule } from '../../db/users.module';
import { UserController } from './user.controller';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [UserController],
})
export class UserModule {}
