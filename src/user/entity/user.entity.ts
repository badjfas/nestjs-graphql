import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

@InputType('userInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Column()
  @Field((type) => String)
  password: string;

  @Column()
  @Field((type) => String)
  firstName: string;

  @Column()
  @Field((type) => String)
  lastName: string;

  @Column()
  @Field((type) => String)
  studentId: string;

  @Column({ default: '123' })
  @Field((type) => String)
  avatar: String;

  @Column({ default: 103 })
  @Field((type) => String)
  departmentId: String;

  @Column({ type: 'timestamp' })
  @Field((type) => String)
  createdAt: Date;
}
