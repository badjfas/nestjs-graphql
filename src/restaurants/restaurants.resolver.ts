import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/restaurant.dto';
import { Restaurant } from './entities/restaurent.entity';
import { RestaurantService } from './restaurants.service';

@Resolver(() => Restaurant) //not mandantory
export class RestaurantsResolver {
  constructor(private readonly restuarantService: RestaurantService) {}
  @Query(() => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restuarantService.getAll();
  }

  @Mutation(() => Boolean)
  createRestaurant(@Args() createRestaurantDto: CreateRestaurantDto): boolean {
    return true;
  }
}
