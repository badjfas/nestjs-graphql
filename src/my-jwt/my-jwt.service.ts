import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CONFIG_OPTION, MyJwtOptions } from './my-jwt.module';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
interface IJwt {
  id?: number;
  password?: string;
}
@Injectable()
export class MyJwtService {
  constructor(
    @Inject('CONFIG_OPTION') private readonly options: MyJwtOptions,
  ) {}

  sign(id: IJwt) {
    const token = jwt.sign(id, this.options.secretkey);
    return token;
  }

  verify(token: string) {
    const verifyToken = jwt.verify(token, this.options.secretkey);
    if (verifyToken) return verifyToken;
    return false;
  }
  createHash({ password }: IJwt): string {
    try {
      const hashPassword = crypto
        .createHash('sha512')
        .update(password)
        .digest('base64');

      return hashPassword;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
