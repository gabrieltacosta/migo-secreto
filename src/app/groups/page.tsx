import { MyGroupsList } from "@/components/home/MyGroupsList";
import { Users } from "lucide-react";

export const metadata = {
  title: "Meus Grupos | Amigo Secreto",
  description:
    "Acesse rapidamente todos os sorteios de Amigo Secreto que você gerencia ou participa.",
};

export default function GroupsPage() {
  return (
    <main className="grow flex flex-col font-sans bg-gray-50 min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto w-full px-6">
        {/* Cabeçalho da Página */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 flex items-center justify-center sm:justify-start gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            Meus Grupos
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Acesse rapidamente os sorteios que você criou ou está participando.
          </p>
        </div>

        {/* Lista de Grupos - Aqui não passamos hideOnEmpty, então ele mostra o Empty State se precisar */}
        <MyGroupsList />
      </div>
    </main>
  );
}
