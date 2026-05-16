import { MetadataRoute } from "next";
import { SLUG_MAP } from "@/i18n/slug";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://migosecretosimples.com.br";

  const locales = ["pt", "en", "es"] as const;
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Rotas Estáticas Padrão (Onde o slug não muda, apenas o locale na URL)
  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/groups/new", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/amigo-pascoa", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/amigo-chocolate", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/amigo-secreto-whatsapp", priority: 0.9, changeFrequency: "yearly" as const },
  ];

  // Força a criação física de uma URL no sitemap para cada idioma nas rotas estáticas
  staticRoutes.forEach((route) => {
    locales.forEach((locale) => {
      // Se for 'pt', não usa prefixo (as-needed). Se for en/es, adiciona /en ou /es
      const url = locale === "pt" 
        ? `${baseUrl}${route.path}` 
        : `${baseUrl}/${locale}${route.path}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: locale === "pt" ? route.priority : route.priority - 0.1, // Sutil ajuste de prioridade para secundários
      });
    });
  });

  // 2. Rotas Dinâmicas do Blog (Onde o slug MUDA dependendo do idioma)
  const blogPostKeys = Object.keys(SLUG_MAP.pt);

  blogPostKeys.forEach((key) => {
    locales.forEach((locale) => {
      const slugTraduzido = SLUG_MAP[locale][key];

      if (slugTraduzido) {
        const url = locale === "pt"
          ? `${baseUrl}/blog/${slugTraduzido}`
          : `${baseUrl}/${locale}/blog/${slugTraduzido}`;

        sitemapEntries.push({
          url,
          lastModified: new Date(),
          changeFrequency: "yearly" as const,
          priority: locale === "pt" ? 0.8 : 0.7,
        });
      }
    });
  });

  return sitemapEntries;
}