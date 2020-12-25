import { Body, Controller, Get, Post } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as crypto from 'crypto';
import { Role } from './role.decorator';

import { Users } from './entity/user.entity';
import { UserService } from './user.service';
import { LoginInput, LoginOutput } from './dto/login.dto';
@Resolver((of) => Users)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [Users])
  findAll(): Promise<Users[]> {
    return this.userService.findAll();
  }

  @Query((returns) => Users)
  me(): Promise<Users> {
    return this.userService.me(1);
  }
  //   @Post('users/create')
  //   create(@Body() userData): Promise<Users> {
  //     console.log(userData);
  //     return this.userService.create({ ...userData });
  //     // return this.create({stud})
  //   }

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
