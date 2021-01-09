import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserDto extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateUserOutput {
  @Field(() => String, { nullable: true })
  error?: string;
  @Field(() => Boolean, { nullable: true })
  ok?: boolean;
}
