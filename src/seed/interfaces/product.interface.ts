// products interfaces for insert

export interface ProductToInsert {
  name: string;
  description: string;
  category_id: string;
  price: number;
  stock: number;
  createdAt: Date;
}
