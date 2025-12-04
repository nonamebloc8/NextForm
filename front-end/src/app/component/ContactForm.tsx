"use client";
import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 👉 Ici tu pourras plus tard appeler ton API
    // await fetch("/api/contact", { method: "POST", body: ... })

    // 👉 Reset des champs
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full">
      <h2 className="text-xl font-semibold mb-2">Contactez-nous</h2>
      <p className="text-gray-500 mb-6 text-sm">
        Nous sommes là pour vous aider avec toutes vos questions.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nom Complet</label>
          <input
            type="text"
            name="name"
            placeholder="Votre nom complet"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-purple-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Adresse E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="votre.email@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-purple-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Sujet</label>
          <input
            type="text"
            name="subject"
            placeholder="Concernant une commande, un produit..."
            value={formData.subject}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-purple-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Votre Message</label>
          <textarea
            name="message"
            placeholder="Écrivez votre message ici..."
            value={formData.message}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-purple-300 h-28 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 text-white rounded-md py-2 hover:bg-purple-600 transition"
        >
          Envoyer le Message
        </button>
      </form>
    </div>
  );
}
