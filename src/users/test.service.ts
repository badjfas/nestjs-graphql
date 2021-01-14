import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Test } from './entities/test.entitiy';

@Injectable()
export class TestsService {
  constructor(
    @InjectModel(Test)
    private TestModel: typeof Test,
  ) {}
}
