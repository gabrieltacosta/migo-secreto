import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://amigosecretosimples.com";

  // Array com as configurações base das suas rotas
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/groups", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.5, changeFrequency: "yearly" as const },
    {
      path: "/amigo-pascoa",
      priority: 0.8,
      changeFrequency: "yearly" as const,
    },
    {
      path: "/amigo-chocolate",
      priority: 0.8,
      changeFrequency: "yearly" as const,
    },
    {
      path: "/amigo-secreto-whatsapp",
      priority: 0.9,
      changeFrequency: "yearly" as const,
    },
  ];

  // Mapeia as rotas gerando a URL principal e as alternativas em outros idiomas
  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    priority: route.priority,
    changeFrequency: route.changeFrequency,
    // Isso diz ao Google: "Esta página existe nestes outros idiomas também"
    alternates: {
      languages: {
        "pt-BR": `${baseUrl}${route.path}`, // Padrão (sem prefixo, pois usamos 'as-needed')
        en: `${baseUrl}/en${route.path}`, // Inglês
        es: `${baseUrl}/es${route.path}`, // Espanhol
      },
    },
  }));
}
