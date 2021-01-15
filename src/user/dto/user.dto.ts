import {
  Field,
  ID,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from '../entity/user.entity';
@InputType({ isAbstract: true })
@ObjectType()
class UserDto {
  @Field(() => ID, { nullable: true })
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  userName?: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class loginOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  token: string;
}

@InputType()
export class loginInput {
  @Field()
  email: string;
  @Field()
  password?: string;
}

@InputType('input')
export class CreateAccountInput extends PickType(UserDto, [
  'email',
  'password',
  'userName',
]) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
