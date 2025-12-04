'use client';

import { FaUserMd, FaShieldAlt, FaTruck, FaHeadset } from "react-icons/fa";
import FeatureCard from "./FeatureCard";
import { motion } from "framer-motion";

export default function WhyChooseSection() {
  const features = [
    {
      icon: <FaUserMd />,
      title: "Consultation Médicale",
      description:
        "Accès à des professionnels de santé pour un accompagnement personnalisé.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Produits Authentiques",
      description:
        "Garantie de médicaments certifiés et de qualité pharmaceutique.",
    },
    {
      icon: <FaTruck />,
      title: "Livraison Discrète",
      description:
        "Recevez vos commandes en toute confidentialité et sécurité.",
    },
    {
      icon: <FaHeadset />,
      title: "Support Expert",
      description:
        "Notre équipe est là pour répondre à toutes vos questions.",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
          Pourquoi Choisir Mounjaro & Wegovy  ?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5, ease: 'easeOut' }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
