import { InternalServerErrorException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MyJwtService } from 'src/my-jwt/my-jwt.service';
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
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: MyJwtService,
  ) {}
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Mutation(() => loginOutput)
  async login(@Args('input') loginInput: loginInput): Promise<loginOutput> {
    try {
      const user = await this.userService.findByEmail({
        email: loginInput.email,
      });
      const hashPassword = this.jwtService.createHash({
        password: loginInput.password,
      });

      if (user.password !== hashPassword) {
        return {
          token: null,
          ok: false,
          error: '이메일이나 비밀번호를 확인해주세요',
        };
      }

      if (user) {
        const token = this.jwtService.sign({ id: user.id });
        return {
          token: token,
          ok: true,
        };
      }
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
