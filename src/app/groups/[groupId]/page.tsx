import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ParticipantList } from "@/components/group/ParticipantList";

interface PageProps {
  params: Promise<{ groupId: string }>;
}

// 1. SEO Dinâmico: Gera o card bonitão quando o link é colado no WhatsApp
export async function generateMetadata({ params }: PageProps) {
  const { groupId } = await params;

  const group = await prisma.group.findUnique({
    where: { id: groupId },
    select: { name: true, category: true },
  });

  if (!group) return { title: "Grupo não encontrado" };

  return {
    title: `Sorteio: ${group.name}`,
    description: `Você está participando do ${group.category}! Acesse para ver quem você tirou.`,
    openGraph: {
      title: `Sorteio: ${group.name}`,
      description: `Você está participando do ${group.category}! Acesse para ver quem você tirou.`,
      // Aqui você colocaria a URL de uma imagem padrão bonitinha do seu sistema
      images: ["/images/og-amigo-secreto.png"],
    },
  };
}

// 2. Server Component principal
export default async function GroupPage({
  params,
}: PageProps) {
  const { groupId } = await params;
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: {
      participants: {
        orderBy: { name: "asc" }, // Ordem alfabética facilita achar o nome no celular
      },
    },
  });

  if (!group) notFound(); // Mostra a página 404 padrão do Next.js

  // Removemos dados sensíveis antes de mandar pro Client Component
  const safeParticipants = group.participants.map((p) => ({
    id: p.id,
    name: p.name,
    isClaimed: !!p.passwordHash, // Só manda um boolean avisando se já tem dono
  }));

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header Mobile-First: Padding responsivo, texto centralizado no mobile */}
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
        <div className="mb-6 text-center sm:text-left">
          <h2 className="text-lg font-semibold text-gray-800">Quem é você?</h2>
          <p className="text-sm text-gray-500">
            Toque no seu nome para ver quem você tirou.
          </p>
        </div>

        {/* Passamos a lista segura para o componente interativo */}
        <ParticipantList participants={safeParticipants} groupId={group.id} />
      </div>
    </main>
  );
}
