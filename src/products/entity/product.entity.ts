import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

@InputType('input', { isAbstract: true })
@ObjectType()
@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Column()
  @Field((type) => String, { nullable: true })
  productName: string;

  @Column()
  @Field((type) => String, { nullable: true })
  category: string;

  @Column()
  @Field((type) => String, { nullable: true })
  area: string;

  @Column()
  @Field((type) => String, { nullable: true })
  price: string;

  @Column({ length: 2000 })
  @Field((type) => String, { nullable: true })
  content: string;

  @Column()
  @Field((type) => String, { nullable: true, defaultValue: '판매중' })
  state: string;

  @Column()
  @Field((type) => String, { nullable: true })
  fileString: string;

  @Column()
  @Field((type) => String, { nullable: true })
  viewCounts: string;

  @Column({ type: 'timestamp' })
  @Field((type) => String)
  createdAt: Date;
}
