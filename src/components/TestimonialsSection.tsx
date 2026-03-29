import { useTranslations } from "next-intl";
import { Card, CardContent } from "./ui/card";

const TestimonialsSection = () => {
  const t = useTranslations("Testimonials");

  // Remonta o array com os dados traduzidos
  const testimonials = [
    { t: t("t1"), n: t("n1") },
    { t: t("t2"), n: t("n2") },
    { t: t("t3"), n: t("n3") },
    { t: t("t4"), n: t("n4") },
    { t: t("t5"), n: t("n5") },
    { t: t("t6"), n: t("n6") },
  ];

  return (
    <section className="py-20 px-6 bg-linear-to-b from-white via-pink-50/50 to-white relative overflow-hidden">
      {/* ... (bolhas de fundo iguais) ... */}
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <h3 className="text-blue-600 font-medium mb-2 uppercase tracking-wide text-sm">
          {t("overtitle")}
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-gray-900">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {testimonials.map((dep, i) => (
            <Card
              key={i}
              className="border-0 shadow-sm bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6 space-y-4">
                <p className="text-gray-600 text-sm">&quot;{dep.t}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-400 to-pink-400"></div>
                  <span className="text-sm font-bold text-gray-900">
                    {dep.n}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
