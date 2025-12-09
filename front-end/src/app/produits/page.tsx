'use client';
import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { FiltersBar } from '../component/FiltersBar';
import ProductCard from '../component/ProductCard';
import ProductSkeleton from '../component/ProductSkeleton';
import { useProductsInfinite } from '@/hook/useProducts';

const Page = () => {
const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useProductsInfinite();

const products = data ? data.pages.flatMap((p) => p.items) : [];



  // IntersectionObserver pour déclencher fetchNextPage
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const option = { root: null, rootMargin: '200px', threshold: 0.1 };
    const observer = new IntersectionObserver(handleObserver, option);
    const el = loadMoreRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [handleObserver]);

  // Optional: integrate FiltersBar — ici on envoie tous les produits et on peut filtrer côté client
  // Si tu veux filtrer côté serveur, il faudra inclure le filtre dans la queryKey du useInfiniteQuery.
  const onFilter = (filtered: Product[]) => {
    // si FiltersBar fait le filtrage côté client, tu peux remplacer products affichés.
    // Pour garder simple, on ne gère pas l'état filteredProducts ici; tu peux implémenter selon ton FiltersBar actuel.
  };

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
          <FiltersBar products={products} onFilter={() => {}} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {isLoading ? (
              // skeletons initial
              Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: (index % 12) * 0.03,
                    duration: 0.35,
                    ease: 'easeOut'
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Veuillez patienter…
              </div>
            )}

            {/* loader area pour déclencher fetchNextPage */}
            <div className="col-span-full flex justify-center mt-6">
              {isFetchingNextPage ? (
                <div className="text-gray-500">Chargement...</div>
              ) : hasNextPage ? (
                <div ref={loadMoreRef} className="w-full h-2"></div>
              ) : (
                <div className="text-gray-400">Plus de produits</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
