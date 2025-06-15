import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, ArrowRight, Check, ChevronDown, MessageSquare, BarChart3, Zap, Shield, Users, Settings, HelpCircle, Instagram, Linkedin, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0E1E] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0E1E]/80 backdrop-blur-lg border-b border-[#1042F6]/30">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl verdash-gradient flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-grotesk font-bold">VERDASH</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#funcionalidades" className="text-[#D9D9D9] hover:text-white transition-colors">Funcionalidades</a>
            <a href="#planos" className="text-[#D9D9D9] hover:text-white transition-colors">Planos</a>
            <a href="#faq" className="text-[#D9D9D9] hover:text-white transition-colors">FAQ</a>
            <a href="#suporte" className="text-[#D9D9D9] hover:text-white transition-colors">Suporte</a>
            <Link to="/login" className="text-[#D9D9D9] hover:text-white transition-colors">Login</Link>
          </nav>

          {/* CTA Button */}
          <Button className="verdash-btn-primary">
            Solicitar Demonstração
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-grotesk font-bold leading-tight">
                SEUS DADOS. SEU DASHBOARD. SUA VERDADE.
              </h1>
              <p className="text-xl text-[#D9D9D9]">
                Chega de dados espalhados, planilhas quebradas e vendas fora do radar. O Verdash conecta tráfego, CRM, WhatsApp e vendas offline em um HUB inteligente — e te mostra o que realmente acontece no seu negócio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="verdash-btn-secondary">
                  Ver Funcionalidades
                </Button>
                <Button className="verdash-btn-primary">
                  Solicitar Demonstração
                </Button>
              </div>
            </div>
            <div className="relative">
              {/* Mockup do Dashboard */}
              <div className="verdash-glass rounded-2xl p-4">
                <div className="aspect-video bg-gradient-to-br from-[#1042F6]/20 to-[#00FFB0]/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section id="funcionalidades" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-grotesk font-bold text-center mb-16">COMO FUNCIONA</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="verdash-glass p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl verdash-gradient flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-grotesk font-bold mb-2">Conectamos seus dados</h3>
              <p className="text-[#D9D9D9]">Tráfego, CRM, WhatsApp, vendas offline e planilhas</p>
            </div>

            {/* Card 2 */}
            <div className="verdash-glass p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl verdash-gradient flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-grotesk font-bold mb-2">Modelamos tudo no dashboard</h3>
              <p className="text-[#D9D9D9]">Dados organizados de forma visual e intuitiva</p>
            </div>

            {/* Card 3 */}
            <div className="verdash-glass p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl verdash-gradient flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-grotesk font-bold mb-2">Criamos KPIs e métricas compostas</h3>
              <p className="text-[#D9D9D9]">Cruze dados e gere KPIs inteligentes</p>
            </div>

            {/* Card 4 */}
            <div className="verdash-glass p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl verdash-gradient flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-grotesk font-bold mb-2">Você toma decisões com segurança</h3>
              <p className="text-[#D9D9D9]">Visão real e completa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section id="beneficios" className="py-20 bg-[#0A0E1E]/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-grotesk font-bold text-center mb-16">BENEFÍCIOS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="verdash-glass p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl verdash-gradient flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-grotesk font-bold mb-2">HUB de Dados Completo</h3>
              <p className="text-[#D9D9D9]">Tráfego, CRM, WhatsApp, offline — tudo integrado</p>
            </div>

            {/* Card 2 */}
            <div className="verdash-glass p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl verdash-gradient flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-grotesk font-bold mb-2">Métricas Compostas</h3>
              <p className="text-[#D9D9D9]">Some, cruze e modele dados de qualquer fonte</p>
            </div>

            {/* Card 3 */}
            <div className="verdash-glass p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl verdash-gradient flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-grotesk font-bold mb-2">Verdash IA</h3>
              <p className="text-[#D9D9D9]">Agente de insights, detecta padrões e gera alertas automáticos</p>
            </div>

            {/* Card 4 */}
            <div className="verdash-glass p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl verdash-gradient flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-grotesk font-bold mb-2">White Label</h3>
              <p className="text-[#D9D9D9]">Painel no seu domínio, com sua marca</p>
            </div>
          </div>
        </div>
      </section>

      {/* Planos Section */}
      <section id="planos" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-grotesk font-bold text-center mb-16">PLANOS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plano Started */}
            <div className="verdash-glass p-8 rounded-2xl">
              <h3 className="text-2xl font-grotesk font-bold mb-4">STARTED</h3>
              <div className="text-3xl font-bold mb-8">R$ 97<span className="text-lg text-[#D9D9D9]">/mês</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>3 Dashboards</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>4 Fontes/API/Webhooks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>KPIs Simples</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>Modelagem Básica</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>3 Usuários Internos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>2 Usuários Clientes</span>
                </li>
              </ul>
              <Button className="verdash-btn-primary w-full">
                Solicitar Demonstração
              </Button>
            </div>

            {/* Plano Engage */}
            <div className="verdash-glass p-8 rounded-2xl border-2 border-[#00FFB0]/30">
              <h3 className="text-2xl font-grotesk font-bold mb-4">ENGAGE</h3>
              <div className="text-3xl font-bold mb-8">R$ 247<span className="text-lg text-[#D9D9D9]">/mês</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>10 Dashboards</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>8 Fontes/API/Webhooks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>KPIs Avançadas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>Modelagem Avançada</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>Verdash IA</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>5 Usuários Internos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>10 Usuários Clientes</span>
                </li>
              </ul>
              <Button className="verdash-btn-primary w-full">
                Solicitar Demonstração
              </Button>
            </div>

            {/* Plano Enterprise */}
            <div className="verdash-glass p-8 rounded-2xl">
              <h3 className="text-2xl font-grotesk font-bold mb-4">ENTERPRISE</h3>
              <div className="text-3xl font-bold mb-8">Sob Consulta</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>Dashboards Ilimitados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>Fontes Ilimitadas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>KPIs Ilimitadas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>Modelagem Completa</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>Verdash IA</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>White Label</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00FFB0]" />
                  <span>Usuários Ilimitados</span>
                </li>
              </ul>
              <Button className="verdash-btn-primary w-full">
                Solicitar Demonstração
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section id="depoimentos" className="py-20 bg-[#0A0E1E]/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-grotesk font-bold text-center mb-16">DEPOIMENTOS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Depoimento 1 */}
            <div className="verdash-glass p-6 rounded-2xl">
              <p className="text-lg mb-4">"Finalmente sei quanto cada canal realmente traz. WhatsApp, CRM e tráfego... tudo na mesma tela."</p>
              <p className="font-bold">Lucas</p>
            </div>

            {/* Depoimento 2 */}
            <div className="verdash-glass p-6 rounded-2xl">
              <p className="text-lg mb-4">"Vender ficou mais fácil. Decidir ficou mais simples. É outro jogo agora."</p>
              <p className="font-bold">Ana</p>
            </div>

            {/* Depoimento 3 */}
            <div className="verdash-glass p-6 rounded-2xl">
              <p className="text-lg mb-4">"A clareza dos dados fez a gente dobrar o faturamento. Verdash virou chave aqui."</p>
              <p className="font-bold">Felipe</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-grotesk font-bold text-center mb-16">FAQ</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="verdash-glass rounded-xl px-4">
                <AccordionTrigger className="text-lg font-medium">
                  O Verdash conecta com WhatsApp?
                </AccordionTrigger>
                <AccordionContent>
                  Sim, via API, Webhook ou Sheets.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="verdash-glass rounded-xl px-4">
                <AccordionTrigger className="text-lg font-medium">
                  Posso usar no meu domínio?
                </AccordionTrigger>
                <AccordionContent>
                  Sim, com White Label no plano Enterprise.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="verdash-glass rounded-xl px-4">
                <AccordionTrigger className="text-lg font-medium">
                  O Verdash rastreia vendas?
                </AccordionTrigger>
                <AccordionContent>
                  Não. Lemos os dados de quem rastreia, como CRMs ou Tintim.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="verdash-glass rounded-xl px-4">
                <AccordionTrigger className="text-lg font-medium">
                  Preciso saber programar?
                </AccordionTrigger>
                <AccordionContent>
                  Não. Zero código, plug-and-play.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="verdash-glass rounded-xl px-4">
                <AccordionTrigger className="text-lg font-medium">
                  Tem limite de dashboards?
                </AccordionTrigger>
                <AccordionContent>
                  Depende do plano. A partir do Engage já é bem robusto.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0A0E1E]/80 border-t border-[#1042F6]/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo e Redes Sociais */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl verdash-gradient flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-grotesk font-bold">VERDASH</span>
              </div>
              <div className="flex gap-4">
                <a href="#" className="text-[#D9D9D9] hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-[#D9D9D9] hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-[#D9D9D9] hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h4 className="font-grotesk font-bold">Links</h4>
              <ul className="space-y-2">
                <li><a href="#funcionalidades" className="text-[#D9D9D9] hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#planos" className="text-[#D9D9D9] hover:text-white transition-colors">Planos</a></li>
                <li><a href="#faq" className="text-[#D9D9D9] hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#suporte" className="text-[#D9D9D9] hover:text-white transition-colors">Suporte</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="font-grotesk font-bold">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#D9D9D9] hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="text-[#D9D9D9] hover:text-white transition-colors">Política de Privacidade</a></li>
              </ul>
            </div>

            {/* Contato */}
            <div className="space-y-4">
              <h4 className="font-grotesk font-bold">Contato</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#D9D9D9] hover:text-white transition-colors">suporte@verdash.com</a></li>
                <li><a href="#" className="text-[#D9D9D9] hover:text-white transition-colors">comercial@verdash.com</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#1042F6]/30 text-center text-[#D9D9D9]">
            © 2025 Verdash — Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 