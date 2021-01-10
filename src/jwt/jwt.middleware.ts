import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { UserService } from 'src/users/users.service';
import { JwtService } from './jwt.service';

@Injectable() // Dependency Injection을 하려면 Injectable 하게 만들어줘야함
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  // implemnents는 클래스가 interface처럼 사용되게 만듬
  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];

      const verify = this.jwtService.verified(token.toString());

      if (typeof verify === 'object' && verify.hasOwnProperty('id')) {
        try {
          const user = await this.userService.findById(verify['id']);
          req['user'] = user;
        } catch (e) {
          console.log(e);
          return e;
        }
      }
    }
    next(); //next() 가 request user를 받음
  }
}
