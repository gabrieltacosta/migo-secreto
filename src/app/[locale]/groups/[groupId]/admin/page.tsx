import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing"; // <-- Link customizado do i18n
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Users, ArrowLeft } from "lucide-react";
import { AdminLoginForm } from "@/components/group/AdminLoginForm";
import { DeleteGroupButton } from "@/components/group/DeleteGroupButton";
import { getTranslations } from "next-intl/server";

interface PageProps {
  params: Promise<{ groupId: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AdminPage" });
  return { title: t("seoTitle") };
}

export default async function AdminPage({ params }: PageProps) {
  const resolvedParams = await params;
  const t = await getTranslations({
    locale: resolvedParams.locale,
    namespace: "AdminPage",
  });

  const dynamicId = resolvedParams.groupId;

  if (!dynamicId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">{t("criticalError")}</p>
      </div>
    );
  }

  const group = await prisma.group.findUnique({
    where: { id: String(dynamicId) },
    include: { participants: true },
  });

  if (!group) notFound();

  const isLocked = !!group.adminPassword;
  const cookieStore = await cookies();
  const hasAuthCookie = cookieStore.has(`admin_session_${group.id}`);

  if (isLocked && !hasAuthCookie) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <AdminLoginForm groupId={group.id} />
      </main>
    );
  }

  const claimedCount = group.participants.filter(
    (p: { passwordHash: string | null }) => p.passwordHash,
  ).length;
  const totalCount = group.participants.length;

  return (
    <main className="min-h-screen bg-gray-50 pb-20 pt-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href={`/groups/${group.id}`}
              className="text-blue-600 hover:underline flex items-center gap-2 text-sm font-medium mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> {t("backToGroup")}
            </Link>
            <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-900">
              <ShieldAlert className="w-8 h-8 text-blue-600" />
              {t("adminPanel")}
            </h1>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {t("participantStatus")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100">
                <Users className="w-8 h-8" />
                <div>
                  <p className="font-bold text-2xl">
                    {claimedCount}{" "}
                    <span className="text-sm font-normal">{t("of")}</span>{" "}
                    {totalCount}
                  </p>
                  <p className="text-sm">{t("accessedDesc")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-red-600">
                {t("dangerZone")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{t("dangerDesc")}</p>
              <DeleteGroupButton groupId={group.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
