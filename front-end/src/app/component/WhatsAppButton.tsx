"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/33752944569"
      target="_blank"
      className="fixed bottom-20 right-3 text-white p-4  flex items-center justify-center z-50"
    >
      <img src="/w.png" alt=""  className="w-28  bg-none h-25 rounded-full"/>
    </Link>
  );
}
