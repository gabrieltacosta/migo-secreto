import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Calendar, ArrowLeft } from "lucide-react";
import { SLUG_MAP, getOriginalKeyBySlug } from "@/i18n/slug";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// 1. Gera as páginas estaticamente no build combinando Idioma + Slug traduzido
export async function generateStaticParams() {
  const locales = ["pt", "en", "es"];
  const params: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    // Para cada idioma, registra todas as variações de caminhos válidos
    Object.values(SLUG_MAP[locale]).forEach((translatedSlug) => {
      params.push({ locale, slug: translatedSlug });
    });
  });

  return params;
}

// 2. SEO Dinâmico e Internacionalizado com URLs locais
export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // Mapeia a URL recebida (ex: "remote-secret-santa") para a chave ("amigo-secreto-a-distancia")
  const originalKey = getOriginalKeyBySlug(locale, slug);

  if (!originalKey) {
    return { title: "Not Found" };
  }

  const t = await getTranslations({ locale, namespace: `BlogPosts.${originalKey}` });

  return {
    title: t("title"),
    description: t("p1").substring(0, 160),
    openGraph: {
      title: t("title"),
      description: t("p1").substring(0, 160),
      type: "article",
    },
  };
}

// 3. Componente Principal
export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const originalKey = getOriginalKeyBySlug(locale, slug);

  // Se o slug digitado não bater com nenhuma tradução válida daquele locale
  if (!originalKey) {
    notFound();
  }

  const tUI = await getTranslations({ locale, namespace: "BlogPostPage" });
  const tPost = await getTranslations({ locale, namespace: `BlogPosts.${originalKey}` });

  const hasKey = (key: string) => tPost.has(key);

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
            Publicado por{" "} 
            <span className="font-black">Carol Costa</span>
            <Calendar className="w-5 h-5 text-gray-400" />
            <time>{tPost("date")}</time>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {tPost("title")}
          </h1>
        </header>

        {/* Corpo do Artigo estruturado estruturalmente para SEO */}
        <div className="prose prose-lg md:prose-xl prose-blue max-w-none text-gray-700 leading-relaxed space-y-6">
          <p>{tPost("p1")}</p>
          {hasKey("p2") && <p>{tPost("p2")}</p>}

          {/* Seção 1 */}
          {hasKey("h2_1") && <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{tPost("h2_1")}</h2>}
          {hasKey("p3") && <p>{tPost("p3")}</p>}
          {hasKey("p4") && <p>{tPost("p4")}</p>}

          {/* Seção 2 */}
          {hasKey("h2_2") && <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{tPost("h2_2")}</h2>}
          {hasKey("p5") && <p>{tPost("p5")}</p>}
          {hasKey("p6") && <p>{tPost("p6")}</p>}

          {/* Seção 3 */}
          {hasKey("h2_3") && <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{tPost("h2_3")}</h2>}
          {hasKey("p7") && <p>{tPost("p7")}</p>}

          {/* Seção 4 */}
          {hasKey("h2_4") && <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{tPost("h2_4")}</h2>}
          {hasKey("p8") && <p>{tPost("p8")}</p>}
          {hasKey("p9") && <p>{tPost("p9")}</p>}

          {/* Seção 5 & Conclusão */}
          {hasKey("h2_5") && <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{tPost("h2_5")}</h2>}
          {hasKey("p10") && <p>{tPost("p10")}</p>}

          {hasKey("h2_6") && <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{tPost("h2_6")}</h2>}
          {hasKey("p11") && <p>{tPost("p11")}</p>}
        </div>

        {/* Rodapé Dinâmico com CTA */}
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