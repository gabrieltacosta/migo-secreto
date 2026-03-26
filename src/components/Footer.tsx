import { Gift } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-400 py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-blue-600 p-1.5 rounded-md">
              <Gift className="w-5 h-5" />
            </div>
            <span className="font-bold">Amigo Secreto</span>
          </div>
          <p className="text-xs">Amigo Secreto - Amigo Secreto Online</p>
          <div className="flex gap-2 text-xs font-medium uppercase mt-4">
            <span className="text-white">BR</span> <span>US</span>{" "}
            <span>ES</span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Navegação</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/amigo-secreto-whatsapp"
                className="hover:text-blue-400"
              >
                Amigo Secreto no WhatsApp
              </Link>
            </li>
            <li>
              <Link href="/groups/new" className="hover:text-blue-400">
                Criar Amigo Secreto
              </Link>
            </li>
            <li>
              <Link href="/groups" className="hover:text-blue-400">
                Meus Grupos
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="mailto:contato@amigosecretosimples.com"
                className="hover:text-blue-400"
                target="_blank"
              >
                Entre em contato
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-blue-400">
                Privacidade
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Categorias</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/amigo-chocolate" className="hover:text-blue-400">
                Amigo Chocolate
              </Link>
            </li>
            <li>
              <Link href="/amigo-pascoa" className="hover:text-blue-400">
                Amigo Páscoa
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-xs text-center md:text-left">
        © 2026 Amigo Secreto. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
