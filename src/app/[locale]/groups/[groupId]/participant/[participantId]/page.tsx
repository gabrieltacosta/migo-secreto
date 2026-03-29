import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { RevealCard } from "@/components/group/RevealCard";
import { GiftSuggestionForm } from "@/components/group/GiftSuggestionForm";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ groupId: string; participantId: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { groupId, locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "ParticipantDashboard",
  });

  const group = await prisma.group.findUnique({
    where: { id: groupId },
  });

  return {
    title: `${group?.name}`,
    description: t("seoDesc", { name: group?.name as string }),
  };
}

export default async function ParticipantDashboard({ params }: PageProps) {
  const { groupId, participantId, locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "ParticipantDashboard",
  });

  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get(`session_group_${groupId}`);

  if (!sessionCookie || sessionCookie.value !== participantId) {
    redirect(`/${locale}/groups/${groupId}`); // Preserva o locale no redirecionamento server-side!
  }

  const participant = await prisma.participant.findUnique({
    where: { id: participantId },
    include: { group: true },
  });

  if (!participant || !participant.drawnId) {
    redirect(`/${locale}/groups/${groupId}`);
  }

  const drawnPerson = await prisma.participant.findUnique({
    where: { id: participant.drawnId },
  });

  if (!drawnPerson) return <div>{t("invalidDraw")}</div>;

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-primary text-primary-foreground py-8 px-4 sm:px-6 md:py-12 text-center shadow-sm">
        <h1 className="text-2xl font-bold mb-1">
          {t("hello", { name: participant.name })}
        </h1>
        <p className="text-sm opacity-90">{participant.group.name}</p>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        <Link
              href={`/groups/${groupId}`}
              className="text-blue-600 hover:underline flex items-center gap-2 text-sm font-medium mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> {t("backToGroup")}
            </Link>
        <RevealCard
          drawnName={drawnPerson.name}
          drawnSuggestion={drawnPerson.giftSuggestion}
        />
        <GiftSuggestionForm
          participantId={participantId}
          currentSuggestion={participant.giftSuggestion || ""}
        />
      </div>
    </main>
  );
}
