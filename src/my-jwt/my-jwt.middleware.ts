import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { UserService } from 'src/user/user.service';
import { MyJwtService } from './my-jwt.service';

@Injectable()
export class MyJwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: MyJwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      try {
        const token = req.headers['x-jwt'];
        const verify = this.jwtService.verify(token.toString());
        if (typeof verify === 'object' && verify.hasOwnProperty('id')) {
          const user = await this.userService.findById(verify['id']);
          req['user'] = user;
        }
      } catch {}
    }
    next();
  }
}
