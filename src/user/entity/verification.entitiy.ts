import { Field, InputType, ObjectType } from '@nestjs/graphql';
import sequelize from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
@InputType({ isAbstract: true })
@ObjectType()
@Table({ timestamps: false })
export class Verification extends Model<Verification> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  @Field(() => Number)
  @Column
  id: number;

  @Column
  @Field(() => String)
  code: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Field(() => Date)
  @Column({ defaultValue: sequelize.literal('now()') })
  createdAt: Date;

  @Field(() => Date)
  @Column({ defaultValue: sequelize.literal('now()') })
  updatedAt: Date;
}
