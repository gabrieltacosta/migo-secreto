import { Mail, Plus, Share2 } from "lucide-react";
import Link from "next/link";

const StepsSection = () => {
  return (
    <section className="bg-[#0f172a] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-blue-400 font-medium mb-2 uppercase tracking-wide text-sm">
          Fácil de usar
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Sorteio de Amigo Secreto em 3 passos
        </h2>
        <p className="text-gray-400 mb-16">
          Chega de estresse ao tentar organizar sorteios
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold">Criar o grupo</h4>
            <p className="text-gray-400 text-sm">
              Para criar o grupo, basta escolher um nome e descrição. Não é
              necessário e-mail e nem telefone.
            </p>
            <Link
              href="/groups/new"
              className="text-blue-400 text-sm font-medium hover:underline inline-block mt-2"
            >
              Criar grupo →
            </Link>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center">
              <Share2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold">Compartilhar o link</h4>
            <p className="text-gray-400 text-sm">
              Ao criar o grupo, você receberá um link. O link deve ser
              compartilhado com os participantes, pode ser por WhatsApp.
            </p>
            <Link
              href="/groups/new"
              className="text-blue-400 text-sm font-medium hover:underline inline-block mt-2"
            >
              Criar grupo →
            </Link>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold">Revelar amigo</h4>
            <p className="text-gray-400 text-sm">
              Cada participante deve entrar no link, clicar em seu nome e
              escolher uma senha para revelar seu amigo secreto.
            </p>
            <Link
              href="/groups/new"
              className="text-blue-400 text-sm font-medium hover:underline inline-block mt-2"
            >
              Criar grupo →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
