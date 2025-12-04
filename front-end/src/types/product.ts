export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;

  // Ajoute ici TOUS les champs nécessaires
  imageUrl?: string;
  image: string; 
  category?: "Médicament" | "Nutrition" | "Accessoire" | "Service";
  popularity?: number; 
  relevance?: number; 
  type?: "Injectable" | "Bio" | "Sport" | "Premium";
 


}