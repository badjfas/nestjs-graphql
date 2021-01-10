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
import { JwtService } from 'src/jwt/jwt.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
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
        const token = this.jwtService.sign(user);
        return {
          ok: true,
          token: token,
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

  async findById(id: string): Promise<User> {
    return this.usersRepository.findOne(
      { id },
      { select: ['id', 'email', 'role', 'createdAt'] },
    );
  }
}
