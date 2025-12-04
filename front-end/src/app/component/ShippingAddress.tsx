"use client";

import { UseFormReturn } from "react-hook-form";

type address = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};
type Props = {
  form: UseFormReturn<address>;
};

export default function ShippingAddress({ form }: Props) {
  const { register, formState: { errors } } = form;

  return (
    <section className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">Adresse de livraison</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="123 Rue de la République"
            {...register("address1")}
            className="border rounded-lg p-2 w-full"
          />
          {errors.address1 && <p className="text-red-500 text-sm">{errors.address1.message as string}</p>}
        </div>

        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Appartement, Bâtiment (optionnel)"
            {...register("address2")}
            className="border rounded-lg p-2 w-full"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Paris"
            {...register("city")}
            className="border rounded-lg p-2 w-full"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city.message as string}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Île-de-France"
            {...register("state")}
            className="border rounded-lg p-2 w-full"
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state.message as string}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="75001"
            {...register("postalCode")}
            className="border rounded-lg p-2 w-full"
          />
          {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message as string}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="France"
            {...register("country")}
            className="border rounded-lg p-2 w-full"
          />
          {errors.country && <p className="text-red-500 text-sm">{errors.country.message as string}</p>}
        </div>
      </div>
    </section>
  );
}
