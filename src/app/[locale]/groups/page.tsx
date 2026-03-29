import { MyGroupsList } from "@/components/home/MyGroupsList";
import { Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "GroupsPage" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function GroupsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "GroupsPage" });

  return (
    <main className="grow flex flex-col font-sans bg-gray-50 min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto w-full px-6">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 flex items-center justify-center sm:justify-start gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            {t("h1")}
          </h1>
          <p className="text-gray-500 mt-2 text-lg">{t("subtitle")}</p>
        </div>
        <MyGroupsList />
      </div>
    </main>
  );
}
