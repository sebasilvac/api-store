import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemeMongoose } from 'mongoose';
import { Category } from '../../categories/entities/category.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Prop({
    type: SchemeMongoose.Types.ObjectId,
    ref: 'Category',
    required: true,
    index: true,
  })
  category_id: Category;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  stock: number;

  @Prop()
  image?: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt?: Date;

  @Prop()
  deletedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
