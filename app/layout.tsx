import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TToastProvider } from "@/components/kit";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Trainovate · Brand Hub",
  description: "The full Trainovate brand system — identity, components, templates, code-ready tokens.",
  icons: { icon: "/brand/favicon-32.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <ThemeProvider>
          <TToastProvider>
            <Nav />
            {children}
            <Footer />
          </TToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
