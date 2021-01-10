import { Field, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class CoreEntity {
  @PrimaryColumn({ generated: 'uuid' })
  @Field(() => String)
  id: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}
