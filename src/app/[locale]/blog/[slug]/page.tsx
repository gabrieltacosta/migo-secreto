import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Calendar, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// 1. Gera as páginas estaticamente no build
export function generateStaticParams() {
  return [
    { slug: "dicas-presente-amigo-secreto" },
    { slug: "amigo-secreto-a-distancia" },
    { slug: "variacoes-divertidas-amigo-secreto" },
  ];
}

// 2. SEO Dinâmico e Internacional
export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // Valida se o slug existe na nossa lista de mocks
  const validSlugs = [
    "dicas-presente-amigo-secreto",
    "amigo-secreto-a-distancia",
    "variacoes-divertidas-amigo-secreto",
  ];

  if (!validSlugs.includes(slug)) {
    return { title: "Not Found" };
  }

  const t = await getTranslations({ locale, namespace: `BlogPosts.${slug}` });

  return {
    title: t("title"),
    description: t("p1"), // Usamos o primeiro parágrafo como description para o Google
    openGraph: {
      title: t("title"),
      description: t("p1"),
      type: "article",
    },
  };
}

// 3. Componente Principal
export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tUI = await getTranslations({ locale, namespace: "BlogPostPage" });

  const validSlugs = [
    "dicas-presente-amigo-secreto",
    "amigo-secreto-a-distancia",
    "variacoes-divertidas-amigo-secreto",
  ];

  // Se o usuário digitar uma URL que não existe (ex: /blog/xpto)
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  // Puxa as traduções específicas deste post
  const tPost = await getTranslations({
    locale,
    namespace: `BlogPosts.${slug}`,
  });

  return (
    <main className="min-h-screen bg-white pt-12 pb-24 font-sans">
      <article className="max-w-3xl mx-auto px-6">
        {/* Botão de Voltar */}
        <div className="mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {tUI("back")}
          </Link>
        </div>

        {/* Cabeçalho do Artigo */}
        <header className="mb-12 space-y-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <Calendar className="w-5 h-5 text-gray-400" />
            <time>{tPost("date")}</time>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {tPost("title")}
          </h1>
        </header>

        {/* Corpo do Artigo (Prose Style) */}
        <div className="prose prose-lg md:prose-xl prose-blue max-w-none text-gray-700 leading-relaxed space-y-8">
          <p>{tPost("p1")}</p>
          <p>{tPost("p2")}</p>
          <p>{tPost("p3")}</p>
        </div>

        {/* Rodapé Simples */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-center">
          <Link href="/groups/new">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-transform">
              Organizar meu Amigo Secreto agora
            </button>
          </Link>
        </div>
      </article>
    </main>
  );
}
