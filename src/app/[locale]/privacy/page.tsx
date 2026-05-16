import { Link } from "@/i18n/routing"; // Nosso Link customizado!
import { getTranslations, setRequestLocale } from "next-intl/server";

// Estratégia Sênior para SEO Multilíngue
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Puxa as traduções apenas para as metatags no servidor
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return {
    title: t("title"),
    // Usamos o primeiro parágrafo (p1) como description para o Google
    description: t("p1"),
  };
}

const PrivacyPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);
  // Puxa as traduções para o componente visual
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
          {t("title")}
        </h1>

        <section className="mb-8 sm:mb-10">
          <p className="mb-4 text-sm sm:text-base leading-relaxed">{t("p1")}</p>
          <p className="mb-4 text-sm sm:text-base leading-relaxed">{t("p2")}</p>
          <p className="mb-4 text-sm sm:text-base leading-relaxed">{t("p3")}</p>
          <p className="mb-4 text-sm sm:text-base leading-relaxed">{t("p4")}</p>
          <p className="mb-4 text-sm sm:text-base leading-relaxed">{t("p5")}</p>
          <p className="mb-4 text-sm sm:text-base leading-relaxed">{t("p6")}</p>
          <p className="mb-4 text-sm sm:text-base leading-relaxed">{t("p7")}</p>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
            {t("commitmentTitle")}
          </h2>
          <p className="mb-4 text-sm sm:text-base leading-relaxed">
            {t("commitmentDesc")}
          </p>
          <ul className="list-disc list-inside space-y-2 sm:space-y-3 mb-4 text-sm sm:text-base">
            <li>{t("l1")}</li>
            <li>{t("l2")}</li>
            <li>{t("l3")}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
            {t("moreInfoTitle")}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            {t("moreInfoDesc")}{" "}
            <Link
              href="mailto:contato@amigosecretosimples.com"
              className="text-blue-600 hover:underline break-all"
              target="_blank"
            >
              contato@migosecretosimples.com.br
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPage;
