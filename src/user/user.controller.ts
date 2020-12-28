import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as crypto from 'crypto';

import { Users } from './entity/user.entity';
import { UserService } from './user.service';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { AuthUser } from 'src/auth/auth.decorator';
import { JoinInput, JoinOutput } from './dto/join.dto';
@Resolver((of) => Users)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [Users])
  findAll(@AuthUser() authUser): Promise<Users[]> {
    if (authUser) {
      return this.userService.findAll();
    }
  }

  @Query((returns) => Users)
  me(@AuthUser() authUser: Users) {
    return { ...authUser };
  }

  @Mutation((returns) => JoinOutput)
  join(@Args('input') joinInput: JoinInput): Promise<JoinOutput> {
    console.log(joinInput);
    const hashPassword = crypto
      .createHash('sha512')
      .update(joinInput.password)
      .digest('base64');
    return this.userService.join({ ...joinInput, password: hashPassword });
  }

  @Mutation((returns) => LoginOutput)
  login(@Args('loginInput') loginInput: LoginInput): Promise<LoginOutput> {
    const hashPassword = crypto
      .createHash('sha512')
      .update(loginInput.password)
      .digest('base64');

    return this.userService.login({
      email: loginInput.email,
      password: hashPassword,
    });
  }
}
