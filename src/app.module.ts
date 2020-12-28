import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user/entity/user.entity';
import { UsersModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from './jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { Products } from './products/entity/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '1.231.176.58',
      port: 3306,
      username: 'bjwkor',
      password: 'bjwkor',
      database: 'market',
      entities: [Users, Products],
      // synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      installSubscriptionHandlers: true,
      sortSchema: true,
      context: ({ req, connection }) => {
        const TOKEN_KEY = 'x-jwt';
        // console.log(req.headers[TOKEN_KEY]);
        return {
          token: req ? req.headers[TOKEN_KEY] : 'not token',
        };
      },
    }),
    UsersModule,
    AuthModule,

    JwtModule.forRoot({ key: process.env.JWT_SECRET }),

    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
