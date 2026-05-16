import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://migosecretosimples.com.br";

  return {
    rules: {
      userAgent: "*",
      // Permite a varredura das páginas institucionais e páginas de listagem do blog
      allow: [
        "/",
        "/blog",
        "/en/blog",
        "/es/blog",
        "/groups/new",
        "/en/groups/new",
        "/es/groups/new",
      ],
      // Bloqueia APIs e rotas de IDs dinâmicos de grupos para proteger os dados dos usuários
      disallow: [
        "/api/",
        "/groups/",       // Bloqueia /groups/[id] em pt
        "/en/groups/",    // Bloqueia /en/groups/[id]
        "/es/groups/",    // Bloqueia /es/groups/[id]
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}