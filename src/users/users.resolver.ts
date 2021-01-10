import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateUserInput,
  CreateUserOutput,
  LoggedInUserInput,
  LoggedInUserOutput,
} from './dtos/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    try {
      return await this.userService.getUsers();
    } catch (e) {
      throw Error('Error');
    }
  }
  @Mutation(() => CreateUserOutput)
  async createUser(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    const result = await this.userService.createUser(createUserInput);
    if (result.error) {
      return {
        ...result,
      };
    } else {
      return {
        ...result,
      };
    }
  }

  @Mutation(() => LoggedInUserOutput)
  async handleLogin(
    @Args('input') loggedInUserInput: LoggedInUserInput,
  ): Promise<LoggedInUserOutput> {
    const { ok, token, error } = await this.userService.handleLogin(
      loggedInUserInput,
    );
    return {
      ok,
      token,
      error,
    };
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User) {
    try {
      return authUser;
    } catch (e) {
      return e;
    }
  }
}
