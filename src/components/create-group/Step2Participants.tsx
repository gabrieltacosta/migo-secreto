'use client'
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hook-form/resolvers/zod';
import { useCreateGroupStore } from '@/store/useCreateGroupStore';
import { participantSchema, CreateGroupInput } from '@/schemas/groupSchemas';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserAdd, Trash } from 'lucide-react'; // Assumindo bibliotecas de ícones

// Schema local apenas para este passo (validação do input de adição)
const addParticipantSchema = z.object({
  newParticipantName: z.string().min(2, "Nome curto").max(50),
});
type AddParticipantInput = z.infer<typeof addParticipantSchema>;


export function Step2Participants() {
  const { formData, updateFormData, setStep } = useCreateGroupStore();

  // 1. Configurar o formulário principal (que segura a lista final)
  const mainForm = useForm<Pick<CreateGroupInput, 'participants'>>({
    defaultValues: {
      participants: formData.participants || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: mainForm.control,
    name: 'participants',
  });

  // 2. Configurar o mini-formulário para adicionar um novo nome (Input de cima)
  const addForm = useForm<AddParticipantInput>({
    resolver: zodResolver(addParticipantSchema),
    defaultValues: { newParticipantName: '' }
  });

  const handleAddParticipant = (data: AddParticipantInput) => {
    append({ name: data.newParticipantName });
    addForm.reset(); // Limpa o input de adição
    addForm.setFocus('newParticipantName'); // Volta o foco para adicionar o próximo rápido
  };

  const onSubmit = (data: Pick<CreateGroupInput, 'participants'>) => {
    if (data.participants.length < 3) {
      mainForm.setError('participants', { message: 'Adicione pelo menos 3 pessoas.' });
      return;
    }
    updateFormData(data);
    setStep(3); // Vai para o passo da senha
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Passo 2: Quem vai participar?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Formulário de Adição */}
        <form onSubmit={addForm.handleSubmit(handleAddParticipant)} className="flex gap-2 items-start">
          <div className="flex-grow">
            <Input 
              {...addForm.register('newParticipantName')}
              placeholder="Nome do participante (ex: João)"
              className={addForm.formState.errors.newParticipantName ? 'border-red-500' : ''}
            />
            {addForm.formState.errors.newParticipantName && (
              <p className="text-sm text-red-500 mt-1">{addForm.formState.errors.newParticipantName.message}</p>
            )}
          </div>
          <Button type="submit" size="icon" variant="secondary" className="h-10 w-10">
            <UserAdd className="h-5 w-5" />
          </Button>
        </form>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Lista de Participantes ({fields.length})</h4>
          
          {fields.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">Nenhum participante adicionado ainda.</p>
          )}

          <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {fields.map((field, index) => (
              <li key={field.id} className="flex justify-between items-center bg-secondary/50 p-3 rounded-md group">
                <span className="font-medium">{field.name}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => remove(index)}
                  className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
           {mainForm.formState.errors.participants && (
              <p className="text-sm text-red-500 mt-2 text-center">{mainForm.formState.errors.participants.message}</p>
           )}
        </div>

        {/* Navegação Principal do Formulário */}
        <div className="flex justify-between pt-4 border-t gap-4">
          <Button type="button" variant="outline" onClick={() => setStep(1)}>
            Voltar
          </Button>
          {/* O botão "Sortear" só habilita se tiver o mínimo de participantes */}
          <Button type="button" onClick={mainForm.handleSubmit(onSubmit)} disabled={fields.length < 3}>
            Próximo Passo: Definir Senha
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}