import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Amigo Secreto Simples",
    short_name: "Amigo Secreto",
    description:
      "Organize seu Amigo Secreto online. Não é necessário cadastro, nem telefone, nem e-mail. Compartilhe o link do seu grupo para os participantes entrarem.",
    start_url: "/",
    display: "standalone",
    background_color: "#e4e4e7",
    theme_color: "#0f172a",
    icons: [
      {
        src: "icons/launchericon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "icons/launchericon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "icons/launchericon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "icons/launchericon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "icons/launchericon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icons/launchericon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    lang: "pt-BR",
    orientation: "any",
    categories: [
      "entertainment",
      "lifestyle",
      "personalization",
      "social",
      "utilities",
    ],
  };
}
