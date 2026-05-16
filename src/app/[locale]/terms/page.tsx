import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("Terms");

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
              {t("terms_title")}
            </h2>
            <p>{t("terms_p")}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-wide">
              {t("conduct_title")}
            </h2>
            <p>{t("conduct_p")}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-wide">
              {t("license_title")}
            </h2>
            <p>{t("license_p")}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-wide">
              {t("disclaimer_title")}
            </h2>
            <p>{t("disclaimer_p")}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-wide">
              {t("law_title")}
            </h2>
            <p>{t("law_p")}</p>
          </section>
          
        </div>
        
      </div>
    </div>
  );
}