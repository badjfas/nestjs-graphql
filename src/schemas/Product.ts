import { Products } from '../products/entity/product.entity';
import { EntitySchema } from 'typeorm';

export const ProductSchema = new EntitySchema<Products>({
  name: 'Product',
  target: Products,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    productName: {
      type: String,
      nullable: true,
    },

    category: {
      type: String,
      nullable: true,
    },

    area: {
      type: String,
      nullable: true,
    },

    content: {
      type: String,
      nullable: true,
    },

    price: {
      type: String,
      nullable: true,
    },

    state: {
      type: String,
      nullable: true,
    },
    fileString: {
      type: String,
      nullable: true,
    },
    viewCounts: {
      type: String,
      nullable: true,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  //   relations: {
  //     photos: {
  //       type: 'one-to-many',
  //       target: 'Photo', // the name of the PhotoSchema
  //     },
  //   },
});
