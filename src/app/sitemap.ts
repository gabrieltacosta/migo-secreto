import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: "monthly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/blog`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "yearly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/groups`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "yearly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/privacy`,
      lastModified: new Date(),
      priority: 0.5,
      changeFrequency: "yearly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/amigo-pascoa`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "yearly",
    },{
      url: `${process.env.NEXT_PUBLIC_APP_URL}/amigo-chocolate`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "yearly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/amigo-secreto-whatsapp`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "yearly",
    },
  ];
}