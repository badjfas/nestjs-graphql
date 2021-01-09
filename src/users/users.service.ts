import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, CreateUserOutput } from './dtos/user.dto';
import { User } from './entities/user.entity';
import crypto from 'crypto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.usersRepository.find();
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      //email Check
      const emailCheck = await this.usersRepository.findOne({
        email: createUserDto.email,
      });
      if (!emailCheck) {
        await this.usersRepository.save(
          this.usersRepository.create({ ...createUserDto }),
        );
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: 'retry',
        };
      }
    } catch (e) {}
  }
}
