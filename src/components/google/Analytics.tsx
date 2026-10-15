"use client";

import { useState, useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function Analytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // 1. Verifica se o usuário JÁ tinha aceitado em visitas anteriores
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "all") {
      setHasConsent(true);
    }

    // 2. Fica escutando caso o usuário clique no botão de aceitar AGORA
    const handleConsent = () => setHasConsent(true);
    window.addEventListener("consent_granted", handleConsent);

    // Limpeza do evento
    return () => window.removeEventListener("consent_granted", handleConsent);
  }, []);

  // Se não tem consentimento, retorna null (não carrega NADA)
  if (!hasConsent) return null;

  // Se tem consentimento, injeta os scripts do Google Analytics (ou Meta Pixel, etc.)
  return (
    <GoogleAnalytics gaId="G-QSNGHRJFJJ" />
  );
}
