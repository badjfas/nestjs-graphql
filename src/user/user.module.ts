import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.controller';
import { Users } from './entity/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UsersModule {}
