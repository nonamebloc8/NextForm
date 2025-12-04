'use client';

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Avatart1, Avatart2 } from "./svg";

interface Testimonial {
  message: string;
  name: string;
  image: ReactNode;
}

const testimonials: Testimonial[] = [
  {
    message:
      "Grâce à Mounjaro & Wegovy , j’ai trouvé le soutien et les médicaments dont j’avais besoin pour atteindre mes objectifs de perte de poids. Le processus est simple et le service client est exceptionnel !",
    name: "Sophie D.",
    image: <Avatart1 />, 
  },
  {
    message:
      "La plateforme est très facile à utiliser et j’ai pu obtenir mes médicaments rapidement et en toute discrétion. Une solution vraiment efficace et pratique.",
    name: "Marc L.",
    image: <Avatart2 />, 
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10">
          Ce Que Disent Nos Clients
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3, duration: 0.5, ease: "easeOut" }}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm flex flex-col items-center text-center"
            >
              <p className="text-gray-600 italic mb-4">&ldquo;{testimonial.message}&ldquo;</p>

              <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-full overflow-hidden">
                {testimonial.image}
              </div>

              <p className="font-semibold">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>

        {/* Pagination statique */}
        <div className="flex justify-center mt-8 space-x-2">
          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
          <span className="w-2 h-2 bg-gray-200 rounded-full"></span>
          <span className="w-2 h-2 bg-gray-200 rounded-full"></span>
        </div>
      </div>
    </section>
  );
}
