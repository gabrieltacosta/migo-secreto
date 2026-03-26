const FaqSection = () => {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Perguntas frequentes (FAQ)
      </h2>
      <p className="text-gray-500 mb-10 text-sm">
        Caso você não ache a resposta para sua dúvida, entre em contato através
        do e-mail contato@migosecreto.com.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <div>
          <h4 className="font-bold text-gray-900 mb-2">
            Como fazer amigo secreto por whatsapp?
          </h4>
          <p className="text-sm text-gray-600">
            Ao criar um grupo, será gerado um link. Basta clicar no botão de
            compartilhar via WhatsApp ou copiar o link e enviar.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">
            É possível o organizador ver quem eu tirei?
          </h4>
          <p className="text-sm text-gray-600">
            Não! Apenas quem acessa com a senha registrada consegue ver quem
            tirou.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">
            Esqueci a senha do meu link, e agora?
          </h4>
          <p className="text-sm text-gray-600">
            No momento não é possível resetar a senha, o ideal é criar outro
            sorteio se for no início da brincadeira.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">
            Abri o link pela primeira vez, mas já tem senha?
          </h4>
          <p className="text-sm text-gray-600">
            Alguém entrou no seu nome. Peça ao organizador para recriar o grupo
            ou entre em contato com os participantes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
