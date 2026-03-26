import { z } from "zod";

// Categorias predefinidas baseadas nos exemplos
export const GROUP_CATEGORIES = [
  "Amigo Secreto Tradicional",
  "Amigo Chocolate",
  "Amigo Oculto",
  "Amigo Ladrão",
  "Inimigo Secreto",
] as const;

// Schema para um participante individual
export const participantSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(50),
});

// Schema completo para a criação do grupo no frontend
export const createGroupSchema = z.object({
  // Passo 1: Info Básica
  name: z.string().min(3, "O nome do grupo deve ter pelo menos 3 caracteres").max(100),
  category: z.enum(GROUP_CATEGORIES, {
    errorMap: () => ({ message: "Por favor, selecione uma categoria válida" }),
  }),
  description: z.string().max(300).optional(),
  
  // Passo 2: Participantes
  participants: z.array(participantSchema).min(3, "Adicione pelo menos 3 participantes para o sorteio"),
  
  // Passo 3: Admin e Senha (Opcional conforme exemplo)
  adminName: z.string().min(2, "Seu nome é necessário").max(50),
  adminPassword: z.string().min(4, "A senha deve ter pelo menos 4 caracteres").or(z.literal("")), // Permite string vazia se for opcional
});

// Tipos derivados dos schemas
export type ParticipantInput = z.infer<typeof participantSchema>;
export type CreateGroupInput = z.infer<typeof createGroupSchema>;