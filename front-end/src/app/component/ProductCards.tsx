'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [qty, setQty] = useState(0);
  const { addToCart } = useCart();

  const handleAdd = () => {
    const newQty = qty + 1;
    setQty(newQty);
    addToCart(product, 1);
  };

  const handleRemove = () => {
    if (qty > 0) {
      const newQty = qty - 1;
      setQty(newQty);
      addToCart(product, -1); // décrémente
    }
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition flex flex-col">
      <div className="w-full h-40 overflow-hidden rounded-t-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-800 text-lg">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-1 flex-1">{product.description}</p>
        <p className="mt-2 font-bold text-black">€{product.price}</p>

        {qty === 0 ? (
          <Button
            onClick={handleAdd}
            className="mt-4 bg-purple-500 text-white hover:bg-purple-600 w-full"
          >
            Ajouter au panier
          </Button>
        ) : (
          <div className="flex items-center justify-center mt-4 border rounded-md w-full overflow-hidden">
            <button
              onClick={handleRemove}
              className="bg-blue-600 text-white px-3 py-1 font-bold text-lg"
            >
              −
            </button>
            <div className="px-4 py-1 font-semibold">{qty}</div>
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-3 py-1 font-bold text-lg"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
