import { Field, InputType, ObjectType } from '@nestjs/graphql';
import sequelize from 'sequelize';
import {
  BeforeCreate,
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from 'src/user/entity/user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Table({ timestamps: false })
export class Test extends Model<Test> {
  @Field()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;

  @Field()
  @Column
  @Field(() => String)
  userName: string;

  @Column
  @Field(() => String)
  email: string;

  @Column
  @Field(() => String)
  password: string;

  @CreatedAt
  @Column({ defaultValue: sequelize.literal('now()') })
  @Field(() => Date)
  createdAt: Date;

  @UpdatedAt
  @Column({ allowNull: true })
  @Field(() => Date)
  updatedAt: Date;
}
