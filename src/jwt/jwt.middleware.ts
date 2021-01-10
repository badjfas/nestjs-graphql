import { NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

export const jwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.headers);
  next();
};
