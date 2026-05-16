import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { SLUG_MAP } from "@/i18n/slug";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Blog" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Blog" });

  // O ID interno (chave) mapeia para os textos do JSON, mas pegamos o slug pela URL localizada
  const posts = [
    {
      id: 1,
      title: t("p1Title"),
      desc: t("p1Desc"),
      date: t("p1Date"),
      rawDate: "2026-01-15",
      key: "dicas-presente-amigo-secreto",
    },
    {
      id: 2,
      title: t("p2Title"),
      desc: t("p2Desc"),
      date: t("p2Date"),
      rawDate: "2026-02-22",
      key: "amigo-secreto-a-distancia",
    },
    {
      id: 3,
      title: t("p3Title"),
      desc: t("p3Desc"),
      date: t("p3Date"),
      rawDate: "2026-03-05",
      key: "variacoes-divertidas-amigo-secreto"
    },
    {
      id: 4,
      title: t("p4Title"),
      desc: t("p4Desc"),
      date: t("p4Date"),
      rawDate: "2026-04-12",
      key: "amigo-secreto-firma"
    },
    {
      id: 5,
      title: t("p5Title"),
      desc: t("p5Desc"),
      date: t("p5Date"),
      rawDate: "2026-05-16",
      key: "brincadeiras-revelacao"
    },
  ];

  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime();
  });

  return (
    <main className="min-h-screen bg-gray-50 pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12 text-center sm:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 flex items-center justify-center sm:justify-start gap-3">
            <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
            {t("title")}
          </h1>
          <p className="text-gray-500 mt-4 text-lg max-w-2xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="space-y-6">
          {sortedPosts.map((post) => {
            // Obtém o slug correspondente ao idioma atual baseado na chave do post
            const localizedSlug = SLUG_MAP[locale]?.[post.key] || post.key;

            return (
              <Card
                key={post.id}
                className="group hover:border-blue-600 hover:shadow-md transition-all duration-300"
              >
                <CardContent className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                      Publicado por{" "}
                      <span className="font-black">Carol Costa</span>
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">{post.desc}</p>
                  </div>

                  <div className="pt-4 border-t md:border-t-0 md:pl-6 md:border-l md:pt-0 shrink-0">
                    <Link
                      href={`/blog/${localizedSlug}`}
                      className="inline-flex items-center font-bold text-blue-600 hover:text-blue-700"
                    >
                      {t("readMore")}{" "}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}