import { MongoMemoryModule } from './utils/mongomemory.module';
import { SessionModule } from './api/session/session.module';
import { UserModule } from './api/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongoMemoryModule,
    SessionModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/bit-todo-dev'),
  ],
})
export class AppModule {}
