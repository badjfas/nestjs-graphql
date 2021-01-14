import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entitiy';
import { User } from './entities/user.entity';
import { Verifications } from './entities/verification.entitiy';
import { TestResolver } from './test.resolver';
import { TestsService } from './test.service';
import { UsersResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([Test])],
  providers: [TestsService, TestResolver],
  exports: [TestsService],
})
export class TestModule {}
