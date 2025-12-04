import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer'; 

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @Type(() => Number)       
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  imageUrl: string;
    
  @IsOptional()
  @Type(() => Number)      
  @IsNumber()
  stock?: number;
}

export class UpdateProductDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Number)      
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @Type(() => Number)      
  @IsNumber()
  stock?: number;

}
