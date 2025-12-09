'use client';

import React from "react";
import { useCart } from "../context/CartContext";
import { Product } from "@/types/product";
import { useQueryClient } from '@tanstack/react-query';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const queryClient = useQueryClient();

  if (!product) return null;

  const imageUrl = `https://pharmacie-soleil.onrender.com${product.imageUrl ?? ''}`;

  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const increase = () => addToCart(product, 1);
  const decrease = () => {
    if (quantity <= 1) {
      removeFromCart(product.id);
    } else {
      addToCart(product, -1);
    }
  };

  // ✅ Préfetch TS-safe avec React Query
    const prefetchProduct = () => {
      queryClient.prefetchQuery<Product, Error>({
        queryKey: ['product', product.id],
        queryFn: async (): Promise<Product> => {
          const res = await fetch(`https://pharmacie-soleil.onrender.com/products/${product.id}`);
          if (!res.ok) throw new Error('Failed to fetch product');
          const data: Product = await res.json();
          return data;
        },
        staleTime: 1000 * 60 * 5, 
      });
    };


  return (
    <div
      className="border rounded-lg p-4 shadow hover:shadow-lg transition"
      onMouseEnter={prefetchProduct} // Préfetch au hover
    >
      <img
        src={imageUrl}
        alt={product.name}
        loading="lazy" // Lazy loading image
        className="w-full h-48 object-cover rounded-md mb-3"
      />

      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <span className="font-semibold text-purple-600">{product.price} €</span>

      <div className="mt-4">
        {quantity === 0 ? (
          <button
            onClick={increase}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Ajouter au panier
          </button>
        ) : (
          <div className="flex items-center justify-between w-full border rounded-lg p-2">
            <button
              onClick={decrease}
              className="bg-gray-200 px-3 py-1 rounded-lg text-lg font-bold hover:bg-gray-300"
            >
              –
            </button>

            <span className="text-lg font-semibold">{quantity}</span>

            <button
              onClick={increase}
              className="bg-purple-600 text-white px-3 py-1 rounded-lg text-lg font-bold hover:bg-purple-700"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
