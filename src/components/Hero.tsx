import { HeroForm } from "./home/HeroForm";

const Hero = () => {
  return (
    <section className="px-6 py-12 md:py-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600 leading-tight">
          Amigo Secreto <br /> Online
        </h1>
        <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
          Organize seu Amigo Secreto online. Não é necessário cadastro, nem
          telefone, nem e-mail. Compartilhe o link do seu grupo para os
          participantes entrarem.
        </p>
        <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
          Preencha o formulário
          <span className="hidden lg:inline"> ao lado </span>
          <span className="lg:hidden"> abaixo </span>
          (Obs.: Não é necessário baixar o app. O site foi feito para funcionar
          bem no celular)
        </p>
      </div>

      {/* Formulário Dinâmico ao lado direito */}
      <div className="w-full max-w-md mx-auto lg:ml-auto">
        <HeroForm />
      </div>
    </section>
  );
};

export default Hero;
