import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Test } from './entities/test.entitiy';
import { TestsService } from './test.service';

@Resolver(() => Test)
export class TestResolver {
  constructor(private readonly testService: TestsService) {}

  @Query(() => [Test])
  async getUsers() {}
}
