import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/user.entity';
import { Repository } from 'typeorm';
import { userDto } from './dto/user.dto';
import * as jwt from 'jsonwebtoken';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { JoinInput, JoinOutput } from './dto/join.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}
  findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async join(joinInput: JoinInput): Promise<JoinOutput> {
    try {
      await this.userRepository.save({ ...joinInput });
      return {
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '잘못된 접근 입니다.',
      };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      let token: string;
      await this.userRepository
        .findOne({
          email: email,
        })
        .then((result) => {
          if (result.password === password) {
            token = jwt.sign({ id: result.id }, process.env.JWT_SECRET);
          }
        })
        .catch((err) => console.log(err));
      return {
        token: token,
        ok: token ? true : false,
        error: !token && 'Authorization Error',
      };
    } catch (e) {
      throw Error('Error');
    }
  }

  async findById(id: number): Promise<Users> {
    return await this.userRepository.findOne({ id: id });
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
