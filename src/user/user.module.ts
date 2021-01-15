import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
