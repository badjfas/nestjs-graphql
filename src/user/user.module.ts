import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { Verification } from './entity/verification.entitiy';

@Module({
  imports: [SequelizeModule.forFeature([User, Verification])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
