import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.productModel.create({
        ...createProductDto,
        name: createProductDto.name.toLocaleLowerCase(),
        description: createProductDto.description.toLocaleLowerCase(),
        createdAt: new Date(),
      });
      return product;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    return await this.productModel.find();
  }

  async findOne(find: string) {
    // MongoID
    if (isValidObjectId(find)) {
      return await this.productModel.findById(find);
    }

    const product: Product = await this.productModel.findOne({
      name: find,
    });

    if (!product) {
      throw new NotFoundException(`Product ${find} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const category = this.productModel.findByIdAndUpdate(id, {
        $set: {
          ...updateProductDto,
          name: updateProductDto.name.toLocaleLowerCase(),
          updatedAt: new Date(),
        },
      });

      return {
        ...(await category).toJSON(),
        ...updateProductDto,
        name: updateProductDto.name.toLocaleLowerCase(),
      };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    await this.productModel.findByIdAndDelete(id);
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Product already exists in db ${JSON.stringify(error.keyValue)}}`,
      );
    }

    throw new InternalServerErrorException('Error trying to create a product');
  }
}
