import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateUserInput,
  CreateUserOutput,
  LoggedInUserInput,
  LoggedInUserOutput,
  UserProfileInput,
  UserProfileOutput,
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

  @UseGuards(AuthGuard)
  @Query(() => User)
  me(@AuthUser() authUser: User) {
    try {
      return authUser;
    } catch (e) {
      return e;
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => UserProfileOutput)
  async userProfile(
    @AuthUser() @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    try {
      const user = await this.userService.findById(userProfileInput.id);
      return {
        ok: true,
        user: user,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Error',
      };
    }
  }
}
