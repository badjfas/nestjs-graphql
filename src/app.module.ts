import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { Sequelize } from 'sequelize-typescript';
import { join } from 'path';

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

    SequelizeModule.forRoot({
      dialect: 'postgres',
      port: +process.env.DB_PORT,
      host: process.env.HOST,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DB,
      synchronize: true,
      autoLoadModels: true,
      dialectOptions: { charset: 'utf8mb4', dateStrings: true, typeCast: true }, // 날짜의 경우 문자열로 타입 변경 처리
      models: [User],
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
    UserModule,
    // UserModule,
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
export class AppModule {
  constructor(private readonly sequelize: Sequelize) {}
}
