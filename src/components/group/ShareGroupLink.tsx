"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl"; // <-- Importe o hook

interface ShareGroupLinkProps {
  groupId: string;
}

export function ShareGroupLink({ groupId }: ShareGroupLinkProps) {
  const t = useTranslations("ShareGroupLink");
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`${window.location.origin}/groups/${groupId}`);
  }, [groupId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(`${t("whatsappMsg")} ${url}`);
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  if (!url) return null;

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-8 animate-in fade-in duration-500">
      <p className="text-sm font-semibold text-gray-700 mb-3">{t("title")}</p>

      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 mb-4 break-all">
        <span className="text-sm text-gray-600 font-medium">{url}</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleCopy}
          variant="outline"
          className="flex-1 h-12 text-sm p-2 font-semibold"
        >
          {copied ? (
            <span className="flex items-center text-green-600">
              <Check className="w-4 h-4 mr-2" /> {t("copied")}
            </span>
          ) : (
            <span className="flex items-center text-gray-700">
              <Copy className="w-4 h-4 mr-2" /> {t("copyBtn")}
            </span>
          )}
        </Button>

        <Button
          onClick={handleWhatsAppShare}
          className="flex-1 h-12 text-sm p-2 font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-white transition-colors"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          {t("whatsappBtn")}
        </Button>
      </div>
    </div>
  );
}
