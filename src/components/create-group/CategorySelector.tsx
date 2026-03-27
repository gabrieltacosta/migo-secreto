"use client";

import { CATEGORY_OPTIONS } from "@/schemas/groupSchemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySelectorProps {
  value?: string;
  onChange: (category: string | null) => void;
  error?: string;
}

export function CategorySelector({
  value,
  onChange,
  error,
}: CategorySelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Ocasião do sorteio</label>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={`w-full h-12 ${error ? "border-red-500 focus:ring-red-500" : ""}`}
        >
          {/* SelectValue cuida de mostrar o placeholder ou o item selecionado */}
          <SelectValue placeholder="Selecione o tipo de amigo secreto" />
        </SelectTrigger>

        <SelectContent>
          {CATEGORY_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <span>{option.value}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
