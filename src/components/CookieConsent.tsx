"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export default function CookieConsent() {
    const t = useTranslations("CookieBanner");
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Envelopar em um agendamento assíncrono resolve o erro de render síncrono em cascata
        const timeoutId = setTimeout(() => {
            setMounted(true);

            const consent = localStorage.getItem("cookie_consent");
            if (!consent) {
                setIsVisible(true);
            }
        }, 0);

        return () => clearTimeout(timeoutId);
    }, []);

    const handleAccept = (type: "all" | "essential") => {
        localStorage.setItem("cookie_consent", type);
        setIsVisible(false);

        if (type === "all") {
            window.dispatchEvent(new Event("consent_granted"));
        }
    };

    // Retorna null se não estiver montado no cliente ou se o consentimento já existir
    if (!mounted || !isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-in fade-in duration-300">
            <div className="relative mx-auto max-w-4xl rounded-xl border border-gray-800 bg-gray-950 p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

                <Button
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsVisible(false)}
                    aria-label="Fechar"
                >
                    <X className="w-4 h-4" />
                </Button>

                <div className="flex-1 space-y-2 mt-2 md:mt-0">
                    <h3 className="text-lg font-semibold text-white">
                        {t("title")}
                    </h3>

                    <p className="text-sm text-gray-400 leading-relaxed">
                        {t.rich("description", {
                            privacyLink: (chunks) => (
                                <Link href="/privacy" className="text-blue-400 underline hover:text-blue-300 transition-colors">
                                    {chunks}
                                </Link>
                            ),
                            termsLink: (chunks) => (
                                <Link href="/terms" className="text-blue-400 underline hover:text-blue-300 transition-colors">
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                    <Button
                        onClick={() => handleAccept("essential")}
                        variant="outline"
                        className="rounded-lg border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                        {t("btn_essential")}
                    </Button>
                    <Button
                        onClick={() => handleAccept("all")}
                        className="rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                        {t("btn_all")}
                    </Button>
                </div>
            </div>
        </div>
    );
}