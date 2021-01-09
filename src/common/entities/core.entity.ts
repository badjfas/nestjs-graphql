import { Field } from '@nestjs/graphql';
import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

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
