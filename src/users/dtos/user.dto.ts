import {
  ArgsType,
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserDto extends PartialType(User) {}

@InputType()
export class CreateUserInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateUserOutput extends PartialType(UserDto) {
  @Field(() => String, { nullable: true })
  error?: string;
  @Field(() => Boolean, { nullable: true })
  ok?: boolean;
}

@InputType()
export class LoggedInUserInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoggedInUserOutput {
  @Field(() => String, { nullable: true })
  error?: string;
  @Field(() => Boolean, { nullable: true })
  ok?: boolean;
  @Field(() => String, { nullable: true })
  token?: string;
}

@ArgsType()
export class UserProfileInput {
  @Field(() => String)
  id: string;
}

@ObjectType()
export class UserProfileOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
export class ProfileEditInput extends PartialType(User) {}

@ObjectType()
export class ProfileEditOutput extends CoreOutput {}
