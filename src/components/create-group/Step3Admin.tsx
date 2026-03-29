'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateGroupStore } from '@/store/useCreateGroupStore';
import { createGroupSchema } from '@/schemas/groupSchemas';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldAlert } from 'lucide-react';
import { useTranslations } from "next-intl";

const step3Schema = createGroupSchema.pick({ adminName: true, adminPassword: true });
type Step3Input = z.infer<typeof step3Schema>;

export function Step3Admin() {
  const t = useTranslations("Step3");
  const { formData, updateFormData, setStep } = useCreateGroupStore();

  const { register, handleSubmit, formState: { errors } } = useForm<Step3Input>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      adminName: formData.adminName || '',
      adminPassword: formData.adminPassword || '',
    }
  });

  const onSubmit = (data: Step3Input) => {
    updateFormData(data);
    setStep(4); 
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-md border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("nameLabel")}</label>
            <Input {...register('adminName')} placeholder={t("namePlaceholder")} className={`h-12 ${errors.adminName ? 'border-red-500' : ''}`} />
            {errors.adminName && <p className="text-sm text-red-500">{errors.adminName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("pwdLabel")}</label>
            <Input type="password" {...register('adminPassword')} placeholder={t("pwdPlaceholder")} className={`h-12 ${errors.adminPassword ? 'border-red-500' : ''}`} />
            {errors.adminPassword && <p className="text-sm text-red-500">{errors.adminPassword.message}</p>}
            
            <div className="flex items-start gap-2 mt-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border">
              <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p>{t("warning")}</p>
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t gap-4">
            <Button type="button" variant="outline" onClick={() => setStep(2)}>{t("backBtn")}</Button>
            <Button type="submit">{t("nextBtn")}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}