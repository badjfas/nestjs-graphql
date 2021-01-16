import { Field, InputType, ObjectType } from '@nestjs/graphql';
import sequelize from 'sequelize';
import {
  BeforeCreate,
  BeforeFind,
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import * as crypto from 'crypto';
import { InternalServerErrorException } from '@nestjs/common';
import { Verification } from './verification.entitiy';
import { Verifications } from 'src/users/entities/verification.entitiy';
@ObjectType()
@InputType({ isAbstract: true })
@Table({
  timestamps: false,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  @Field(() => Number)
  id: number;

  @Field(() => String)
  @Column
  email: string;

  @Field(() => String)
  @Column
  userName: string;

  @Field(() => String)
  @Column
  password: string;

  @Field(() => Boolean)
  @Column
  isValid: boolean;

  @Field(() => Date)
  @Column({ defaultValue: sequelize.literal('now()') })
  createdAt: Date;

  @Field(() => Date)
  @Column({ defaultValue: sequelize.literal('now()') })
  updatedAt: Date;

  @BeforeCreate
  static async makeHashPassword(user: User) {
    try {
      user.password = await crypto
        .createHash('sha512')
        .update(user.password)
        .digest('base64');
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
