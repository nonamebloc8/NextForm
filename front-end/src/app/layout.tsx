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
          <ClientLayout>
            <LoadingProvider>
              <CartProvider>
                <Navbar />
                <main>{children}</main>
                <Footer/>
              </CartProvider>
            </LoadingProvider>
          </ClientLayout>
      </body>
    </html>
  );
}
