import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { CATEGORIES_SEED } from './data/categories.seed';
import { PRODUCTS_SEED } from './data/products.seed';
import { CategoryToInsert } from './interfaces/category.interface';
import { ProductToInsert } from './interfaces/product.interface';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,

    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,

    private readonly http: AxiosAdapter,
  ) {}

  async populateDB() {
    this.categoryModel.deleteMany({});
    this.productModel.deleteMany({});

    const categoryToInsert: CategoryToInsert[] = [];
    const productToInsert: ProductToInsert[] = [];

    CATEGORIES_SEED.forEach(async (category) => {
      categoryToInsert.push(category);
    });

    PRODUCTS_SEED.forEach(async (product) => {
      productToInsert.push(product);
    });

    await this.categoryModel.insertMany(categoryToInsert);
    await this.productModel.insertMany(productToInsert);

    return 'Seed Executed';
  }
}
