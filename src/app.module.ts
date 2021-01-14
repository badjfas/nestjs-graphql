import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { Restaurant } from './restaurants/entities/restaurent.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { AuthModule } from './auth/auth.module';
import { Verifications } from './users/entities/verification.entitiy';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test } from './users/entities/test.entitiy';
import { TestModule } from './users/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.prod.env',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      //환경변수 validator
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod'),
        DB_PORT: Joi.string().required(),
        HOST: Joi.string().required(),
        USERNAME: Joi.string().required(),
        PASSWORD: Joi.string().required(),
        DB: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }), // dotenv
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   port: +process.env.DB_PORT,
    //   host: process.env.HOST,
    //   username: process.env.USERNAME,
    //   password: process.env.PASSWORD,
    //   database: process.env.DB,
    //   logging: true,
    //   synchronize: true,
    //   entities: [Restaurant, User, Verifications],
    // }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      port: +process.env.DB_PORT,
      host: process.env.HOST,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DB,
      synchronize: true,
      autoLoadModels: true,
      models: [Test],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req, res }) => {
        // resolver가 실행될때 매번 실행됌
        return {
          user: req['user'], //request에 user가 들어감
        };
      },
    }),
    TestModule,
    // RestaurantsModule,
    // UsersModule,
    // JwtModule.forRoot({
    //   privateKey: process.env.JWT_SECRET,
    // }),
    // AuthModule,
  ],
  controllers: [],
  providers: [],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(JwtMiddleware).forRoutes({
//       path: '/graphql',
//       method: RequestMethod.ALL,
//     });
//   }
// }
export class AppModule {}
