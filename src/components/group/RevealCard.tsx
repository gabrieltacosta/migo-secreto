"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Gift } from "lucide-react";
import { useTranslations } from "next-intl";

export function RevealCard({
  drawnName,
  drawnSuggestion,
}: {
  drawnName: string;
  drawnSuggestion: string | null;
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const t = useTranslations("RevealCard");

  return (
    <Card className="overflow-hidden border-2 border-primary/20 shadow-md">
      <CardContent className="p-6 md:p-8 text-center flex flex-col items-center justify-center min-h-62.5 relative">
        <h2 className="text-lg text-gray-500 font-medium mb-4">
          {t("overtitle")}
        </h2>

        {isRevealed ? (
          <div className="animate-in zoom-in duration-300">
            <h3 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">
              {drawnName}
            </h3>
            {drawnSuggestion ? (
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-left w-full max-w-sm">
                <div className="flex items-center gap-2 text-amber-800 font-semibold mb-2">
                  <Gift className="w-4 h-4" /> {t("giftTip")}
                </div>
                <p className="text-sm text-amber-900 italic">
                  &ldquo;{drawnSuggestion}&rdquo;
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">
                {drawnName} {t("noTip")}
              </p>
            )}
            <Button
              variant="ghost"
              className="mt-6 text-gray-400"
              onClick={() => setIsRevealed(false)}
            >
              <EyeOff className="w-4 h-4 mr-2" /> {t("hide")}
            </Button>
          </div>
        ) : (
          <Button
            size="lg"
            className="h-16 px-8 text-xl rounded-2xl w-full max-w-xs shadow-lg hover:scale-105 transition-transform"
            onClick={() => setIsRevealed(true)}
          >
            <Eye className="w-6 h-6 mr-2" /> {t("reveal")}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
