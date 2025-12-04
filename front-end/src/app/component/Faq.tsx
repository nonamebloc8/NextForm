'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'Comment puis-je commander des médicaments ?',
    answer: 'Vous pouvez commander en ligne via notre site après avoir créé un compte et ajouté les médicaments à votre panier.',
  },
  {
    question: 'Les médicaments nécessitent-ils une prescription ?',
    answer: 'Certains médicaments nécessitent une prescription valide, qui peut être téléversée pendant le processus de commande.',
  },
  {
    question: 'Quelles sont les options de livraison ?',
    answer: 'Nous proposons la livraison standard, express et en point relais selon votre localisation.',
  },
  {
    question: 'Comment contacter le support client ?',
    answer: 'Vous pouvez nous contacter par chat, email ou téléphone via la section "Contact" du site.',
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className=" w-full bg-gray-50 mb-6 mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Questions Fréquentes</h2>
      <div className="space-y-4 flex flex-col justify-center items-center md:px-30">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border  w-full border-gray-200 rounded-lg shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left"
            >
              <span className="text-sm sm:text-base font-medium">{item.question}</span>
              <ChevronDownIcon
                className={`h-5 w-5 transform transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {activeIndex === index && (
              <div className="px-4 pb-4 text-sm text-gray-600 transition-all duration-300">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
