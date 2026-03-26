"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateGroupStore } from "@/store/useCreateGroupStore";
import { createGroupSchema } from "@/schemas/groupSchemas";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategorySelector } from "@/components/create-group/CategorySelector";

const step1Schema = createGroupSchema.pick({
  name: true,
  category: true,
  description: true,
});
type Step1Input = z.infer<typeof step1Schema>;

export function HeroForm() {
  const router = useRouter();
  const { updateFormData, setStep } = useCreateGroupStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step1Input>({
    resolver: zodResolver(step1Schema),
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = (data: Step1Input) => {
    // Salva os dados no Zustand
    updateFormData(data);
    // Pula o passo 1 da página /novo-grupo e vai direto para os participantes
    setStep(2);
    // Redireciona
    router.push("/groups/new");
  };

  return (
    <Card className="shadow-2xl border-0 ring-1 ring-gray-200">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <CategorySelector
                value={field.value}
                onChange={field.onChange}
                error={errors.category?.message}
              />
            )}
          />

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Nome do Grupo
            </label>
            <Input
              {...register("name")}
              placeholder="Ex: Família Silva, Amigos do Trabalho"
              className={`h-12 bg-gray-50 ${errors.name ? "border-red-500" : ""}`}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Descrição (Opcional)
            </label>
            <Textarea
              {...register("description")}
              placeholder="Ex: Valor mínimo R$ 50,00. Revelação dia 20/12."
              className="resize-none h-24 bg-gray-50"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700"
          >
            Criar amigo secreto
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
