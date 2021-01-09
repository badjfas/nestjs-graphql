import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
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
  @Column()
  password: string;

  @Field(() => UserRole)
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    console.log('hash');
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
}
