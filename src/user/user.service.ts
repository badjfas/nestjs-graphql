import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entity/user.entity';
import { Repository, Sequelize } from 'sequelize-typescript';
import { Model } from 'sequelize/types';
import {
  CreateAccountInput,
  CreateAccountOutput,
  loginInput,
} from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private seqeulize: Sequelize,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.userModel.findAll({});
  }

  async findByEmail({ email }: loginInput): Promise<User> {
    return await this.userModel.findOne({ where: { email: email }, raw: true });
  }

  async createAccount({
    email,
    password,
    userName,
  }: CreateAccountInput): Promise<User> {
    return await this.userModel.create({ email, password, userName });
  }
}
