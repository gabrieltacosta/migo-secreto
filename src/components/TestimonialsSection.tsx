import { Card, CardContent } from "./ui/card";

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white via-pink-50/50 to-white relative overflow-hidden">
      {/* Bolhas de cor borradas ao fundo para replicar a imagem */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <h3 className="text-blue-600 font-medium mb-2 uppercase tracking-wide text-sm">
          Testemunhos
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-gray-900">
          Veja o que estão falando sobre o Amigo Secreto
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {/* Cards de Depoimento - Simulados */}
          {[
            {
              t: "Muito fácil de usar, simples, sorteio deu super certo.",
              n: "Maíra P.",
            },
            {
              t: "Achei super prático e ótimo para usar no amigo oculto corporativo.",
              n: "Claudio B.",
            },
            {
              t: "Melhor site de sorteio de amigo secreto!",
              n: "Guilherme T.",
            },
            {
              t: "Só cadastrar detalhes e não precisa de e-mail. Muito prático.",
              n: "Thiago S.",
            },
            {
              t: "Funcionalidade 100%! O único que consegui usar para sortear no WhatsApp",
              n: "Juliana F.",
            },
            {
              t: "Ótimo, até mesmo as pessoas mais velhas da minha família conseguiram usar.",
              n: "Yumi M.",
            },
          ].map((dep, i) => (
            <Card
              key={i}
              className="border-0 shadow-sm bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6 space-y-4">
                <p className="text-gray-600 text-sm">&quot;{dep.t}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-pink-400"></div>
                  <span className="text-sm font-bold text-gray-900">
                    {dep.n}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
