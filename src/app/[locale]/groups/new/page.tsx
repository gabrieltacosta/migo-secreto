import { NewGroupForm } from "@/components/create-group/NewGroupForm";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NewGroupPage" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
  };
}

export default async function NewGroupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NewGroupPage" });

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          {t("title")}
        </h1>
        <p className="text-center text-gray-600 mt-2">{t("description")}</p>
        <NewGroupForm />
      </div>
    </main>
  );
}
