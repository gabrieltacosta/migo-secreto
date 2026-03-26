import { Metadata } from "next";
import { NewGroupForm } from "@/components/create-group/NewGroupForm";

export const metadata: Metadata = {
  title: "Novo Amigo Secreto no WhatsApp",
  description:
    "Crie seu grupo, adicione os amigos e gere o link. Simples, rápido e pelo WhatsApp.",
  openGraph: {
    title: "Novo Amigo Secreto no WhatsApp",
    description:
      "Crie seu grupo, adicione os amigos e gere o link. Simples, rápido e pelo WhatsApp.",
    type: "website",
  },
};

export default function NewGroupWhatsappPage() {


  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Novo Amigo Secreto no WhatsApp
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Crie seu grupo, adicione os amigos e gere o link. Simples, rápido e
          pelo WhatsApp.
        </p>

        {/* Barra de Progresso Simples */}
        <NewGroupForm />
      </div>
    </main>
  );
}
