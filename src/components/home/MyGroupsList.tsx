"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

type SavedGroup = { id: string; name: string; role: string; createdAt: string };

interface MyGroupsListProps {
  hideOnEmpty?: boolean;
}

export function MyGroupsList({ hideOnEmpty = false }: MyGroupsListProps) {
  const [groups, setGroups] = useState<SavedGroup[] | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = localStorage.getItem("@amigo-secreto:my-groups");
      if (stored) {
        try {
          setGroups(JSON.parse(stored) as SavedGroup[]);
        } catch (error) {
          console.error("Erro ao ler meus-grupos do localStorage:", error);
          setGroups([]);
        }
      } else {
        setGroups([]);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // 1. Enquanto hidrata, não renderiza nada
  if (!groups) return null;

  // 2. Comportamento se a lista estiver vazia
  if (groups.length === 0) {
    if (hideOnEmpty) return null; // Na Home, fica invisível

    // Na página /groups, mostra isso:
    return (
      <div className="text-center py-16 px-4 border-2 border-dashed rounded-2xl border-gray-200 bg-gray-50/50">
        <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Nenhum grupo por aqui
        </h3>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Você ainda não criou ou participou de nenhum amigo secreto usando este
          dispositivo. Que tal começar agora?
        </p>
        <Link href="/groups/new">
          <Button size="lg" className="rounded-full px-8">
            Criar meu primeiro grupo
          </Button>
        </Link>
      </div>
    );
  }

  // 3. Renderiza a lista se houver grupos
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {groups.map((group) => (
          <Link key={group.id} href={`/groups/${group.id}`}>
            <Card className="hover:border-blue-600 hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                      {group.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Entrar como{" "}
                      {group.role === "admin"
                        ? "Administrador"
                        : "Participante"}
                    </p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors w-6 h-6" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
