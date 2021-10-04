import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { SessionModule } from './modules/session/session.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bit-todo-dev'),
    UserModule,
    SessionModule,
  ],
})
export class AppModule {}
