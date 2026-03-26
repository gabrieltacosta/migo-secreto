'use server'

import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createGroupSchema, CreateGroupInput } from '@/schemas/groupSchemas';


export async function createGroupAndDraw(data: CreateGroupInput) {
  try {
    // 1. Validação estrita no servidor (Segurança)
    const validatedData = createGroupSchema.parse(data);

    // 2. Hash da Senha de Admin (se fornecida)
    let hashedAdminPassword = null;
    if (validatedData.adminPassword && validatedData.adminPassword.trim() !== '') {
      hashedAdminPassword = await bcrypt.hash(validatedData.adminPassword, 10);
    }

    // 3. Preparação dos Participantes (Gerando UUIDs antecipadamente)
    // Precisamos dos IDs antes de salvar no banco para poder mapear "quem tirou quem"
    const participantsToDraw = validatedData.participants.map(p => ({
      id: randomUUID(),
      name: p.name,
      drawnId: '', // Será preenchido no algoritmo
    }));

    // 4. Algoritmo de Sorteio (Embaralhamento de Fisher-Yates + Ciclo Único)
    const shuffled = [...participantsToDraw];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Fechando o ciclo
    for (let i = 0; i < shuffled.length; i++) {
      const currentParticipant = shuffled[i];
      // O próximo pega o (índice + 1), e se for o último, volta pro índice 0
      const nextParticipant = shuffled[(i + 1) % shuffled.length]; 
      
      // Atualiza o participante original com o ID de quem ele tirou
      const originalIndex = participantsToDraw.findIndex(p => p.id === currentParticipant.id);
      participantsToDraw[originalIndex].drawnId = nextParticipant.id;
    }

    // 5. Inserção no Banco de Dados (Transação Única)
    // O Prisma permite criar o Grupo e os Participantes de uma só vez
    const group = await prisma.group.create({
      data: {
        name: validatedData.name,
        category: validatedData.category,
        description: validatedData.description,
        adminPassword: hashedAdminPassword,
        isDrawn: true, // Como sorteamos na criação, já nasce travado
        participants: {
          create: participantsToDraw.map(p => ({
            id: p.id,
            name: p.name,
            drawnId: p.drawnId
          }))
        }
      },
      select: {
        id: true // Retornamos apenas o ID do grupo para o frontend fazer o redirecionamento
      }
    });

    return { success: true, groupId: group.id };

  } catch (error) {
    console.error("Erro ao criar e sortear grupo:", error);
    return { success: false, error: "Ocorreu um erro inesperado ao processar o sorteio." };
  }
}