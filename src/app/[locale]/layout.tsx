import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }, { locale: "es" }];
}

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// 1. Juntamos as tipagens em uma única interface para o primeiro argumento
interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://migosecretosimples.com.br";

// 2. SEO Dinâmico (i18n) - Agora o Google lê o idioma correto!
export async function generateMetadata({
  params,
}: Omit<RootLayoutProps, "children">) {
  const { locale } = await params;

  setRequestLocale(locale);

  // Puxa as traduções do namespace "Metadata"
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    icons: {icon: "/gift1.png",},
    description: t("description"),
    keywords: t("keywords").split(","), // Supondo que você salve no JSON como "palavra1, palavra2"
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${siteUrl}/${locale}`,
      siteName: t("title"),
      images: [{ url: `${siteUrl}/gift1.png` }],
      locale: locale === "pt" ? "pt_BR" : locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${siteUrl}/gift1.png`],
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        "pt-BR": `${siteUrl}/pt`,
        en: `${siteUrl}/en`,
        es: `${siteUrl}/es`,
      },
    },
  };
}

// 3. Assinatura do componente corrigida (Tudo no primeiro argumento)
export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale === "pt" ? "pt-BR" : locale}
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}
    >
      {/* 4. Removido o cz-shortcut-listen para evitar erro de hidratação */}
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
