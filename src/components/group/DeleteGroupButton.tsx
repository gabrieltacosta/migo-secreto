"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { deleteGroupAction } from "@/actions/admin.actions";

export function DeleteGroupButton({ groupId }: { groupId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmStep, setConfirmStep] = useState(false);

  const handleDelete = async () => {
    if (!confirmStep) {
      setConfirmStep(true);
      return;
    }

    setIsDeleting(true);
    await deleteGroupAction(groupId);
    // Se der erro, a Action retorna, mas se der certo ela faz o redirect() direto pro /groups
  };

  return (
    <Button
      variant={confirmStep ? "destructive" : "outline"}
      className="w-full sm:w-auto font-semibold"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Excluindo...
        </>
      ) : confirmStep ? (
        "Tem certeza? Clique novamente para excluir"
      ) : (
        <>
          <Trash2 className="w-4 h-4 mr-2 text-red-600" /> Excluir Sorteio
          Definitivamente
        </>
      )}
    </Button>
  );
}
