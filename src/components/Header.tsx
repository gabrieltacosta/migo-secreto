"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Gift, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  const t = useTranslations("Header");

  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl w-full mx-auto">
      <div className="flex items-center gap-2">
        <Link href={"/"} className="flex items-center gap-2" aria-label="Home">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl hidden sm:block">
            {t("brand")}
          </span>
        </Link>
      </div>
      <div className="hidden md:flex gap-8 font-medium text-gray-600">
        <Link href="/groups" className="hover:text-blue-600">
          {t("myGroups")}
        </Link>
        <Link href="/blog" className="hover:text-blue-600">
          {t("blog")}
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/groups/new">
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">
            {t("createGroup")}
          </Button>
        </Link>
        {isMobile && (
          <Sheet>
            <SheetTrigger>
              <Menu aria-label="Menu" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{t("menu")}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4">
                <SheetClose>
                  <Link
                    href="/groups"
                    className="hover:text-blue-600 font-semibold text-base"
                  >
                    {t("myGroups")}
                  </Link>
                </SheetClose>
                <SheetClose>
                  <Link
                    href="/blog"
                    className="hover:text-blue-600 font-semibold text-base"
                  >
                    {t("blog")}
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </nav>
  );
};

export default Header;
