'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

interface Product {
  title: string;
  description: string;
  price: string;
  image: string;
  link?: string;
}

const ProductCards: React.FC<Product> = ({ title, description, price, image }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="w-full h-48 relative mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="font-bold mb-4">{price}</p>

      <div className="w-full flex items-center justify-center">
        <Link href="/dashboard/produits" className="w-full">
          <button className="bg-purple-500 w-full text-white px-3 py-1 rounded-lg text-lg font-bold hover:bg-purple-700">
            Voir les produits
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCards;
