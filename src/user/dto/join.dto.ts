import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common.dto';
import { Users } from '../entity/user.entity';

@InputType()
export class JoinInput extends PickType(Users, [
  'email',
  'password',
  'address',
  'gender',
  'phone',
  'userName',
]) {}

@ObjectType()
export class JoinOutput extends CoreOutput {}
