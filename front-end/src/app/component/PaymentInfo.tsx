"use client";

import { UseFormReturn } from "react-hook-form";

type PaymentFormValues = {
  cardNumber: string;
  expiry: string;
  cvv: string;
};

type Props = {
  form: UseFormReturn<PaymentFormValues>;
};

export default function PaymentInfo({ form }: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <section className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">Informations de paiement</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Numéro de carte */}
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Numéro de carte"
            {...register("cardNumber", { required: "Le numéro de carte est obligatoire" })}
            className="border rounded-lg p-2 w-full"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>
          )}
        </div>

        {/* Date d’expiration */}
        <div>
          <input
            type="text"
            placeholder="MM/YY"
            {...register("expiry", { required: "La date d'expiration est obligatoire" })}
            className="border rounded-lg p-2 w-full"
          />
          {errors.expiry && (
            <p className="text-red-500 text-sm">{errors.expiry.message}</p>
          )}
        </div>

        {/* CVV */}
        <div>
          <input
            type="text"
            placeholder="CVV"
            {...register("cvv", { required: "Le CVV est obligatoire" })}
            className="border rounded-lg p-2 w-full"
          />
          {errors.cvv && (
            <p className="text-red-500 text-sm">{errors.cvv.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-purple-600 text-white font-medium py-3 rounded-xl hover:bg-purple-700 transition"
      >
        Passer la commande
      </button>
    </section>
  );
}
