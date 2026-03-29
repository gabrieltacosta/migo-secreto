import { useTranslations } from "next-intl";
import { HeroForm } from "./home/HeroForm";

const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <section className="px-6 py-12 md:py-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600 leading-tight">
          {t("titleLine1")} <br /> {t("titleLine2")}
        </h1>
        <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
          {t("description")}
        </p>
        <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
          {t("fillForm")}
          <span className="hidden lg:inline">{t("beside")}</span>
          <span className="lg:hidden">{t("below")}</span>
          {t("disclaimer")}
        </p>
      </div>
      <div className="w-full max-w-md mx-auto lg:ml-auto">
        <HeroForm />
      </div>
    </section>
  );
};

export default Hero;
