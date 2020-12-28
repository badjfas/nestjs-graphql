import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth.decorator';
import { CoreOutput } from 'src/common.dto';
import {
  ProductInput,
  ProductOutput,
  SearchInput,
  CreateProductOutput,
} from './dto/Product.dto';
import { Products } from './entity/product.entity';
import { ProductsService } from './products.service';

@Resolver((of) => Products)
export class ProductResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation((returns) => CreateProductOutput)
  RegisterProduct(
    @AuthUser() authUser,
    @Args('input') productInput: ProductInput,
  ): Promise<CreateProductOutput> {
    if (authUser) {
      return this.productsService.RegisterProduct({ ...productInput });
    }
  }

  @Query((returns) => ProductOutput, { nullable: true })
  seeAllProduct(
    @Args('input', { nullable: true }) searchInput: SearchInput,
  ): Promise<ProductOutput> {
    return this.productsService.seeAllProduct(searchInput);
  }
}
