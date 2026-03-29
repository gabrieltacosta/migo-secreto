"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { deleteGroupAction } from "@/actions/admin.actions";
import { useTranslations } from "next-intl";

export function DeleteGroupButton({ groupId }: { groupId: string }) {
  const t = useTranslations("Admin");
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmStep, setConfirmStep] = useState(false);

  const handleDelete = async () => {
    if (!confirmStep) {
      setConfirmStep(true);
      return;
    }
    setIsDeleting(true);
    await deleteGroupAction(groupId);
  };

  return (
    <Button
      variant={confirmStep ? "destructive" : "outline"}
      className="w-full sm:w-auto font-semibold"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> {t("deleting")}
        </>
      ) : confirmStep ? (
        t("confirm")
      ) : (
        <>
          <Trash2 className="w-4 h-4 mr-2 text-red-600" /> {t("deleteBtn")}
        </>
      )}
    </Button>
  );
}
