"use client";

import { useForm, Controller } from "react-hook-form";
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
import { useTranslations } from "next-intl";

const step1Schema = createGroupSchema.pick({
  name: true,
  category: true,
  description: true,
});
type Step1Input = z.infer<typeof step1Schema>;

export function Step1BasicInfo() {
  const t = useTranslations("Step1");
  const { formData, updateFormData, setStep } = useCreateGroupStore();

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
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("nameLabel")}</label>
            <Input
              {...register("name")}
              placeholder={t("namePlaceholder")}
              className={`h-12 ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

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

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("descLabel")}</label>
            <Textarea
              {...register("description")}
              placeholder={t("descPlaceholder")}
              className="resize-none h-24"
            />
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button type="submit" className="w-full sm:w-auto">
              {t("nextBtn")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
