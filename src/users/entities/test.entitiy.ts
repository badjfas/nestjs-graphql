import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({})
@InputType({ isAbstract: true })
@ObjectType()
export class Test extends Model<Test> {
  @Column
  @Field(() => String)
  firstName: string;

  @Column
  @Field(() => String)
  lastName: string;

  @Column({ defaultValue: true })
  @Field(() => String)
  isActive: boolean;
}
