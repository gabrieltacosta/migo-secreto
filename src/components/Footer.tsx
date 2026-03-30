"use client";

import { Gift } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing"; // Importações do seu roteador customizado

const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale(); // Descobre qual é o idioma atual (pt, en, es)
  const pathname = usePathname(); // Pega a rota atual (ex: /, /groups, /privacy)

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

          {/* SELETOR DE IDIOMAS INTELIGENTE */}
          <div className="flex gap-4 text-xs font-bold uppercase mt-4">
            <Link
              href={pathname}
              locale="pt"
              className={`transition-colors ${locale === "pt" ? "text-white" : "hover:text-white"}`}
            >
              BR
            </Link>
            <Link
              href={pathname}
              locale="en"
              className={`transition-colors ${locale === "en" ? "text-white" : "hover:text-white"}`}
            >
              US
            </Link>
            <Link
              href={pathname}
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
                href="mailto:contato@amigosecretosimples.com"
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
