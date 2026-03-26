import Link from "next/link";

export const metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade - Amigo Secreto Simples",
};

const PrivacyPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
          Política de Privacidade
        </h1>

        <section className="mb-8 sm:mb-10">
          <p className="mb-4 text-sm sm:text-base leading-relaxed">
            A sua privacidade é importante para nós. É política do Amigo Secreto
            Simples respeitar a sua privacidade em relação a qualquer informação
            sua que possamos coletar no site Amigo Secreto Simples, e outros
            sites e apps que possuímos e operamos.
          </p>

          <p className="mb-4 text-sm sm:text-base leading-relaxed">
            Solicitamos informações pessoais apenas quando realmente precisamos
            delas para lhe fornecer um serviço. Fazemo-lo por meios justos e
            legais, com o seu conhecimento e consentimento. Também informamos
            por que estamos coletando e como será usado.
          </p>

          <p className="mb-4 text-sm sm:text-base leading-relaxed">
            Apenas retemos as informações coletadas pelo tempo necessário para
            fornecer o serviço solicitado. Quando armazenamos dados, protegemos
            dentro de meios comercialmente aceitáveis para evitar perdas e
            roubos, bem como acesso, divulgação, cópia, uso ou modificação não
            autorizados.
          </p>

          <p className="mb-4 text-sm sm:text-base leading-relaxed">
            Não compartilhamos informações de identificação pessoal publicamente
            ou com terceiros, exceto quando exigido por lei.
          </p>

          <p className="mb-4 text-sm sm:text-base leading-relaxed">
            O nosso site pode ter links para sites externos que não são operados
            por nós. Esteja ciente de que não temos controle sobre o conteúdo e
            práticas desses sites e não podemos aceitar responsabilidade por
            suas respectivas políticas de privacidade.
          </p>

          <p className="mb-4 text-sm sm:text-base leading-relaxed">
            Você é livre para recusar a nossa solicitação de informações
            pessoais, entendendo que talvez não possamos fornecer alguns dos
            serviços desejados.
          </p>

          <p className="mb-4 text-sm sm:text-base leading-relaxed">
            O uso continuado de nosso site será considerado como aceitação de
            nossas práticas em torno de privacidade e informações pessoais. Se
            você tiver alguma dúvida sobre como lidamos com dados do usuário e
            informações pessoais, entre em contacto connosco.
          </p>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
            Compromisso do Usuário
          </h2>
          <p className="mb-4 text-sm sm:text-base leading-relaxed">
            O usuário se compromete a fazer uso adequado dos conteúdos e da
            informação que o Amigo Secreto Simples oferece no site e com caráter
            enunciativo, mas não limitativo:
          </p>
          <ul className="list-disc list-inside space-y-2 sm:space-y-3 mb-4 text-sm sm:text-base">
            <li>
              Não se envolver em atividades que sejam ilegais ou contrárias à
              boa fé a à ordem pública;
            </li>
            <li>
              Não difundir propaganda ou conteúdo de natureza racista,
              xenofóbica ou azar, qualquer tipo de pornografia ilegal, de
              apologia ao terrorismo ou contra os direitos humanos;
            </li>
            <li>
              Não causar danos aos sistemas físicos (hardwares) e lógicos
              (softwares) do Amigo Secreto Simples, de seus fornecedores ou
              terceiros, para introduzir ou disseminar vírus informáticos ou
              quaisquer outros sistemas de hardware ou software que sejam
              capazes de causar danos anteriormente mencionados.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
            Mais Informações
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Você pode entrar em contato conosco através do e-mail{" "}
            <Link
              href="mailto:contato@amigosecretosimples.com"
              className="text-blue-600 hover:underline break-all"
              target="_blank"
            >
              contato@amigosecretosimples.com
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPage;
