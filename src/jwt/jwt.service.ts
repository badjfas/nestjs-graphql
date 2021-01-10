import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtModuleOptions } from './jwt.interfaces';
import { CONFIG_OPTIONS } from './jwt.contants';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}
  sign(payload: { id: string }): string | undefined {
    const token = jwt.sign({ id: payload.id }, this.options.privateKey);
    return token;
  }

  verified(token: string) {
    try {
      const result = jwt.verify(token, this.options.privateKey);
      return result;
    } catch {
      return undefined;
    }
  }
}
