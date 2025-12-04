'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

type NavItem = {
  name: string;
  href: string;
};

const navItems: NavItem[] = [
  { name: 'Accueil', href: '/' },
  { name: 'Produits', href: '/produits' },
  { name: 'Commandes', href: '/commandes' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <>
      {/* HEADER FIXE */}
      <header className="fixed top-0 left-0 w-full z-50 shadow-gray-300 bg-white backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <img src="/Selection.jpeg" className="w-15 h-10 rounded-full" alt="logo" />
            </Link>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden space-x-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative pb-1 text-sm font-medium transition-colors hover:text-violet-500 
                ${
                  pathname === item.href
                    ? 'text-violet-500 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-violet-500'
                    : 'text-gray-700 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-violet-500 after:transition-all after:duration-300 hover:after:w-full'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Panier */}
            <Link
              href="/commandes"
              className="group rounded-full p-2 hover:bg-gray-100 transition-colors relative"
            >
              <ShoppingCart className="h-5 w-5 text-gray-700 group-hover:text-violet-500 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Profil */}
            {/* <Link
              href="/profil"
              className="group rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <User className="h-5 w-5 text-gray-700 group-hover:text-violet-500 transition-colors" />
            </Link> */}

            {/* Bouton menu mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            >
              <span className="sr-only">Ouvrir le menu</span>
              <div className="space-y-1">
                <span className="block h-0.5 w-5 bg-gray-700"></span>
                <span className="block h-0.5 w-5 bg-gray-700"></span>
                <span className="block h-0.5 w-5 bg-gray-700"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation Mobile */}
        {isOpen && (
          <nav className="flex flex-col space-y-2 border-t px-4 py-3 md:hidden bg-white shadow-md">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium transition-colors hover:text-violet-500 ${
                  pathname === item.href ? 'text-violet-500' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <div className="h-[72px]" /> 
    </>
  );
}
