import { Body, Controller, Get, Post } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as crypto from 'crypto';
import { Role } from './role.decorator';

import { Users } from './entity/user.entity';
import { UserService } from './user.service';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { AuthUser } from 'src/auth/auth.decorator';
import { userDto } from './dto/user.dto';
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

  @Mutation((returns) => LoginOutput)
  login(@Args('loginInput') loginInput: LoginInput): Promise<LoginOutput> {
    const hashPassword = crypto
      .createHash('sha512')
      .update(loginInput.password)
      .digest('base64');

    return this.userService.login({
      studentId: loginInput.studentId,
      password: hashPassword,
    });
  }
}
