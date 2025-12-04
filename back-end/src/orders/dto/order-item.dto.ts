import { IsInt, Min, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class OrderItemDto {
  @IsInt({ message: 'L’ID du produit doit être un entier' })
  productId: number;

  @IsString({ message: 'Le nom du produit doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le nom du produit est obligatoire' })
  productName: string;

  @IsInt({ message: 'La quantité doit être un entier' })
  @Min(1, { message: 'La quantité doit être au moins 1' })
  quantity: number;

  @IsNumber({}, { message: 'Le prix unitaire doit être un nombre' })
  @Min(0, { message: 'Le prix unitaire doit être positif' })
  unitPrice: number;
}
