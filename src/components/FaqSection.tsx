import { useTranslations } from "next-intl"; // <-- Importando o hook

const FaqSection = () => {
  const t = useTranslations("Faq"); // Conectando com a chave "Faq" do JSON

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("title")}</h2>
      <p className="text-gray-500 mb-10 text-sm">{t("subtitle")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <div>
          <h4 className="font-bold text-gray-900 mb-2">{t("q1")}</h4>
          <p className="text-sm text-gray-600">{t("a1")}</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">{t("q2")}</h4>
          <p className="text-sm text-gray-600">{t("a2")}</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">{t("q3")}</h4>
          <p className="text-sm text-gray-600">{t("a3")}</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">{t("q4")}</h4>
          <p className="text-sm text-gray-600">{t("a4")}</p>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
