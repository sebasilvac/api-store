import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly category_id: string;

  @IsNotEmpty()
  readonly price: number;

  @IsOptional()
  readonly stock?: number;

  @IsString()
  @IsOptional()
  readonly image: string;
}
