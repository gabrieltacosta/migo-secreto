import { Mail, Plus, Share2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const StepsSection = () => {
  const t = useTranslations("Steps");

  return (
    <section className="bg-[#0f172a] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-blue-400 font-medium mb-2 uppercase tracking-wide text-sm">
          {t("overtitle")}
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
        <p className="text-gray-400 mb-16">{t("subtitle")}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold">{t("step1Title")}</h4>
            <p className="text-gray-400 text-sm">{t("step1Desc")}</p>
            <Link
              href="/groups/new"
              className="text-blue-400 text-sm font-medium hover:underline inline-block mt-2"
            >
              {t("step1Link")}
            </Link>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center">
              <Share2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold">{t("step2Title")}</h4>
            <p className="text-gray-400 text-sm">{t("step2Desc")}</p>
            <Link
              href="/groups/new"
              className="text-blue-400 text-sm font-medium hover:underline inline-block mt-2"
            >
              {t("step2Link")}
            </Link>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold">{t("step3Title")}</h4>
            <p className="text-gray-400 text-sm">{t("step3Desc")}</p>
            <Link
              href="/groups/new"
              className="text-blue-400 text-sm font-medium hover:underline inline-block mt-2"
            >
              {t("step3Link")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
