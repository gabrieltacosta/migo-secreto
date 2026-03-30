import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SearchX, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <SearchX className="w-12 h-12 text-blue-600" />
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900">404</h1>
        <h2 className="text-2xl font-bold text-gray-800">{t("title")}</h2>

        <p className="text-gray-500 text-lg leading-relaxed pb-4">
          {t("desc")}
        </p>

        <Link href="/">
          <Button
            size="lg"
            className="h-14 px-8 text-lg rounded-full w-full sm:w-auto shadow-lg hover:scale-105 transition-transform"
          >
            <Home className="w-5 h-5 mr-2" />
            {t("backBtn")}
          </Button>
        </Link>
      </div>
    </main>
  );
}
