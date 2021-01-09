import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsString, IsBoolean, Length } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';
@ObjectType() //for Graphql
@Entity() //for TypeORM
export class Restaurant {
  @PrimaryColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Boolean, { nullable: true })
  @Column()
  isVegan: boolean;

  @Field(() => String)
  @Column()
  address: string;

  @Field(() => String)
  @Column()
  ownerName: string;

  @Field(() => String)
  @Column()
  categoryName: string;
}
