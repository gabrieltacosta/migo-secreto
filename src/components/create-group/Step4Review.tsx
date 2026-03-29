"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing"; // <-- Importe do i18n
import { useCreateGroupStore } from "@/store/useCreateGroupStore";
import { createGroupAndDraw } from "@/actions/group.actions";
import { CreateGroupInput } from "@/schemas/groupSchemas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function Step4Review() {
  const router = useRouter();
  const t = useTranslations("Step4");
  const { formData, setStep, reset } = useCreateGroupStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateGroup = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await createGroupAndDraw(formData as CreateGroupInput);

      if (!response.success || !response.groupId) {
        throw new Error(response.error || t("errorUnknown"));
      }

      saveToLocalStorage(response.groupId, formData.name as string);
      router.push(`/groups/${response.groupId}`); // Preserva idioma automaticamente
      setTimeout(() => {
        reset();
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(t("errorServer"));
      setIsSubmitting(false);
    }
  };

  const saveToLocalStorage = (groupId: string, groupName: string) => {
    const storageKey = "@amigo-secreto:my-groups";
    const existingGroups = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const newGroup = {
      id: groupId,
      name: groupName,
      role: "admin",
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(
      storageKey,
      JSON.stringify([...existingGroups, newGroup]),
    );
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("desc")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-secondary/30 p-4 rounded-lg space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">{t("groupName")}</span>
            <span className="font-semibold">{formData.name}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">{t("category")}</span>
            <span className="font-semibold">{formData.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("participants")}</span>
            <span className="font-semibold">
              {formData.participants?.length} {t("people")}
            </span>
          </div>
        </div>

        <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-start gap-3 border border-green-200">
          <CheckCircle2 className="h-5 w-5 mt-0.5" />
          <p className="text-sm">{t("alert")}</p>
        </div>

        {error && (
          <p className="text-sm text-red-500 font-medium text-center">
            {error}
          </p>
        )}

        <div className="flex justify-between pt-4 border-t gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(3)}
            disabled={isSubmitting}
          >
            {t("backBtn")}
          </Button>
          <Button onClick={handleCreateGroup} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("drawing")}
              </>
            ) : (
              t("submitBtn")
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
