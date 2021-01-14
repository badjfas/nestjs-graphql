import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import {
  AfterInsert,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
} from 'typeorm';
import * as crypto from 'crypto';
import { InternalServerErrorException } from '@nestjs/common';
// type UserRole = 'client' | 'owner' | 'delivery';

enum UserRole {
  'Client',
  'Owner',
  'Delivery',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field(() => String)
  email: string;

  @Field(() => String)
  @Column({ select: false })
  password: string;

  @Field(() => UserRole)
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Field(() => Boolean)
  @Column({ default: false })
  verified: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async beforeHashPassword(): Promise<void> {
    console.log('before hash');
    try {
      this.password = await crypto
        .createHash('sha512')
        .update(this.password)
        .digest('base64');
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(pwd: string): Promise<boolean> {
    const hashPassword = await crypto
      .createHash('sha512')
      .update(pwd)
      .digest('base64');

    try {
      if (this.password === hashPassword) return await true;
    } catch {
      return await false;
    }
  }
}
