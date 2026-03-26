"use client";

import Link from "next/link";
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

  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl w-full mx-auto">
      <div className="flex items-center gap-2">
        {/* Substitua por sua logo em public/logo.svg se tiver */}
        <Link href={"/"} className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl hidden sm:block">
            Amigo Secreto Simples
          </span>
        </Link>
      </div>
      <div className="hidden md:flex gap-8 font-medium text-gray-600">
        <Link href="/groups" className="hover:text-blue-600">
          Meus Grupos
        </Link>
        <Link href="/blog" className="hover:text-blue-600">
          Blog
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/groups/new">
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">
            Criar Grupo
          </Button>
        </Link>
        {isMobile && (
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4">
                <SheetClose>
                  <Link
                    href="/groups"
                    className="hover:text-blue-600 font-semibold text-base"
                  >
                    Meus Grupos
                  </Link>
                </SheetClose>
                <SheetClose>
                  <Link
                    href="/blog"
                    className="hover:text-blue-600 font-semibold text-base"
                  >
                    Blog
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
