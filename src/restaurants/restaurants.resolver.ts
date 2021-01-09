import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateRestaurantDto,
  UpdateRestaurantDto,
  UpdateRestaurantInputType,
} from './dtos/restaurant.dto';
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
  async createRestaurant(
    @Args('input') createRestaurantDto: CreateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restuarantService.createRestaurant(createRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async updateRestaurant(
    @Args() updateRestaurant: UpdateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restuarantService.updateRestaurant(updateRestaurant);
      return true;
    } catch (e) {
      return false;
    }
  }
}
