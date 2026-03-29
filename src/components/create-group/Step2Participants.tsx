"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateGroupStore } from "@/store/useCreateGroupStore";
import { CreateGroupInput } from "@/schemas/groupSchemas";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Trash } from "lucide-react"; 
import { useTranslations } from "next-intl";

const addParticipantSchema = z.object({ newParticipantName: z.string().min(2, "Nome curto").max(50) });
type AddParticipantInput = z.infer<typeof addParticipantSchema>;

export function Step2Participants() {
  const t = useTranslations("Step2");
  const { formData, updateFormData, setStep } = useCreateGroupStore();

  const mainForm = useForm<Pick<CreateGroupInput, "participants">>({
    defaultValues: { participants: formData.participants || [] },
  });

  const { fields, append, remove } = useFieldArray({ control: mainForm.control, name: "participants" });

  const addForm = useForm<AddParticipantInput>({
    resolver: zodResolver(addParticipantSchema),
    defaultValues: { newParticipantName: "" },
  });

  const handleAddParticipant = (data: AddParticipantInput) => {
    append({ name: data.newParticipantName });
    addForm.reset();
    addForm.setFocus("newParticipantName"); 
  };

  const onSubmit = (data: Pick<CreateGroupInput, "participants">) => {
    if (data.participants.length < 3) {
      mainForm.setError("participants", { message: t("minError") });
      return;
    }
    updateFormData(data);
    setStep(3); 
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader><CardTitle>{t("title")}</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={addForm.handleSubmit(handleAddParticipant)} className="flex gap-2 items-start">
          <div className="grow">
            <Input
              {...addForm.register("newParticipantName")}
              placeholder={t("inputPlaceholder")}
              className={addForm.formState.errors.newParticipantName ? "border-red-500" : ""}
            />
            {addForm.formState.errors.newParticipantName && (
              <p className="text-sm text-red-500 mt-1">{addForm.formState.errors.newParticipantName.message}</p>
            )}
          </div>
          <Button type="submit" size="icon" variant="secondary" className="h-10 w-10"><UserPlus className="h-5 w-5" /></Button>
        </form>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">{t("listTitle")} ({fields.length})</h4>
          {fields.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">{t("emptyList")}</p>}
          <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {fields.map((field, index) => (
              <li key={field.id} className="flex justify-between items-center bg-secondary/50 p-3 rounded-md group">
                <span className="font-medium">{field.name}</span>
                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash className="h-4 w-4" /></Button>
              </li>
            ))}
          </ul>
          {mainForm.formState.errors.participants && (
            <p className="text-sm text-red-500 mt-2 text-center">{mainForm.formState.errors.participants.message}</p>
          )}
        </div>

        <div className="flex justify-between pt-4 border-t gap-4">
          <Button type="button" variant="outline" onClick={() => setStep(1)}>{t("backBtn")}</Button>
          <Button type="button" onClick={mainForm.handleSubmit(onSubmit)} disabled={fields.length < 3}>{t("nextBtn")}</Button>
        </div>
      </CardContent>
    </Card>
  );
}