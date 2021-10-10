import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
export type ListDocument = List & Document;
export type TaskDocument = Task & Document;

@Schema({ timestamps: true, id: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  lists: List[];

  @Prop()
  updatedAt: Date;

  @Prop()
  createdAt: Date;
}

@Schema({ timestamps: true, id: true })
export class List {
  @Prop()
  name: string;

  @Prop()
  color: string;

  @Prop()
  icon: string;

  @Prop()
  tasks: Task[];

  @Prop()
  updatedAt: Date;

  @Prop()
  createdAt: Date;
}

@Schema({ timestamps: true, id: true })
export class Task {
  @Prop()
  body: string;

  @Prop()
  color: string;

  @Prop()
  links: string[];

  @Prop()
  notes: string;

  @Prop()
  completed: string;

  @Prop()
  updatedAt: Date;

  @Prop()
  createdAt: Date;
}

export const ListSchema = SchemaFactory.createForClass(List);
export const TaskSchema = SchemaFactory.createForClass(Task);
export const UserSchema = SchemaFactory.createForClass(User);
