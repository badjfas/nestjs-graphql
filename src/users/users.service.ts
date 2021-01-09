import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserInput,
  CreateUserOutput,
  LoggedInUserInput,
  LoggedInUserOutput,
} from './dtos/user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.usersRepository.find();
  }

  async createUser(
    createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    try {
      //email Check
      const emailCheck = await this.usersRepository.findOne({
        email: createUserInput.email,
      });
      if (!emailCheck) {
        const result = await this.usersRepository.save(
          this.usersRepository.create({ ...createUserInput }),
        );
        return {
          ok: true,
          ...result,
        };
      } else {
        return {
          ok: false,
          error: 'Email Already Existing',
        };
      }
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }
  async handleLogin({
    email,
    password,
  }: LoggedInUserInput): Promise<LoggedInUserOutput> {
    const user = await this.usersRepository.findOne(
      { email: email },
      { select: ['id', 'password'] },
    );
    if (!user) {
      return {
        ok: false,
        error: 'Fail',
      };
    }
    try {
      const isValidPwd = await user.checkPassword(password);
      if (isValidPwd) {
        return {
          ok: true,
          token: 'access token',
        };
      } else {
        return {
          ok: false,
          error: 'Fail',
        };
      }
    } catch (e) {
      return {
        ok: false,
        error: 'Fail',
      };
    }
  }
}
