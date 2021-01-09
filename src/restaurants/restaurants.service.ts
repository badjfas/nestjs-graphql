import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateRestaurantDto,
  UpdateRestaurantDto,
} from './dtos/restaurant.dto';
import { Restaurant } from './entities/restaurent.entity';

@Injectable() //실제로 DB에 접근하는 곳
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}
  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }

  createRestaurant(createRestaurant: CreateRestaurantDto) {
    const newRestaurant = this.restaurants.create(createRestaurant);

    return this.restaurants.save(newRestaurant);
  }

  updateRestaurant({ id, data }: UpdateRestaurantDto) {
    return this.restaurants.update(id, { ...data });
  }
}
