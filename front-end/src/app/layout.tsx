import { QueryProvider } from "@/providers/QueryProvider";
import ClientLayout from "./component/ClientLayout";
import Footer from "./component/Footer";
import Navbar from "./component/NavBar";
import LoadingProvider from "./component/skeleton";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <QueryProvider>
            <ClientLayout>
              <LoadingProvider>
                <CartProvider>
                  <Navbar />
                  <main>{children}</main>
                  <Footer/>
                </CartProvider>
              </LoadingProvider>
            </ClientLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
