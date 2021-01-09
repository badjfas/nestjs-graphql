import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto, CreateUserOutput } from './dtos/user.dto';
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
    @Args('input') createUserDto: CreateUserDto,
  ): Promise<CreateUserOutput> {
    return await this.userService.createUser(createUserDto);
  }
}
