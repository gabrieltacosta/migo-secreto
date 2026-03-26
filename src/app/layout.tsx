import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  title: {
    default: "Amigo Secreto Simples",
    template: "%s | Amigo Secreto Simples",
  },
  description:
    "Organize seu Amigo Secreto online. Não é necessário cadastro, nem telefone, nem e-mail. Compartilhe o link do seu grupo para os participantes entrarem.",
  keywords: [
    "amigo secreto",
    "sorteio online",
    "gerador de amigo oculto",
    "amigo secreto whatsapp",
    "amigo oculto whatsapp",
  ],
  openGraph: {
    title: "Amigo Secreto Simples",
    description:
      "Organize seu Amigo Secreto online. Não é necessário cadastro, nem telefone, nem e-mail. Compartilhe o link do seu grupo para os participantes entrarem.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    siteName: "Amigo Secreto Simples",
    images: [{ url: `${process.env.NEXT_PUBLIC_APP_URL}/gift1.png` }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amigo Secreto Simples",
    description:
      "Organize seu Amigo Secreto online. Não é necessário cadastro, nem telefone, nem e-mail. Compartilhe o link do seu grupo para os participantes entrarem.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/gift1.png`],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
    languages: {
      "pt-BR": `${process.env.NEXT_PUBLIC_APP_URL}`,
      "x-default": `${process.env.NEXT_PUBLIC_APP_URL}`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col" cz-shortcut-listen="true">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
