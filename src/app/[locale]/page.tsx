import Hero from "@/components/Hero";
import StepsSection from "@/components/StepsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import { setRequestLocale } from "next-intl/server";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="grow flex flex-col font-sans">
      <Hero />
      <StepsSection />
      <TestimonialsSection />
      <FaqSection />
    </main>
  );
}
