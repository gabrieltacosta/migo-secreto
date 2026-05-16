"use client";

import { Gift } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { SLUG_MAP, getOriginalKeyBySlug } from "@/i18n/slug"; // Importa o mapeamento de slugs

const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const pathname = usePathname();

  // Função inteligente para calcular a URL correta para cada idioma no seletor
  const getLocalizedPath = (targetLocale: string) => {
    // Verifica se a rota atual faz parte do blog interno: /blog/algum-slug
    if (pathname.startsWith("/blog/")) {
      const currentSlug = pathname.replace("/blog/", "");

      // 1. Descobre o ID imutável do post (Ex: "amigo-secreto-a-distancia")
      const originalKey = getOriginalKeyBySlug(locale, currentSlug);

      if (originalKey) {
        // 2. Busca o slug traduzido correspondente ao idioma do botão clicado
        const targetSlug = SLUG_MAP[targetLocale]?.[originalKey];
        if (targetSlug) {
          return `/blog/${targetSlug}`;
        }
      }
    }

    // Se for uma página institucional comum (ex: /, /privacy, /groups/new), mantém o caminho original
    return pathname;
  };

  return (
    <footer className="bg-[#0f172a] text-gray-400 py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-blue-600 p-1.5 rounded-md">
              <Gift className="w-5 h-5" />
            </div>
            <span className="font-bold">{t("brand")}</span>
          </div>
          <p className="text-xs">{t("description")}</p>

          {/* SELETOR DE IDIOMAS INTELIGENTE E CORRIGIDO */}
          <div className="flex gap-4 text-xs font-bold uppercase mt-4">
            <Link
              href={getLocalizedPath("pt")}
              locale="pt"
              className={`transition-colors ${locale === "pt" ? "text-white" : "hover:text-white"}`}
            >
              BR
            </Link>
            <Link
              href={getLocalizedPath("en")}
              locale="en"
              className={`transition-colors ${locale === "en" ? "text-white" : "hover:text-white"}`}
            >
              US
            </Link>
            <Link
              href={getLocalizedPath("es")}
              locale="es"
              className={`transition-colors ${locale === "es" ? "text-white" : "hover:text-white"}`}
            >
              ES
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">{t("navTitle")}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/amigo-secreto-whatsapp"
                className="hover:text-blue-400"
              >
                {t("navWhatsapp")}
              </Link>
            </li>
            <li>
              <Link href="/groups/new" className="hover:text-blue-400">
                {t("navCreate")}
              </Link>
            </li>
            <li>
              <Link href="/groups" className="hover:text-blue-400">
                {t("navGroups")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">{t("linksTitle")}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="mailto:contato@amigosecretosimples.com.br"
                className="hover:text-blue-400"
                target="_blank"
              >
                {t("linkContact")}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-blue-400">
                {t("linkPrivacy")}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-blue-400">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">{t("catTitle")}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/amigo-chocolate" className="hover:text-blue-400">
                {t("catChocolate")}
              </Link>
            </li>
            <li>
              <Link href="/amigo-pascoa" className="hover:text-blue-400">
                {t("catEaster")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-xs text-center md:text-left">
        {t("rights")}
      </div>
    </footer>
  );
};

export default Footer;