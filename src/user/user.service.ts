import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/user.entity';
import { Repository } from 'typeorm';
import { userDto } from './dto/user.dto';
import * as jwt from 'jsonwebtoken';
import { LoginInput, LoginOutput } from './dto/login.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}
  findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  me(id: number): Promise<Users> {
    return this.userRepository.findOne(id);
  }

  async login({ studentId, password }: LoginInput): Promise<LoginOutput> {
    try {
      let token: string;
      await this.userRepository
        .findOne({
          studentId: studentId,
        })
        .then((result) => {
          if (result.password === password) {
            token = jwt.sign({ id: result.id }, '12345');
          }
        });
      return {
        token: token,
      };
    } catch (e) {
      console.log(e);
    }
  }

  create(userData: userDto): Promise<Users> {
    try {
      return this.userRepository.save({
        ...userData,
      });
    } catch {
      throw Error('Error');
    }
  }
}
