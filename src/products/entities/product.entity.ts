export class Product {
  id: string;
  name: string;
  category_id: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
