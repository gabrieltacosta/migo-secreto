"use client";

import { useState, useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function Analytics() {
    // 1. Inicialização inteligente: lê o localStorage antes do primeiro render do componente
    const [hasConsent, setHasConsent] = useState(() => {
        // Garante que o código está rodando no navegador (client-side) antes de acessar o localStorage
        if (typeof window !== "undefined") {
            return localStorage.getItem("cookie_consent") === "all";
        }
        return false;
    });

    useEffect(() => {
        // 2. O efeito agora cuida EXCLUSIVAMENTE de escutar o evento assíncrono do clique do botão
        const handleConsent = () => setHasConsent(true);
        window.addEventListener("consent_granted", handleConsent);

        return () => window.removeEventListener("consent_granted", handleConsent);
    }, []);

    if (!hasConsent) return null;

    return (
        <GoogleAnalytics gaId="G-QSNGHRJFJJ" />
    );
}