import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/restaurant.dto';
import { Restaurant } from './entities/restaurent.entity';

@Resolver(() => Restaurant) //not mandantory
export class RestaurantsResolver {
  @Query(() => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    return [];
  }

  @Mutation(() => Boolean)
  createRestaurant(@Args() createRestaurantDto: CreateRestaurantDto): boolean {
    return true;
  }
}
