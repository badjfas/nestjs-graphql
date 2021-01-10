import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context).getContext();
    const user = gqlCtx['user'];
    if (!user) {
      return false;
    }
    return true;
  }
}
