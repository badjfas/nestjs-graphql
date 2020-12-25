import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtService } from './jwt.service';

// @Injectable()
// export class JwtMiddleware implements NestMiddleware {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly userService: UserService,
//   ) {}

//   async use(req: Request, res: Response, next: NextFunction) {
//     if ('x-jwt' in req.headers) {
//       const token: string = req.headers['x-jwt'];
//       try {
//         const decodeToken = this.jwtService.verify(token.toString());
//         console.log(decodeToken);
//       } catch {}
//     }
//     next();
//   }
// }
