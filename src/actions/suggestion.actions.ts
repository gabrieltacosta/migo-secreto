"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateGiftSuggestion(
  participantId: string,
  suggestion: string,
  pathToRevalidate: string,
) {
  try {
    await prisma.participant.update({
      where: { id: participantId },
      data: { giftSuggestion: suggestion },
    });

    // Avisa o Next.js para limpar o cache da página, assim a alteração aparece na hora
    revalidatePath(pathToRevalidate);
    return { success: true };
  } catch {
    return { success: false, error: "Falha ao salvar a dica." };
  }
}
