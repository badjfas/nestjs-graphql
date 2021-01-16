import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entity/user.entity';
import { Sequelize } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateAccountInput,
  loginInput,
  VerfiyEmailInput,
} from './dto/user.dto';
import { Verification } from './entity/verification.entitiy';
import { CoreOutput } from 'src/common/dto/output.dto';

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
    return await this.userModel.findAll({});
  }

  async findByEmail({ email }: loginInput): Promise<User> {
    return await this.userModel.findOne({ where: { email: email }, raw: true });
  }

  async findById(id: number): Promise<User> {
    return await this.userModel.findOne({ where: { id }, raw: true });
  }

  async createAccount({ email, password, userName }: CreateAccountInput) {
    const existEmail = await this.userModel.findOne({
      where: { email: email },
      attributes: {
        exclude: ['id', 'email', 'userName', 'password', 'updatedAt'],
      },
      raw: true,
    });

    if (existEmail) throw Error();

    return await this.userModel
      .create({ email, password, userName })
      .then((user) => {
        this.verfication.create({ code: uuidv4(), userId: user.id });
        return user;
      });
  }

  async verfyEmail({ email, code }: VerfiyEmailInput): Promise<CoreOutput> {
    const user = await this.userModel.findOne({
      where: { email: email },
      raw: true,
    });

    const verifyCode = await this.verfication.findOne({
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'password',
              'id',
              'email',
              'userName',
            ],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id'],
        include: ['user.isValid'],
      },
      where: {
        userId: user.id,
      },
      raw: true,
    });

    if (code === verifyCode.code) {
      await this.verfication.destroy({ where: { userId: user.id } });
      await this.userModel.update(
        { isValid: true },
        { where: { id: user.id } },
      );
      return {
        ok: true,
      };
    }

    return {
      ok: false,
      error: '인증 코드를 다시 입력해주세요.',
    };
  }
}
