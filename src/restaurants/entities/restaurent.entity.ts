import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsBoolean, Length, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';
@InputType({ isAbstract: true }) // dto와 entity의 Type를 같게 해줘야함
@ObjectType() //for Graphql
@Entity() //for TypeORM
export class Restaurant {
  @PrimaryColumn({ generated: 'uuid' })
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  @IsOptional()
  @Column({ default: false })
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
