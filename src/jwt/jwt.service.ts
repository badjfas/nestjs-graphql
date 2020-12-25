import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtOptions } from './jwt.interface';

@Injectable()
export class JwtService {
  constructor(@Inject('key') private readonly options: JwtOptions) {}

  verify(token: string) {
    try {
      const isValid = jwt.verify(token, this.options.key);
      return isValid;
    } catch {
      throw Error('Not Valid Token');
    }
  }
}
