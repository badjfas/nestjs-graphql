import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entity/product.entity';
import { ProductResolver } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  providers: [ProductResolver, ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
