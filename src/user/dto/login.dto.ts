import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Users } from '../entity/user.entity';

@InputType()
export class LoginInput extends PickType(Users, ['studentId', 'password']) {}
// @InputType()
// export class LoginInput {
//   @Field((type) => String, { nullable: true })
//   studentId: string;
//   @Field((type) => String, { nullable: true })
//   password: string;
// }

@ObjectType()
export class LoginOutput {
  @Field((type) => String, { nullable: true })
  token?: string;
}
