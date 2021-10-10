import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { UsersModule } from '../../db/users.module';
import { SessionController } from './session.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [SessionController],
})
export class SessionModule {}
