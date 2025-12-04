'use client';

import ProductCards from './card';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

export default function ProductsSection() {
  const products = [
    {
      title: 'Wegovy',
      description: "Médicament injectable pour la gestion chronique du poids chez les adultes. Nécessite une prescription.",
      price: 'À partir de 150€',
      image: '/wegovy.jpeg',
    },
    {
      title: 'Mounjaro',
      description: "Traitement injectable avancé pour le diabète de type 2, également utilisé hors AMM pour la perte de poids. Nécessite une prescription.",
      price: 'À partir de 173€',
      image: '/mounjaro .jpg',
    },
    {
      title: 'Ozempic',
      description: "Autre option injectable pour le diabète de type 2, souvent associée à la perte de poids. Nécessite une prescription.",
      price: 'À partir de 150€',
      image: '/pharma.jpg',
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">
        Nos Solutions pour Votre Parcours
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
          >
            <ProductCards {...product} />

          </motion.div>
        ))}
      </div>
    </section>
  );
}
