import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common.dto';
import { Products } from '../entity/product.entity';

@InputType()
export class ProductInput extends PickType(Products, [
  'productName',
  'area',
  'price',
  'category',
  'content',
  'fileString',
]) {}

@InputType()
export class SearchInput extends PickType(Products, ['area', 'category']) {}

@ObjectType()
export class ProductOutput extends CoreOutput {
  @Field((type) => [Products], { nullable: true })
  products?: Products[];
}

@ObjectType()
export class CreateProductOutput extends CoreOutput {
  @Field((type) => Products, { nullable: true })
  product: Products;
}
