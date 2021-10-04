import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../db/users.module';
import { User, UserSchema } from '../db/users.schema';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import * as dotenv from 'dotenv';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: dotenv.config().parsed.SESSION_SECRET,
      signOptions: { expiresIn: '2 days' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
