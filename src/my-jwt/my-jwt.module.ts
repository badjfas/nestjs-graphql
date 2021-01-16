import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtModuleOptions } from 'src/jwt/jwt.interfaces';
import { MyJwtService } from './my-jwt.service';

export interface MyJwtOptions {
  secretkey: string;
}

export const CONFIG_OPTION = 'CONFIG_OPTION';

@Global()
@Module({})
export class MyJwtModule {
  static forRoot(options: MyJwtOptions): DynamicModule {
    return {
      module: MyJwtModule,
      exports: [MyJwtService],
      providers: [
        {
          provide: CONFIG_OPTION,
          useValue: options,
        },
        MyJwtService,
      ],
    };
  }
}
