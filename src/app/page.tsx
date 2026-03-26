import Hero from "@/components/Hero";
import StepsSection from "@/components/StepsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";

export const metadata = {
  title: "Amigo Secreto | Amigo Secreto Online em 3 passos",
  description:
    "Organize seu Amigo Secreto online. Não é necessário cadastro, nem telefone, nem e-mail.",
  openGraph: {
    title: "Sorteio de Amigo Secreto Online",
    description:
      "Crie seu grupo, adicione os amigos e gere o link. Simples, rápido e pelo WhatsApp.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="flex-grow flex flex-col font-sans">
      <Hero />
      <StepsSection />
      <TestimonialsSection />
      <FaqSection />
    </main>
  );
}
