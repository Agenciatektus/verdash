
import { DollarSign, Target, TrendingUp, BarChart3, Settings, Users, Zap, Server } from "lucide-react";

export const dataSources = [
  { id: 'meta_ads', name: 'Meta Ads', icon: '📱' },
  { id: 'google_ads', name: 'Google Ads', icon: '🔍' },
  { id: 'crm', name: 'CRM', icon: '👥' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
  { id: 'planilha', name: 'Planilha', icon: '📊' },
  { id: 'webhook', name: 'Webhook', icon: '🔗' }
];

export const formulaFunctions = [
  'SUM', 'AVG', 'COUNT', 'MIN', 'MAX', 'IF', 'AND', 'OR'
];

export const availableMetrics = {
  financeiras: {
    title: "🔥 Métricas de Receita (Financeiras)",
    icon: DollarSign,
    metrics: [
      "Receita Total",
      "Receita Recorrente Mensal (MRR)",
      "Receita Recorrente Anual (ARR)",
      "Receita Bruta",
      "Receita Líquida",
      "Receita por Produto/Serviço",
      "Receita por Cliente (Revenue per Customer)",
      "Receita por Região",
      "Receita Nova (New Business MRR)",
      "Receita de Expansão (Expansion MRR)",
      "Receita por Upgrades",
      "Receita por Upsell",
      "Receita por Cross-sell",
      "Receita de Renovação",
      "Receita de Serviços Profissionais",
      "Taxa de Crescimento da Receita (%)",
      "Taxa de Cancelamento de Receita (Churn de Receita)",
      "Lifetime Value (LTV)",
      "Gross Margin (Margem Bruta)",
      "Margem Operacional",
      "Margem de Contribuição",
      "ROI (Retorno sobre Investimento)",
      "CAC Payback (Tempo para pagar o CAC)"
    ]
  },
  vendas: {
    title: "💸 Métricas de Vendas",
    icon: Target,
    metrics: [
      "Total de Propostas Enviadas",
      "Propostas Fechadas",
      "Taxa de Conversão por Etapa do Funil",
      "Ciclo Médio de Vendas (dias)",
      "Ticket Médio de Venda",
      "Número de Leads Qualificados (SQLs)",
      "Leads Convertidos em Oportunidades",
      "Oportunidades Fechadas",
      "Taxa de Win Rate (Conversão)",
      "Taxa de Loss Rate (Perda)",
      "Receita por Vendedor",
      "Performance por Vendedor",
      "Número de Reuniões Realizadas",
      "Número de Demonstrações",
      "Taxa de Follow-up Realizado",
      "Leads Gerados por Canal"
    ]
  },
  marketing: {
    title: "📈 Métricas de Marketing",
    icon: TrendingUp,
    metrics: [
      "Custo por Lead (CPL)",
      "Custo por Mil Impressões (CPM)",
      "Custo por Clique (CPC)",
      "Custo por Aquisição (CPA)",
      "Custo por MQL (Marketing Qualified Lead)",
      "Leads Gerados",
      "Leads Qualificados (MQLs)",
      "Leads por Canal (Orgânico, Pago, Referência, Direto)",
      "Taxa de Conversão de Landing Pages",
      "Taxa de Conversão do Site",
      "CTR (Click-Through Rate)",
      "Taxa de Bounce do Site",
      "Tempo Médio na Página",
      "Fontes de Tráfego (%)",
      "Engajamento nas Redes Sociais",
      "Crescimento de Seguidores",
      "Taxa de Abertura de E-mails",
      "Taxa de Cliques de E-mails (CTR)",
      "Taxa de Resposta (Outbound)",
      "Leads de Outbound Gerados",
      "Taxa de Conversão de Outbound"
    ]
  },
  produto: {
    title: "🧠 Métricas de Produto / Uso",
    icon: BarChart3,
    metrics: [
      "Número de Usuários Ativos Diários (DAU)",
      "Usuários Ativos Mensais (MAU)",
      "DAU/MAU Ratio (Indicador de Engajamento)",
      "Tempo Médio de Sessão",
      "Frequência de Acesso",
      "Número de Acessos por Dia",
      "Ações Realizadas por Sessão",
      "Feature Adoption Rate (Taxa de Adoção de Funcionalidade)",
      "Retenção de Funcionalidade",
      "Funções Mais Utilizadas",
      "Número de Bugs Reportados",
      "Tempo Médio para Resolução de Bugs",
      "Net Promoter Score (NPS)",
      "Customer Satisfaction (CSAT)",
      "Customer Effort Score (CES)",
      "Taxa de Retenção de Clientes",
      "Churn Rate (Taxa de Cancelamento)",
      "Tempo até o AHA Moment",
      "Percentual de Onboarding Concluído",
      "Taxa de Sucesso no Onboarding"
    ]
  },
  operacionais: {
    title: "📊 Métricas Operacionais",
    icon: Settings,
    metrics: [
      "Taxa de SLA Cumprido",
      "Tempo Médio de Resolução (TMR)",
      "Tempo Médio de Primeira Resposta",
      "Número de Chamados Abertos",
      "Número de Chamados Resolvidos",
      "Tempo Médio de Atendimento",
      "Volume de Chamados por Canal (WhatsApp, E-mail, Chat, Telefone)",
      "Taxa de Reabertura de Chamados",
      "Volume de Tickets por Período (Hora/Dia/Semana)",
      "Taxa de Automação dos Processos",
      "Custo Operacional",
      "Eficiência Operacional (Receita por Colaborador)"
    ]
  },
  customerSuccess: {
    title: "📦 Métricas de Customer Success",
    icon: Users,
    metrics: [
      "Tempo Médio de Ativação",
      "Health Score dos Clientes",
      "NPS por Cliente",
      "Número de Contatos por Cliente",
      "Taxa de Expansão (Expansão de Conta)",
      "Taxa de Upsell e Cross-sell",
      "Churn Voluntário vs Involuntário",
      "Tempo Médio de Resolução de Problemas",
      "Ticket Médio por Cliente Ativo",
      "Valor Total da Carteira por CSM",
      "Receita Protegida pelo CS",
      "Número de Intervenções do CS"
    ]
  },
  growth: {
    title: "🔥 Métricas de Growth (Crescimento)",
    icon: Zap,
    metrics: [
      "Taxa de Crescimento Mensal de Receita",
      "Crescimento de Usuários (MAU Growth)",
      "Viral Coefficient (Taxa de Viralização)",
      "Tempo até o AHA Moment (Tempo até perceber valor)",
      "Taxa de Convite (Se aplicável - Ex: convidar outros usuários)",
      "Taxa de Compartilhamento",
      "Taxa de Upgrade de Plano",
      "Taxa de Cross-sell",
      "Retenção de Cohort (Retenção por grupos)",
      "Net Revenue Retention (NRR)"
    ]
  },
  tecnicas: {
    title: "🔍 Métricas Técnicas / Infraestrutura",
    icon: Server,
    metrics: [
      "Tempo de Uptime (%)",
      "Tempo Médio de Resposta do Servidor",
      "Número de Erros 500, 404, 502",
      "Tempo Médio de Deploy",
      "Falhas por Deploy",
      "Uso de CPU / Memória / Disco",
      "Latência Média dos Requests",
      "Incidentes por Período"
    ]
  }
};

export const customMetrics = [
  { name: "Custo/lead Meta", value: "R$999,99" },
  { name: "Custo por lead Real - CRM", value: "R$999,99" },
  { name: "Custo por Lead qualificado", value: "R$999,99" },
  { name: "Custo por visita agendada", value: "R$999,99" },
  { name: "Custo por Briefing", value: "R$999,99" },
  { name: "Custo por Desenho de planta", value: "R$999,99" },
  { name: "Custo por Negociação", value: "R$999,99" },
  { name: "Custo por Ap. agendada", value: "R$999,99" }
];
