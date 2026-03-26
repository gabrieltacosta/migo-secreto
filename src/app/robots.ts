import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://amigosecretosimples.com";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/groups/new"],
      disallow: ["/cdn-cgi/", "/_app/", "/api/", "/groups/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
