
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, HelpCircle, Book, Mail, Phone, ExternalLink } from "lucide-react";

const supportOptions = [
  {
    title: "Central de Ajuda",
    description: "Acesse nossa base de conhecimento completa com guias e tutoriais",
    icon: Book,
    action: "Acessar",
    link: "#"
  },
  {
    title: "Abrir Ticket",
    description: "Relate um problema ou solicite suporte técnico especializado",
    icon: MessageCircle,
    action: "Criar Ticket",
    link: "#"
  },
  {
    title: "Chat ao Vivo",
    description: "Converse diretamente com nossa equipe de suporte",
    icon: MessageCircle,
    action: "Iniciar Chat",
    link: "#"
  },
  {
    title: "Documentação Técnica",
    description: "APIs, webhooks e guias de integração para desenvolvedores",
    icon: Book,
    action: "Ver Docs",
    link: "#"
  }
];

const faqs = [
  {
    question: "Como conectar uma nova fonte de dados?",
    answer: "Acesse Integrações > Nova Integração e siga o assistente de configuração."
  },
  {
    question: "Posso personalizar as cores dos gráficos?",
    answer: "Sim, nas configurações de cada dashboard você pode definir paletas personalizadas."
  },
  {
    question: "Como compartilhar um dashboard com minha equipe?",
    answer: "Use o botão 'Compartilhar' no dashboard e defina as permissões de acesso."
  },
  {
    question: "Há limites no plano atual?",
    answer: "Verifique os limites do seu plano em Configurações > Plano e Billing."
  }
];

export default function Support() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white font-grotesk uppercase tracking-wide verdash-glow-text">
            Suporte & Ajuda
          </h1>
          <p className="text-white/70 mt-2 font-inter">
            Encontre respostas rápidas ou entre em contato com nossa equipe
          </p>
        </div>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supportOptions.map((option, index) => (
          <Card key={index} className="verdash-glass verdash-glass-hover">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl verdash-gradient flex items-center justify-center">
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white font-grotesk">
                    {option.title}
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    {option.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full verdash-btn-primary verdash-hover-scale">
                {option.action}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="verdash-kpi">
          <CardHeader>
            <CardTitle className="text-white font-grotesk flex items-center gap-2">
              <Mail className="w-5 h-5 text-verdash-cyan" />
              Email de Suporte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white text-lg font-mono">suporte@verdash.com</p>
            <p className="text-white/60 text-sm mt-2">Resposta em até 24 horas</p>
          </CardContent>
        </Card>

        <Card className="verdash-kpi">
          <CardHeader>
            <CardTitle className="text-white font-grotesk flex items-center gap-2">
              <Phone className="w-5 h-5 text-verdash-cyan" />
              Telefone de Emergência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white text-lg font-mono">+55 (11) 9999-9999</p>
            <p className="text-white/60 text-sm mt-2">Seg-Sex, 9h às 18h</p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="verdash-glass">
        <CardHeader>
          <CardTitle className="text-white font-grotesk flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-verdash-cyan" />
            Perguntas Frequentes
          </CardTitle>
          <CardDescription className="text-white/70">
            Respostas rápidas para as dúvidas mais comuns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-verdash-divider/30 pb-4 last:border-b-0">
                <h3 className="text-white font-semibold mb-2 font-grotesk">
                  {faq.question}
                </h3>
                <p className="text-white/80 font-inter">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
