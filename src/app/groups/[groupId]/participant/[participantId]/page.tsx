import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { RevealCard } from "@/components/group/RevealCard";
import { GiftSuggestionForm } from "@/components/group/GiftSuggestionForm";

export async function generateMetadata({ params }: PageProps) {
  const { groupId } = await params;

  const group = await prisma.group.findUnique({
    where: { id: groupId },
  });

  return {
    title: `${group?.name}`,
    description: `Descubra tudo sobre ${group?.name} no Amigo Secreto.`,
  };
}

interface PageProps {
  params: Promise<{ groupId: string; participantId: string }>;
}

export default async function ParticipantDashboard({ params }: PageProps) {
  const { groupId, participantId } = await params;

  // 1. BARREIRA DE SEGURANÇA: Verificando o Cookie HTTP-Only
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get(`session_group_${groupId}`);

  // Se não tem cookie, ou se o cookie não pertence a este participante, expulsa!
  if (!sessionCookie || sessionCookie.value !== participantId) {
    redirect(`/groups/${groupId}`);
  }

  // 2. Busca os dados se passou na segurança
  const participant = await prisma.participant.findUnique({
    where: { id: participantId },
    include: { group: true },
  });

  if (!participant || !participant.drawnId) {
    redirect(`/groups/${groupId}`);
  }

  // Busca quem ele tirou
  const drawnPerson = await prisma.participant.findUnique({
    where: { id: participant.drawnId },
  });

  if (!drawnPerson) return <div>Erro: Sorteio inválido.</div>;

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-primary text-primary-foreground py-8 px-4 sm:px-6 md:py-12 text-center shadow-sm">
        <h1 className="text-2xl font-bold mb-1">Olá, {participant.name}!</h1>
        <p className="text-sm opacity-90">{participant.group.name}</p>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        {/* Componente Client-side para revelar o nome com suspense (Mobile-First) */}
        <RevealCard
          drawnName={drawnPerson.name}
          drawnSuggestion={drawnPerson.giftSuggestion}
        />

        {/* Formulário para a pessoa colocar a própria sugestão de presente */}
        <GiftSuggestionForm
          participantId={participantId}
          currentSuggestion={participant.giftSuggestion || ""}
        />
      </div>
    </main>
  );
}
