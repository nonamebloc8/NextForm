'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { FiltersBar } from '../component/FiltersBar';
import ProductCard from '../component/ProductCard';


const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Récupération des produits depuis le backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://pharmacie-soleil.onrender.com/products');
        if (!res.ok) throw new Error('Erreur lors de la récupération des produits');
        const data: Product[] = await res.json();

        // Supprimer les doublons par id
        const uniqueProducts = Array.from(new Map(data.map(p => [p.id, p])).values());

        setProducts(uniqueProducts);
        setFilteredProducts(uniqueProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-10 px-4">
      <div className="flex flex-col gap-3 justify-center items-center text-center pt-8">
        <h1 className="font-bold text-purple-600 text-2xl sm:text-3xl md:text-4xl">
          Nos Produits pour la Gestion du Poids
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl">
          Découvrez notre gamme complète de solutions innovantes pour vous aider à
          <br className="hidden sm:block" />
          atteindre vos objectifs de perte de poids.
        </p>
      </div>

      <div className="min-h-screen py-6">
        <div className="max-w-7xl mx-auto w-full">
          <FiltersBar products={products} onFilter={setFilteredProducts} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.4,
                    ease: 'easeOut'
                  }}
                >
                 <ProductCard key={product.id} product={product} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Aucun produit trouvé.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
