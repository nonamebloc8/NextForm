"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { tokenManager } from "@/services/api.service";

const checkoutSchema = z.object({
  fullName: z.string().min(3, "Nom trop court"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Numéro invalide"),
  address1: z.string().min(5, "Adresse obligatoire"),
  address2: z.string().optional(),
  city: z.string().min(2, "Ville obligatoire"),
  state: z.string().min(2, "Province obligatoire"),
  postalCode: z.string().min(4, "Code postal invalide"),
  country: z.string().min(2, "Pays obligatoire"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const { cart, clearCart } = useCart();

  const deliveryFee = 10;
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const total = subtotal + deliveryFee;

  const [showRib, setShowRib] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const IBAN = "FR76 1759 8000 0100 0185 4999 019";
  const BIC = "LYDIFRP2XX";

  const copyIban = () => {
    navigator.clipboard.writeText(IBAN);
    toast.success("IBAN copié !");
  };
  const copyBic = () => {
    navigator.clipboard.writeText(BIC);
    toast.success("BIC copié !");
  };

  const onSubmit = async (data: CheckoutForm) => {
    try {
      if (cart.length === 0) {
        toast.error("Votre panier est vide !");
        return;
      }

      setIsLoading(true);

      const items = cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
      }));

      const body = {
        customerName: data.fullName,
        customerEmail: data.email,
        customerPhone: data.phone,
        shippingAddress: `${data.address1} ${data.address2 || ""}, ${data.city}, ${data.state}, ${data.postalCode}, ${data.country}`,
        subTotal: subtotal,
        shippingPrice: deliveryFee,
        total,
        payment: { method: "RIB" },
        items,
      };

      // 🔥 Correction principale ici
      const accessToken = tokenManager.getAccessToken();

      const response = await fetch("https://pharmacie-soleil.onrender.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Erreur commande");

      clearCart();
      reset();
      setIsSuccess(true);
      toast.success("Commande enregistrée !");
    } catch (e) {
      toast.error("Impossible de valider la commande");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-green-600">
          🎉 Commande validée !
        </h1>

        <p className="mt-4 text-gray-700 max-w-md">
          Merci pour votre commande. Nous avons bien reçu votre demande.
        </p>

        <p className="mt-2 text-gray-700 max-w-md">
          Pour finaliser la validation, veuillez effectuer votre virement
          instantané sur notre RIB et envoyer la capture via WhatsApp.
        </p>

        <a
          href="/"
          className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700"
        >
          Retour à l&apos;accueil
        </a>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* COL 1 */}
        <div className="lg:col-span-2 space-y-6">
          {/* —— DETAILS CLIENT —— */}
          <section className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Détails du client</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* INPUT */}
              <div>
                <input
                  placeholder="Nom complet"
                  {...register("fullName")}
                  className="input"
                />
                {errors.fullName && (
                  <p className="error">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <input
                  placeholder="Email"
                  {...register("email")}
                  className="input"
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <input
                  placeholder="Téléphone"
                  {...register("phone")}
                  className="input"
                />
                {errors.phone && (
                  <p className="error">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </section>

          {/* —— ADRESSE —— */}
          <section className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Adresse de livraison</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <input
                  placeholder="Adresse complète"
                  {...register("address1")}
                  className="input"
                />
                {errors.address1 && (
                  <p className="error">{errors.address1.message}</p>
                )}
              </div>

              <input
                placeholder="Complément (optionnel)"
                {...register("address2")}
                className="input md:col-span-2"
              />

              <div>
                <input
                  placeholder="Ville"
                  {...register("city")}
                  className="input"
                />
                {errors.city && <p className="error">{errors.city.message}</p>}
              </div>

              <div>
                <input
                  placeholder="Province"
                  {...register("state")}
                  className="input"
                />
                {errors.state && (
                  <p className="error">{errors.state.message}</p>
                )}
              </div>

              <div>
                <input
                  placeholder="Code postal"
                  {...register("postalCode")}
                  className="input"
                />
                {errors.postalCode && (
                  <p className="error">{errors.postalCode.message}</p>
                )}
              </div>

              <div>
                <input
                  placeholder="Pays"
                  {...register("country")}
                  className="input"
                />
                {errors.country && (
                  <p className="error">{errors.country.message}</p>
                )}
              </div>
            </div>
          </section>

          {/* —— PAIEMENT —— */}
          <section className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Méthodes de paiement</h2>

            <div className="space-y-3">
              <button disabled className="btn-disabled">
                PayPal (Indisponible)
              </button>

              <button disabled className="btn-disabled">
                SEPA (Indisponible)
              </button>

              <button
                type="button"
                onClick={() => setShowRib(!showRib)}
                className="btn-primary"
              >
                Paiement par RIB (virement instantané)
              </button>
            </div>

            {showRib && (
              <div className="mt-6 bg-gray-100 p-4 rounded-xl border">
                <h3 className="font-semibold mb-2 text-blue-700">
                  Informations RIB
                </h3>

                <p><strong>Bénéficiaire :</strong> Mr khelfa marwan </p>
                <p><strong>IBAN :</strong> {IBAN}</p>
                <p><strong>BIC :</strong> {BIC}</p>

                <div className="flex flex-col pb-2 w-40">
                  <button
                    type="button"
                    onClick={copyIban}
                    className="mt-2 bg-black text-white px-3 py-1 rounded-lg"
                  >
                    📋 Copier l’IBAN
                  </button>
                  <button
                    type="button"
                    onClick={copyBic}
                    className="mt-2 bg-black text-white px-3 py-1 rounded-lg"
                  >
                    📋 Copier le BIC
                  </button>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    Une fois le virement effectué, envoyez une capture via WhatsApp :
                  </p>

                  <a
                    href="https://wa.me/+33752944569"
                    className="mt-2 block bg-green-600 text-white text-center py-2 rounded-lg"
                  >
                    📲 WhatsApp : +33 7 52 94 45 69
                  </a>
                </div>

                <div className="mt-4">
                  <p className="font-bold text-black">
                    NB : Votre commande sera livrée dans les 24 heures suivant le paiement
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full bg-purple-600 text-white py-3 rounded-xl"
          >
            {isLoading ? "⌛ Envoi en cours..." : "Passer la commande"}
          </button>
        </div>

        {/* —— RECAP —— */}
        <aside className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Récapitulatif</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">Votre panier est vide.</p>
          ) : (
            <>
              <ul className="space-y-2 text-sm">
                {cart.map((item) => (
                  <li key={item.product.id} className="flex justify-between">
                    <span>{item.product.name} x{item.quantity}</span>
                    <span>
                      {(item.product.price * item.quantity).toFixed(2)} €
                    </span>
                  </li>
                ))}
              </ul>

              <hr className="my-4" />

              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>

              <div className="flex justify-between">
                <span>Livraison</span>
                <span>{deliveryFee.toFixed(2)} €</span>
              </div>

              <div className="flex justify-between font-bold mt-3 text-lg">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>

              <button
                type="button"
                onClick={clearCart}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
              >
                🗑️ Vider le panier
              </button>
            </>
          )}
        </aside>
      </form>
    </main>
  );
}
