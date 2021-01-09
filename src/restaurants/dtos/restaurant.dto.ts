import {
  ArgsType,
  Field,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurent.entity';

@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, ['id']) {}

@InputType()
export class UpdateRestaurantInputType extends PartialType(
  CreateRestaurantDto,
) {}

@ArgsType()
export class UpdateRestaurantDto {
  @Field(() => String)
  id: string;
  @Field(() => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}

// @ArgsType()
// export class CreateRestaurantDto {
//   @Field(() => String)
//   name: string;
//   @Field(() => Boolean)
//   isVegan: boolean;
//   @Field(() => String)
//   address: string;
//   @Field(() => String)
//   ownerName: string;
//   @Field(() => String)
//   categoryName: string;
// }
