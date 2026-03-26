"use client";

import { GROUP_CATEGORIES } from "@/schemas/groupSchemas";
import { useState } from "react";
// Assumindo shadcn/ui components basicos instalados
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";

interface CategorySelectorProps {
  value?: string;
  onChange: (category: string) => void;
  error?: string;
}

export function CategorySelector({
  value,
  onChange,
  error,
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (category: string) => {
    onChange(category);
    setOpen(false); // Fecha o modal após selecionar
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Ocasião do sorteio</label>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button
              variant="outline"
              className={`w-full justify-between h-12 text-left font-normal ${error ? "border-red-500" : ""}`}
            />
          }
        >
          {value || "Selecione o tipo de amigo secreto"}
          <ChevronRight className="ml-2 h-4 w-4 opacity-50" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Qual é a ocasião do sorteio?</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            {GROUP_CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={value === category ? "default" : "outline"}
                className="justify-start h-12"
                onClick={() => handleSelect(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
