import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ParticipantList } from "@/components/group/ParticipantList";
import { ShareGroupLink } from "@/components/group/ShareGroupLink";
import { Link } from "@/i18n/routing"; // <-- Link customizado do i18n
import { Settings } from "lucide-react";
import { getTranslations } from "next-intl/server"; // <-- Tradução no Servidor

// Adicionamos o locale na tipagem dos parâmetros
interface PageProps {
  params: Promise<{ groupId: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { groupId, locale } = await params;
  const t = await getTranslations({ locale, namespace: "GroupPage" });

  const group = await prisma.group.findUnique({
    where: { id: groupId },
    select: { name: true, category: true },
  });

  if (!group) return { title: t("notFound") };

  // Tradução do banco dinâmica: se "category" é uma string não traduzida,
  // no ambiente real você pode cruzar com tCat("catTraditional") se quiser.
  const title = t("seoTitle", { name: group.name });
  const desc = t("seoDesc", { category: group.category });

  return {
    title: title,
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      images: ["/gift1.png"],
    },
  };
}

export default async function GroupPage({ params }: PageProps) {
  const { groupId, locale } = await params;
  const t = await getTranslations({ locale, namespace: "GroupPage" });

  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: {
      participants: { orderBy: { name: "asc" } },
    },
  });

  if (!group) notFound();

  const safeParticipants = group.participants.map((p) => ({
    id: p.id,
    name: p.name,
    isClaimed: !!p.passwordHash,
  }));

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-[#0f172a] text-primary-foreground py-8 px-4 sm:px-6 md:py-12 text-center shadow-sm">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">{group.name}</h1>
        <p className="text-sm md:text-base opacity-90">{group.category}</p>
        {group.description && (
          <p className="mt-4 text-sm max-w-md mx-auto opacity-80">
            {group.description}
          </p>
        )}
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8">
        <ShareGroupLink groupId={group.id} />
        <div className="mb-6 text-center sm:text-left">
          <h2 className="text-lg font-semibold text-gray-800">
            {t("whoAreYou")}
          </h2>
          <p className="text-sm text-gray-500">{t("tapName")}</p>
        </div>

        <ParticipantList participants={safeParticipants} groupId={group.id} />
      </div>
      <div className="mt-16 text-center pb-8">
        <Link
          href={`/groups/${group.id}/admin`}
          className="text-sm text-gray-400 hover:text-gray-600 flex items-center justify-center gap-2"
        >
          <Settings className="w-4 h-4" /> {t("adminGroup")}
        </Link>
      </div>
    </main>
  );
}
