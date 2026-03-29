"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing"; // <-- Alterado
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl"; // <-- Alterado

type SavedGroup = { id: string; name: string; role: string; createdAt: string };

export function MyGroupsList({
  hideOnEmpty = false,
}: {
  hideOnEmpty?: boolean;
}) {
  const [groups, setGroups] = useState<SavedGroup[] | null>(null);
  const t = useTranslations("MyGroupsList");

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = localStorage.getItem("@amigo-secreto:my-groups");
      if (stored) {
        try {
          setGroups(JSON.parse(stored) as SavedGroup[]);
        } catch {
          setGroups([]);
        }
      } else {
        setGroups([]);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!groups) return null;

  if (groups.length === 0) {
    if (hideOnEmpty) return null;
    return (
      <div className="text-center py-16 px-4 border-2 border-dashed rounded-2xl border-gray-200 bg-gray-50/50">
        <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {t("emptyTitle")}
        </h3>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">{t("emptyDesc")}</p>
        <Link href="/groups/new">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 rounded-full px-8"
          >
            {t("createBtn")}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {groups.map((group) => (
          <Link key={group.id} href={`/groups/${group.id}`}>
            <Card className="hover:border-blue-600 hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                      {group.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t("enterAs")}{" "}
                      {group.role === "admin" ? t("admin") : t("participant")}
                    </p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors w-6 h-6" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
