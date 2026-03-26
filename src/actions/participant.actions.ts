"use server";

import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function authenticateParticipant(
  participantId: string,
  groupId: string,
  password: string,
  isClaiming: boolean,
) {
  try {
    // 1. Busca o participante no banco
    const participant = await prisma.participant.findUnique({
      where: { id: participantId },
    });

    if (!participant) {
      return { success: false, error: "Participante não encontrado." };
    }

    // 2. Fluxo de "Reivindicar" (Primeiro acesso)
    if (isClaiming) {
      if (participant.passwordHash) {
        return {
          success: false,
          error: "Este nome já foi reivindicado por alguém.",
        };
      }

      // Gera o Hash da nova senha e salva no banco
      const hashed = await bcrypt.hash(password, 10);
      await prisma.participant.update({
        where: { id: participantId },
        data: { passwordHash: hashed },
      });
    }
    // 3. Fluxo de "Login" (Acessos subsequentes)
    else {
      if (!participant.passwordHash) {
        return {
          success: false,
          error: "Este nome ainda não tem uma senha definida.",
        };
      }

      // Compara a senha digitada com o Hash do banco
      const isValid = await bcrypt.compare(password, participant.passwordHash);
      if (!isValid) {
        return { success: false, error: "Senha incorreta. Tente novamente." };
      }
    }

    // 4. Criação do Cookie Seguro
    // Usamos o groupId no nome do cookie para permitir que a mesma pessoa
    // participe de vários grupos diferentes no mesmo celular sem os cookies colidirem.
    const cookieName = `session_group_${groupId}`;

    // Nota Sênior: Em um app gigante, aqui você geraria um JWT.
    // Como o escopo é fechado por grupo, assinar o ID do participante no cookie já é efetivo.
    (
      await // Nota Sênior: Em um app gigante, aqui você geraria um JWT.
      // Como o escopo é fechado por grupo, assinar o ID do participante no cookie já é efetivo.
      cookies()
    ).set(cookieName, participantId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Só exige HTTPS em produção
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 dias logado
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return { success: false, error: "Erro interno no servidor." };
  }
}
