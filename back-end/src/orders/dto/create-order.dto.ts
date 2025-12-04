import { IsString, IsEmail, IsOptional, IsNotEmpty, IsNumber, Min, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

// Sous-DTO pour les items
export class OrderItemDto {
  @IsNumber({}, { message: 'L’ID du produit doit être un nombre' })
  productId: number;

  @IsString({ message: 'Le nom du produit doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le nom du produit est obligatoire' })
  productName: string;

  @IsNumber({}, { message: 'La quantité doit être un nombre' })
  @Min(1, { message: 'La quantité doit être au moins 1' })
  quantity: number;

  @IsNumber({}, { message: 'Le prix unitaire doit être un nombre' })
  @Min(0, { message: 'Le prix unitaire doit être positif' })
  unitPrice: number;
}

// DTO principal
export class CreateOrderDto {
  @IsString({ message: 'Le nom du client doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le nom du client est obligatoire' })
  customerName: string;
  
  userId?: number;

  @IsEmail({}, { message: 'Email invalide' })
  customerEmail: string;

  @IsString({ message: 'Le téléphone doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le téléphone est obligatoire' })
  customerPhone: string;

  @IsString({ message: 'L’adresse de livraison doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'L’adresse de livraison est obligatoire' })
  shippingAddress: string;

  @IsOptional()
  @IsNumber({}, { message: 'Le sous-total doit être un nombre' })
  subTotal?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Le prix de livraison doit être un nombre' })
  shippingPrice?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Le total doit être un nombre' })
  total?: number;

  @IsOptional()
  payment?: { method: string }; // Tu peux mettre des validations plus précises si nécessaire

  @ArrayNotEmpty({ message: 'La commande doit contenir au moins un produit' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsOptional()
  @IsString({ message: 'Le statut de paiement doit être une chaîne de caractères' })
  paymentStatus?: string = 'pending';

  @IsOptional()
  @IsString({ message: 'Le statut de la commande doit être une chaîne de caractères' })
  status?: string = 'pending';
}
