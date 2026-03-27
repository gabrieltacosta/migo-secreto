"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateGroupStore } from "@/store/useCreateGroupStore";
import { createGroupAndDraw } from "@/actions/group.actions";
import { CreateGroupInput } from "@/schemas/groupSchemas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, CheckCircle2 } from "lucide-react";

export function Step4Review() {
  const router = useRouter();
  const { formData, setStep, reset } = useCreateGroupStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateGroup = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Dispara a Server Action passando os dados do Zustand
      const response = await createGroupAndDraw(formData as CreateGroupInput);

      if (!response.success || !response.groupId) {
        throw new Error(
          response.error || "Erro desconhecido ao criar o grupo.",
        );
      }

      // 2. Salva o acesso de 'Admin' no localStorage para a página "Meus Grupos"
      saveToLocalStorage(response.groupId, formData.name as string);

      // 3. Limpa o Zustand para não vazar dados se ele for criar outro grupo depois
      reset();

      // 4. Redireciona o usuário para a página do grupo recém-criado
      router.push(`/groups/${response.groupId}`);
    } catch (err) {
      console.error(err);
      setError("Falha na comunicação com o servidor.");
      setIsSubmitting(false);
    }
  };

  // Helper para salvar o grupo no localStorage
  const saveToLocalStorage = (groupId: string, groupName: string) => {
    const storageKey = "@amigo-secreto:my-groups";
    const existingGroups = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const newGroup = {
      id: groupId,
      name: groupName,
      role: "admin", // Ele é o criador, logo é admin
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      storageKey,
      JSON.stringify([...existingGroups, newGroup]),
    );
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Tudo pronto!</CardTitle>
        <CardDescription>
          Revise os dados antes de sortear os nomes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-secondary/30 p-4 rounded-lg space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Nome do Grupo:</span>
            <span className="font-semibold">{formData.name}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Ocasião:</span>
            <span className="font-semibold">{formData.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Participantes:</span>
            <span className="font-semibold">
              {formData.participants?.length} pessoas
            </span>
          </div>
        </div>

        <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-start gap-3 border border-green-200">
          <CheckCircle2 className="h-5 w-5 mt-0.5" />
          <p className="text-sm">
            Após clicar em &quot;Realizar Sorteio&quot;, os nomes serão
            embaralhados de forma segura e o link do grupo será gerado para você
            compartilhar no WhatsApp!
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-500 font-medium text-center">
            {error}
          </p>
        )}

        <div className="flex justify-between pt-4 border-t gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(3)} // Volta para o passo da senha
            disabled={isSubmitting}
          >
            Voltar e Editar
          </Button>

          <Button
            onClick={handleCreateGroup}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sorteando...
              </>
            ) : (
              "Realizar Sorteio Mágico"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
