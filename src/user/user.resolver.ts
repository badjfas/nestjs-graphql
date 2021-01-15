import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateAccountInput,
  CreateAccountOutput,
  loginInput,
  loginOutput,
} from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Mutation(() => loginOutput)
  async login(@Args('input') loginInput: loginInput): Promise<loginOutput> {
    const isExistEmail = await this.userService.findByEmail({
      email: loginInput.email,
    });

    console.log(isExistEmail);
    try {
      return {
        token: '12345',
        ok: true,
      };
    } catch (e) {
      return {
        token: null,
        ok: false,
        error: e,
      };
    }
  }

  @Mutation(() => CreateAccountOutput)
  async createdAccount(
    @Args('input') createdAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const isSuccess = await this.userService.createAccount({
        ...createdAccountInput,
      });
      console.log(isSuccess);
      return null;
    } catch (e) {}
  }
}
