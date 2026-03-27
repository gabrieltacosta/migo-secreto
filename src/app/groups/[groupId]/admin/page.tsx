import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Users, ArrowLeft } from "lucide-react";
import { AdminLoginForm } from "@/components/group/AdminLoginForm";
import { DeleteGroupButton } from "@/components/group/DeleteGroupButton";

export const metadata = { title: "Administração do Grupo" };

interface PageProps {
  params: Promise<{ groupId: string }>;
}

// Tipamos como Promise<any> para podermos fazer a busca segura independente do nome real da pasta
export default async function AdminPage({
  params,
}: {
  params: PageProps["params"];
}) {
  const resolvedParams = await params;

  // O pulo do gato: tenta capturar o ID prevendo as 3 formas mais comuns que a pasta pode estar nomeada
  const dynamicId = resolvedParams.groupId;

  // Agora sim, a proteção funciona 100% e impede o crash do Prisma
  if (!dynamicId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">
          Erro crítico: ID do grupo não encontrado na rota.
        </p>
      </div>
    );
  }

  const group = await prisma.group.findUnique({
    where: { id: String(dynamicId) }, // Força a conversão para string, garantindo a tipagem do Prisma
    include: { participants: true },
  });

  if (!group) notFound();

  // Verificação de Segurança
  const isLocked = !!group.adminPassword;
  const cookieStore = await cookies(); // No Next 15+, cookies() também precisa de await
  const hasAuthCookie = cookieStore.has(`admin_session_${group.id}`);

  // Se tem senha e não tem cookie, mostra o formulário de login
  if (isLocked && !hasAuthCookie) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <AdminLoginForm groupId={group.id} />
      </main>
    );
  }

  // --- DASHBOARD DO ADMIN ---
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
              <ArrowLeft className="w-4 h-4" /> Voltar para o grupo
            </Link>
            <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-900">
              <ShieldAlert className="w-8 h-8 text-blue-600" />
              Painel Admin
            </h1>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Status do Grupo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Status dos Participantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100">
                <Users className="w-8 h-8" />
                <div>
                  <p className="font-bold text-2xl">
                    {claimedCount}{" "}
                    <span className="text-sm font-normal">de</span> {totalCount}
                  </p>
                  <p className="text-sm">
                    participantes já acessaram e viram quem tiraram.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Zona de Perigo */}
          <Card className="border-red-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-red-600">
                Zona de Perigo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Se alguém escreveu o nome errado ou se você precisa recomeçar o
                sorteio, a única forma é excluindo este grupo e criando um novo.
                Esta ação é irreversível.
              </p>
              <DeleteGroupButton groupId={group.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
