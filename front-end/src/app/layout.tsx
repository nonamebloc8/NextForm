import ClientLayout from "./component/ClientLayout";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
          <ClientLayout>
            {children} {/* Login, register, public pages */}
          </ClientLayout>
      </body>
    </html>
  );
}
