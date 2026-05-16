import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("Privacy");

  return (
    <div className="w-full min-h-screen bg-gray-950 text-gray-300 py-16 px-4 sm:px-6 lg:px-8 flex-1">
      <div className="max-w-3xl mx-auto space-y-12 select-none">
        
        {/* Cabeçalho Principal com Destaque */}
        <header className="border-b border-gray-800 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t("title")}
          </h1>
        </header>

        {/* Corpo do Texto Espaçado e Legível */}
        <div className="space-y-10 text-base sm:text-lg leading-relaxed text-gray-400">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-wide">
              {t("intro_title")}
            </h2>
            <p>{t("intro_p")}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-wide">
              {t("data_title")}
            </h2>
            <p>{t("data_p")}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wide">
              {t("cookies_title")}
            </h2>
            <p>{t("cookies_p")}</p>
            <ul className="list-disc pl-6 space-y-3 text-gray-400">
              <li>{t("cookies_essential")}</li>
              <li>{t("cookies_analytical")}</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-wide">
              {t("retention_title")}
            </h2>
            <p>{t("retention_p")}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-wide">
              {t("sharing_title")}
            </h2>
            <p>{t("sharing_p")}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-wide">
              {t("rights_title")}
            </h2>
            <p>{t("rights_p")}</p>
            <div className="bg-gray-900/50 border border-gray-800 p-5 rounded-xl text-blue-400 font-medium text-center sm:text-left shadow-inner">
              {t("contact")}
            </div>
          </section>
          
        </div>

        {/* Rodapé Interno da Página */}
        <footer className="pt-6 border-t border-gray-800 text-sm text-gray-600">
          {t("effective_date")}
        </footer>
        
      </div>
    </div>
  );
}