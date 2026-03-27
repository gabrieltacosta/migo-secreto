"use server";

import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function loginAdmin(groupId: string, password: string) {
  try {
    const group = await prisma.group.findUnique({ where: { id: groupId } });

    if (!group || !group.adminPassword) {
      return {
        success: false,
        error: "Grupo não encontrado ou não possui senha de admin.",
      };
    }

    const isValid = await bcrypt.compare(password, group.adminPassword);
    if (!isValid) {
      return { success: false, error: "Senha incorreta." };
    }

    // Cria um cookie exclusivo para a sessão de administrador deste grupo
    (await cookies()).set(`admin_session_${groupId}`, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 dia logado como admin
    });

    return { success: true };
  } catch {
    return { success: false, error: "Erro interno no servidor." };
  }
}

export async function deleteGroupAction(groupId: string) {
  try {
    const group = await prisma.group.findUnique({ where: { id: groupId } });
    if (!group) return { success: false, error: "Grupo não encontrado." };

    // Validação de Segurança: Se tem senha no banco, OBRIGATORIAMENTE tem que ter o cookie
    if (group.adminPassword) {
      const hasCookie = (await cookies()).get(`admin_session_${groupId}`);
      if (!hasCookie)
        return { success: false, error: "Acesso negado. Faça login." };
    }

    // Exclui o grupo (O Prisma apagará os participantes em cascata por causa do onDelete: Cascade no schema)
    await prisma.group.delete({ where: { id: groupId } });
  } catch {
    return { success: false, error: "Falha ao excluir o grupo." };
  }

  // O redirect precisa ficar fora do bloco try/catch no Next.js App Router
  redirect("/groups");
}
