import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class AddressDto {
  @IsString({ message: 'Ligne d’adresse 1 doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'La ligne d’adresse 1 est obligatoire' }) // ⚠ Si vide, validation échouera
  addressLine1: string;

  @IsOptional()
  @IsString({ message: 'Ligne d’adresse 2 doit être une chaîne de caractères' })
  addressLine2?: string; // ⚠ Champ optionnel, peut être undefined

  @IsString({ message: 'La ville doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'La ville est obligatoire' }) // ⚠ Si vide, validation échouera
  city: string;

  @IsOptional()
  @IsString({ message: 'La région doit être une chaîne de caractères' })
  region?: string; // ⚠ Champ optionnel

  @IsString({ message: 'Le code postal doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le code postal est obligatoire' }) // ⚠ Si vide, validation échouera
  postalCode: string;

  @IsString({ message: 'Le pays doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le pays est obligatoire' }) // ⚠ Si vide, validation échouera
  country: string;
}
