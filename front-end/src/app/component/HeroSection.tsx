'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSectionAnimated() {
  return (
    <section className="mx-auto w-full rounded-md border border-violet-200 bg-violet-50 p-6 md:p-10">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h2 className="mb-4 text-2xl font-extrabold leading-snug text-gray-900 md:text-5xl">
            Découvrez une <span className="text-violet-700">Nouvelle Approche</span>
            <br />
            de la Perte de Poids
          </h2>
          <p className="mb-6 text-gray-700 text-sm md:text-xl">
            Nous vous offrons un accès sécurisé et discret aux traitements de perte
            de poids les plus efficaces, tels que Wegovy et Mounjaro,
            avec un accompagnement expert.
          </p>
          <button className="rounded-md mt-4 bg-violet-600 px-6 py-2 text-sm md:text-base font-medium text-white shadow hover:bg-violet-700 transition-colors">
            <Link href="/produits">Parcourir les produits</Link>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-end"
        >
          <div className="overflow-hidden rounded-xl bg-white p-2 shadow-sm">
            <Image
              src="/pharma1.jpg"
              alt="Illustration Perte de Poids"
              width={500}
              height={350}
              className="rounded-lg object-cover w-full h-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
