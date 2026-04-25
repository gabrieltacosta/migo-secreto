import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://amigosecretosimples.com.br";

  return {
    rules: {
      userAgent: "*",
      // Permite a raiz e a criação de grupos em todos os idiomas
      allow: [
        "/",
        "/groups/new",
        "/en/groups/new",
        "/es/groups/new",
        "/blog",
        "/en/blog",
        "/es/blog",
      ],
      // Bloqueia a indexação de grupos criados por usuários em qualquer idioma
      disallow: [
        "/api/",
        "/groups/",
        "/en/groups/",
        "/es/groups/", // Bloqueia o acesso a /groups/[id]
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
