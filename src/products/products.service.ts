import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ProductInput,
  ProductOutput,
  SearchInput,
  CreateProductOutput,
} from './dto/Product.dto';
import { Products } from './entity/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) {}

  async RegisterProduct({
    productName,
    price,
    area,
    content,
    category,
    fileString,
  }: ProductInput): Promise<CreateProductOutput> {
    console.log(productName, price, area, content, category, fileString);

    try {
      const data = await this.productRepository.save({
        productName,
        price,
        area,
        content,
        category,
        fileString,
      });
      console.log(productName, price, area, content, category, fileString);
      return {
        ok: true,
        product: data,
      };
    } catch {
      return {
        ok: false,
        error: '잘못된 접근 입니다.',
        product: null,
      };
    }
  }

  async seeAllProduct({ area, category }: SearchInput): Promise<ProductOutput> {
    try {
      if (area || category) {
        const data = await this.productRepository.find({
          where: [{ area: area }, { category: category }],
        });
        if (data.length > 0) {
          return {
            ok: true,
            products: data,
          };
        } else {
          return {
            ok: false,
            error: '검색된 결과가 없습니다.',
          };
        }
      } else {
        const data = await this.productRepository.find();
        if (data.length > 0) {
          return {
            ok: true,
            products: data,
          };
        } else {
          return {
            ok: false,
            error: '검색된 결과가 없습니다.',
          };
        }
      }
    } catch {
      return {
        ok: false,
        error: '잘못된 접근 입니다.',
      };
    }
  }
}
