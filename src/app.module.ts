import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [UsersModule, ProductsModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
