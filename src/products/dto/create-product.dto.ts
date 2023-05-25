import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly category_id: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  readonly price: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(0)
  readonly stock?: number;

  @IsString()
  @IsOptional()
  readonly image: string;
}
