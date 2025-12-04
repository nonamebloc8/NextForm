import { IsOptional, IsString, IsNotEmpty, Matches } from 'class-validator';

export class PaymentDto {
  @IsOptional()
  @IsString({ message: 'Le numéro de carte doit être une chaîne de caractères' })
  @Matches(/^\d{16}$/, { message: 'Le numéro de carte doit comporter 16 chiffres' })
  cardNumber?: string; // NE PAS stocker en clair en production

  @IsOptional()
  @IsString({ message: 'La date d’expiration doit être une chaîne de caractères' })
  @Matches(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'La date doit être au format MM/YY' })
  expiry?: string;

  @IsOptional()
  @IsString({ message: 'Le CVV doit être une chaîne de caractères' })
  @Matches(/^\d{3,4}$/, { message: 'Le CVV doit comporter 3 ou 4 chiffres' })
  cvv?: string; // éviter stockage réel

  @IsOptional()
  @IsString({ message: 'La méthode de paiement doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'La méthode de paiement ne peut pas être vide' })
  method?: string; // 'card', 'paypal', 'RIB', etc.
}
