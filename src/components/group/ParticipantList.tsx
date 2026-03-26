"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock, Unlock, Loader2, X } from "lucide-react";
import { authenticateParticipant } from "@/actions/participant.actions";

type ParticipantInfo = { id: string; name: string; isClaimed: boolean };

export function ParticipantList({
  participants,
  groupId,
}: {
  participants: ParticipantInfo[];
  groupId: string;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<ParticipantInfo | null>(null);

  // Estados do formulário
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setSelected(null);
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 4) {
      setError("A senha deve ter pelo menos 4 caracteres.");
      return;
    }

    setIsLoading(true);
    setError("");

    // Dispara a Action no servidor
    const response = await authenticateParticipant(
      selected!.id,
      groupId,
      password,
      !selected!.isClaimed, // Se não tem dono, está reivindicando
    );

    if (response.success) {
      // Se deu certo, redireciona para o Dashboard individual dele!
      router.push(`/groups/${groupId}/participant/${selected!.id}`);
    } else {
      setError(response.error || "Ocorreu um erro.");
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {/* ... [O código dos Cards de participantes continua igual ao anterior] ... */}
      {participants.map((participant) => (
        <Card
          key={participant.id}
          className={`relative overflow-hidden cursor-pointer transition-all active:scale-95 sm:active:scale-100 hover:shadow-md ${participant.isClaimed ? "bg-white border-gray-200" : "bg-white border-primary/20 hover:border-primary"}`}
          onClick={() => setSelected(participant)}
        >
          <div className="p-4 flex items-center justify-between">
            <span className="font-medium text-lg text-gray-800">
              {participant.name}
            </span>
            {participant.isClaimed ? (
              <div className="flex items-center gap-2 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                <Lock className="w-3 h-3" />
                <span>Bloqueado</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <Unlock className="w-3 h-3" />
                <span>Disponível</span>
              </div>
            )}
          </div>
        </Card>
      ))}

      {/* O Modal Interativo Mobile-First */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-6 pb-10 sm:pb-6 shadow-2xl animate-in slide-in-from-bottom-1/2 sm:slide-in-from-bottom-0 sm:zoom-in-95">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Olá, {selected.name}!
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {selected.isClaimed
                    ? "Digite sua senha para entrar."
                    : "Crie uma senha de 4 dígitos ou mais."}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  inputMode="text" // Mantém o teclado normal no celular, dando liberdade
                  placeholder="Sua senha secreta"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`h-14 text-lg bg-gray-50 ${error ? "border-red-500" : ""}`}
                  autoFocus
                />
                {error && (
                  <p className="text-sm text-red-500 mt-2 font-medium">
                    {error}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-14 text-lg font-semibold rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  "Acessar Sorteio"
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
