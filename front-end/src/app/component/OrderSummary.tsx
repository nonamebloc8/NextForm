"use client";

import { useCart } from "@/app/context/CartContext";

export default function OrderSummary() {
  const { cart, clearCart } = useCart();

  const deliveryFee = 10; // frais de livraison fixe
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const total = subtotal + deliveryFee;

  return (
    <aside className="bg-white shadow rounded-2xl p-6 h-fit">
      <h2 className="text-lg font-semibold mb-4">Récapitulatif de la commande</h2>

      {cart.length === 0 ? (
        <p className="text-sm text-gray-500">Votre panier est vide.</p>
      ) : (
        <>
          {/* Liste dynamique des produits */}
          <ul className="space-y-2 text-sm">
            {cart.map((item) => (
              <li
                key={item.product.id}
                className="flex justify-between items-center"
              >
                <span>
                  {item.product.name} ({item.quantity})
                </span>
                <span>
                  {(item.product.price * item.quantity).toFixed(2)} €
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t my-4"></div>

          {/* Sous-total */}
          <div className="flex justify-between text-sm">
            <span>Sous-total</span>
            <span>{subtotal.toFixed(2)} €</span>
          </div>

          {/* Livraison */}
          <div className="flex justify-between text-sm">
            <span>Livraison</span>
            <span>{deliveryFee.toFixed(2)} €</span>
          </div>

          {/* Total */}
          <div className="flex justify-between font-semibold text-base mt-3">
            <span>Total</span>
            <span>{total.toFixed(2)} €</span>
          </div>

          {/* Bouton vider le panier */}
          <button
            onClick={clearCart}
            className="mt-4 w-full bg-red-500 text-white text-sm py-2 rounded-lg hover:bg-red-600 transition"
          >
            🗑️ Vider le panier
          </button>

          {/* Sécurité */}
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
            <span className="inline-block w-4 h-4 border rounded-full flex items-center justify-center">
              🔒
            </span>
            Transactions sécurisées avec cryptage SSL.
          </div>
        </>
      )}
    </aside>
  );
}
