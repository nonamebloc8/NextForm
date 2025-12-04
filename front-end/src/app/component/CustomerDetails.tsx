"use client";

import { UseFormReturn } from "react-hook-form";

interface Customer {
  phone: number;
  fullName: string;
  email:string;
}

type Props = {
  form: UseFormReturn<Customer>;
};

export default function CustomerDetails({ form }: Props) {
  const { register, formState: { errors } } = form;

  return (
    <section className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">Détails du client</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="Votre nom complet"
            {...register("fullName")}
            className="border rounded-lg p-2 w-full"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message as string}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="votre@email.com"
            {...register("email")}
            className="border rounded-lg p-2 w-full"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
        </div>

        <div className="md:col-span-2">
          <input
            type="tel"
            placeholder="+33 123 456 789"
            {...register("phone")}
            className="border rounded-lg p-2 w-full"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message as string}</p>}
        </div>
      </div>
    </section>
  );
}
