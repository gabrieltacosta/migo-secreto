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

// Extraímos do schema principal apenas os campos desta etapa
const step3Schema = createGroupSchema.pick({ adminName: true, adminPassword: true });
type Step3Input = z.infer<typeof step3Schema>;

export function Step3Admin() {
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
    setStep(4); // Avança para a última tela (Revisão e Sorteio)
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-md border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle>Segurança do Grupo</CardTitle>
        <CardDescription>
          Identifique-se como organizador e crie uma senha para gerenciar este sorteio no futuro.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Seu Nome (Organizador)</label>
            <Input 
              {...register('adminName')} 
              placeholder="Ex: João (Organizador)" 
              className={`h-12 ${errors.adminName ? 'border-red-500' : ''}`}
            />
            {errors.adminName && <p className="text-sm text-red-500">{errors.adminName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Senha do Grupo (Opcional)</label>
            <Input 
              type="password"
              {...register('adminPassword')} 
              placeholder="Crie uma senha de acesso" 
              className={`h-12 ${errors.adminPassword ? 'border-red-500' : ''}`}
            />
            {errors.adminPassword && <p className="text-sm text-red-500">{errors.adminPassword.message}</p>}
            
            <div className="flex items-start gap-2 mt-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border">
              <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p>
                Como não usamos e-mail, essa senha será a única forma de você (como administrador) excluir o grupo ou gerenciar participantes depois que a aba for fechada.
              </p>
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t gap-4">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full sm:w-auto h-12"
              onClick={() => setStep(2)} // Volta para a tela de participantes
            >
              Voltar
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-auto h-12"
            >
              Ir para Revisão
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}