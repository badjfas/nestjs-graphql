import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtOptions } from './jwt.interface';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: 'key',
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService],
    };
  }
}
