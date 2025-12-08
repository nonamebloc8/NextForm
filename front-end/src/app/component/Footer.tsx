import Image from 'next/image';
import Link from 'next/link';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600">
        <div className="space-y-4">
          <div className="bg-red-600 w-20 h-15">
            <img
             src="/Selection.jpeg"
             alt='logo'
            />
          </div>
          <p className="max-w-xs">
            Votre source fiable en ligne pour les médicaments de perte de poids.
          </p>

          <div className="flex space-x-4 text-gray-500">
            <a href="#" className="hover:text-purple-600" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-purple-600" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-purple-600" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-purple-600" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-gray-800">Liens Rapides</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-purple-600">Accueil</Link></li>
            <li><Link href="/produits" className="hover:text-purple-600">Produits</Link></li>
            <li><Link href="/commandes" className="hover:text-purple-600">Commandes</Link></li>
            <li><Link href="/contact" className="hover:text-purple-600">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-gray-800">Légal</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-purple-600">Conditions Générales</Link></li>
            <li><Link href="#" className="hover:text-purple-600">Politique de Confidentialité</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-gray-800">Support</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-purple-600">FAQ</Link></li>
            <li><Link href="#" className="hover:text-purple-600">Nous Contacter</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
