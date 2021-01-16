import { InternalServerErrorException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { MyJwtService } from 'src/my-jwt/my-jwt.service';
import {
  CreateAccountInput,
  CreateAccountOutput,
  loginInput,
  loginOutput,
  VerfiyEmailInput,
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

      if (user.isValid === false) {
        return {
          ok: false,
          error: '이메일 인증을 해주세요.',
          token: null,
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
      const user = await this.userService.createAccount({
        ...createdAccountInput,
      });
      return {
        ok: true,
        user: user,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
        user: null,
      };
    }
  }

  @Mutation(() => CoreOutput)
  async verfyEmailMutation(
    @Args('input') verifyEmail: VerfiyEmailInput,
  ): Promise<CoreOutput> {
    const isValid = await this.userService.verfyEmail({
      email: verifyEmail.email,
      code: verifyEmail.code,
    });

    if (isValid.error) return { ...isValid };

    return {
      ...isValid,
    };
  }
}
