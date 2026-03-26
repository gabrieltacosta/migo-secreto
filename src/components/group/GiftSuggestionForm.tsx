"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateGiftSuggestion } from "@/actions/suggestion.actions";
import { Loader2, CheckCircle2 } from "lucide-react";

export function GiftSuggestionForm({
  participantId,
  currentSuggestion,
}: {
  participantId: string;
  currentSuggestion: string;
}) {
  const pathname = usePathname(); // Pega a URL atual para o revalidatePath
  const [suggestion, setSuggestion] = useState(currentSuggestion);
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    setSaved(false);

    const result = await updateGiftSuggestion(
      participantId,
      suggestion,
      pathname,
    );

    if (result.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000); // Tira o aviso de sucesso após 3 seg
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">O que você quer ganhar?</CardTitle>
        <CardDescription>
          Deixe uma dica para quem tirou você (tamanhos, cores, lojas
          favoritas).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Ex: Calço 40, adoro livros de ficção, ou uma caneca bonita..."
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          className="min-h-[100px] resize-none"
        />

        <div className="flex justify-end items-center gap-4">
          {saved && (
            <span className="text-green-600 text-sm flex items-center gap-1 font-medium animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" /> Salvo!
            </span>
          )}
          <Button
            onClick={handleSave}
            disabled={isLoading || suggestion === currentSuggestion}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            {currentSuggestion && suggestion === currentSuggestion
              ? "Salvo"
              : "Salvar Dica"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
