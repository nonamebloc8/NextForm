"use client";

import Footer from "../component/Footer";
import Navbar from "../component/NavBar";
import ProtectedRoute from "../component/ProtectedRoute";
import ProtectedLayout from "../component/ProtectedRoute";
import LoadingProvider from "../component/skeleton";
import { CartProvider } from "../context/CartContext";



export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <ProtectedLayout>
        <LoadingProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </LoadingProvider>
      </ProtectedLayout>
    </ProtectedRoute>
  );
}
