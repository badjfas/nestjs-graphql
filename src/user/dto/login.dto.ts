import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common.dto';
import { Users } from '../entity/user.entity';

@InputType()
export class LoginInput extends PickType(Users, ['studentId', 'password']) {}

@ObjectType()
export class LoginOutput extends CoreOutput {
  @Field((type) => String, { nullable: true })
  token?: string;
}
