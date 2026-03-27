import { z } from "zod";
import { Gift, Candy, User, VenetianMask as Mask, Skull } from "lucide-react"; // Importe os ícones desejados

// 1. Categorias apenas em texto para o Zod validar
export const GROUP_CATEGORIES = [
  "Amigo Secreto Tradicional",
  "Amigo Chocolate",
  "Amigo Oculto",
  "Amigo Ladrão",
  "Inimigo Secreto",
] as const;

// 2. Opções visuais para o Frontend (Texto + Ícone)
export const CATEGORY_OPTIONS = [
  { value: "Amigo Secreto Tradicional", icon: Gift },
  { value: "Amigo Chocolate", icon: Candy },
  { value: "Amigo Oculto", icon: User },
  { value: "Amigo Ladrão", icon: Mask },
  { value: "Inimigo Secreto", icon: Skull },
] as const;

export const participantSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(50),
});

export const createGroupSchema = z.object({
  name: z
    .string()
    .min(3, "O nome do grupo deve ter pelo menos 3 caracteres")
    .max(100),
  category: z.enum(GROUP_CATEGORIES, {
    message: "Por favor, selecione uma categoria válida",
  }),
  description: z.string().max(300).optional(),
  participants: z
    .array(participantSchema)
    .min(3, "Adicione pelo menos 3 participantes para o sorteio"),
  adminName: z.string().min(2, "Seu nome é necessário").max(50),
  adminPassword: z
    .string()
    .min(4, "A senha deve ter pelo menos 4 caracteres")
    .or(z.literal("")),
});

export type ParticipantInput = z.infer<typeof participantSchema>;
export type CreateGroupInput = z.infer<typeof createGroupSchema>;
