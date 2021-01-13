import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Verifications } from './entities/verification.entitiy';
import { UsersResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verifications])],
  providers: [UserService, UsersResolver],
  exports: [UserService],
})
export class UsersModule {}
