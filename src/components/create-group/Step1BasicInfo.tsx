"use client";

import { useForm, Controller } from "react-hook-form"; // <-- Importe o Controller
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateGroupStore } from "@/store/useCreateGroupStore";
import { createGroupSchema } from "@/schemas/groupSchemas";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategorySelector } from "./CategorySelector";

const step1Schema = createGroupSchema.pick({
  name: true,
  category: true,
  description: true,
});
type Step1Input = z.infer<typeof step1Schema>;

export function Step1BasicInfo() {
  const { formData, updateFormData, setStep } = useCreateGroupStore();

  // Substitua o watch e setValue pelo control
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step1Input>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: formData.name || "",
      category: formData.category,
      description: formData.description || "",
    },
  });

  const onSubmit = (data: Step1Input) => {
    updateFormData(data);
    setStep(2);
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle>Detalhes do Sorteio</CardTitle>
        <CardDescription>
          Vamos começar dando um nome e escolhendo o tipo da brincadeira.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome do Grupo</label>
            <Input
              {...register("name")}
              placeholder="Ex: Família Silva 2026, Turma da Firma"
              className={`h-12 ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* O Pulo do Gato: Envelopamos o CategorySelector no Controller */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <CategorySelector
                value={field.value}
                onChange={field.onChange} // O Controller gerencia o setValue automaticamente aqui
                error={errors.category?.message}
              />
            )}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Regras ou Descrição (Opcional)
            </label>
            <Textarea
              {...register("description")}
              placeholder="Ex: Valor mínimo do presente é R$ 50,00. A revelação será dia 24/12."
              className="resize-none h-24"
            />
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button type="submit" className="w-full sm:w-auto">
              Próximo Passo
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
