import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryModel.create({
        ...createCategoryDto,
        name: createCategoryDto.name.toLocaleLowerCase(),
        createdAt: new Date(),
      });
      return category;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    return await this.categoryModel
      .find()
      .skip(offset)
      .limit(limit)
      .sort({
        name: 1,
      })
      .select('-__v');
  }

  async findOne(find: string) {
    // MongoID
    if (isValidObjectId(find)) {
      return await this.categoryModel.findById(find);
    }

    const category: Category = await this.categoryModel.findOne({
      name: find,
    });

    if (!category) {
      throw new NotFoundException(`Category ${find} not found`);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = this.categoryModel.findByIdAndUpdate(id, {
        $set: {
          ...updateCategoryDto,
          name: updateCategoryDto.name.toLocaleLowerCase(),
          updatedAt: new Date(),
        },
      });

      return {
        ...(await category).toJSON(),
        ...updateCategoryDto,
        name: updateCategoryDto.name.toLocaleLowerCase(),
      };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(id);

    if (!category) {
      throw new BadRequestException(`Category ${id} not found`);
    }
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Category already exists in db ${JSON.stringify(error.keyValue)}}`,
      );
    }

    throw new InternalServerErrorException('Error trying to create a category');
  }
}
