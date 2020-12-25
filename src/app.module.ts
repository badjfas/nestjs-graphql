import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user/entity/user.entity';
import { UsersModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '1.231.176.58',
      port: 3306,
      username: 'bjwkor',
      password: 'bjwkor',
      database: 'capstone',
      entities: [Users],
      synchronize: true,
      // autoLoadEntities: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      installSubscriptionHandlers: true,
      sortSchema: true,
      context: ({ req }) => {
        return {
          req,
        };
      },
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
