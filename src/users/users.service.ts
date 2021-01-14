import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserInput,
  CreateUserOutput,
  LoggedInUserInput,
  LoggedInUserOutput,
  ProfileEditInput,
  ProfileEditOutput,
} from './dtos/user.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { Verifications } from './entities/verification.entitiy';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Verifications)
    private readonly verification: Repository<Verifications>,
    private readonly jwtService: JwtService,
  ) {}

  getUsers() {
    return this.usersRepository.find();
  }

  async createUser(createUserInput: CreateUserInput) {
    try {
      //email Check
      const emailCheck = await this.usersRepository.findOne({
        email: createUserInput.email,
      });
      if (!emailCheck) {
        const user = await this.usersRepository.save(
          this.usersRepository.create({ ...createUserInput }),
        );
        await this.verification.save(
          this.verification.create({
            user,
          }),
        );
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

  async editProfile(
    id: string,
    profileEditInput: ProfileEditInput,
  ): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ id: id });
      if (profileEditInput.email) {
        user.email = profileEditInput.email;
        user.verified = false;
        await this.verification.save(this.verification.create({ user }));
      }
      if (profileEditInput.password) {
        user.password = profileEditInput.password;
      }
      return await this.usersRepository.save(user);
    } catch {
      throw Error();
    }
  }

  async verifyEmail(code: string): Promise<boolean> {
    const verify = await this.verification.findOne(
      { code },
      { relations: ['user'] },
    );
    console.log(verify, verify.user, 2131312313);
    if (verify) {
      verify.user.verified = true;
      this.usersRepository.save(verify.user);
    }
    return false;
  }
}
