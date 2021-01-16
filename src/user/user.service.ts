import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entity/user.entity';
import { Repository, Sequelize } from 'sequelize-typescript';
import { Model } from 'sequelize/types';
import { CreateAccountInput, loginInput } from './dto/user.dto';
import { Verification } from './entity/verification.entitiy';

@Injectable()
export class UserService {
  constructor(
    private seqeulize: Sequelize,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Verification)
    private verfication: typeof Verification,
  ) {}
  async findAll(): Promise<User[]> {
    const verification = await this.verfication.findAll({
      include: [{ model: User }],
      raw: true,
    });
    console.log(verification);
    return await this.userModel.findAll({});
  }

  async findByEmail({ email }: loginInput): Promise<User> {
    return await this.userModel.findOne({ where: { email: email }, raw: true });
  }

  async findById(id: number): Promise<User> {
    return await this.userModel.findOne({ where: { id }, raw: true });
  }

  async createAccount({
    email,
    password,
    userName,
  }: CreateAccountInput): Promise<User> {
    return await this.userModel.create({ email, password, userName });
  }
}
