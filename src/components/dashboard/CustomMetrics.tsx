
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Target, Calculator, DollarSign, TrendingUp, Users, BarChart3, Settings, Zap, Server } from "lucide-react";
import { toast } from "sonner";

const customMetrics = [
  { name: "Custo/lead Meta", value: "R$999,99" },
  { name: "Custo por lead Real - CRM", value: "R$999,99" },
  { name: "Custo por Lead qualificado", value: "R$999,99" },
  { name: "Custo por visita agendada", value: "R$999,99" },
  { name: "Custo por Briefing", value: "R$999,99" },
  { name: "Custo por Desenho de planta", value: "R$999,99" },
  { name: "Custo por Negociação", value: "R$999,99" },
  { name: "Custo por Ap. agendada", value: "R$999,99" }
];

const dataSources = [
  { id: 'meta_ads', name: 'Meta Ads', icon: '📱' },
  { id: 'google_ads', name: 'Google Ads', icon: '🔍' },
  { id: 'crm', name: 'CRM', icon: '👥' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
  { id: 'planilha', name: 'Planilha', icon: '📊' },
  { id: 'webhook', name: 'Webhook', icon: '🔗' }
];

const formulaFunctions = [
  'SUM', 'AVG', 'COUNT', 'MIN', 'MAX', 'IF', 'AND', 'OR'
];

const availableMetrics = {
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

interface CustomMetricsProps {
  onNewMetric?: () => void;
}

export const CustomMetrics = ({ onNewMetric }: CustomMetricsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const [metricName, setMetricName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const [formula, setFormula] = useState("");
  const [selectedMetric, setSelectedMetric] = useState("");

  const handleCreateMetric = () => {
    if (!metricName || !formula) {
      toast.error("Nome e fórmula são obrigatórios");
      return;
    }

    toast.success("Métrica criada com sucesso!");
    setIsDialogOpen(false);
    resetForm();
    onNewMetric?.();
  };

  const resetForm = () => {
    setMetricName("");
    setDescription("");
    setSelectedProject("");
    setSelectedDataSources([]);
    setFormula("");
    setSelectedMetric("");
  };

  const insertFormulaFunction = (func: string) => {
    setFormula(prev => prev + `${func}()`);
  };

  const selectPredefinedMetric = (metricName: string) => {
    setMetricName(metricName);
    setActiveTab("create");
    toast.success(`Métrica "${metricName}" selecionada!`);
  };

  return (
    <Card className="verdash-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Métricas De Custo</CardTitle>
            <CardDescription>Métricas personalizadas de custo por ação</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="verdash-btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Nova Métrica
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-background/95 backdrop-blur-sm border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Criar Nova Métrica</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Escolha uma métrica pré-definida ou configure uma métrica personalizada
                </DialogDescription>
              </DialogHeader>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="available">Métricas Disponíveis</TabsTrigger>
                  <TabsTrigger value="create">Criar Personalizada</TabsTrigger>
                </TabsList>

                <TabsContent value="available" className="mt-6">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-6">
                      {Object.entries(availableMetrics).map(([key, category]) => (
                        <div key={key} className="space-y-3">
                          <div className="flex items-center gap-2 mb-3">
                            <category.icon className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {category.metrics.map((metric, index) => (
                              <button
                                key={index}
                                onClick={() => selectPredefinedMetric(metric)}
                                className="text-left p-3 rounded-lg border border-border/30 hover:border-border/50 bg-card/20 hover:bg-card/40 transition-all duration-200 group"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                                    {metric}
                                  </span>
                                  <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="create" className="mt-6">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-6">
                      {/* Basic Info */}
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="metric-name" className="text-foreground">Nome da Métrica *</Label>
                          <Input
                            id="metric-name"
                            value={metricName}
                            onChange={(e) => setMetricName(e.target.value)}
                            placeholder="Ex: CAC - Custo de Aquisição"
                            className="mt-1 bg-background/50 border-border"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="metric-description" className="text-foreground">Descrição</Label>
                          <Textarea
                            id="metric-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descreva o que esta métrica representa..."
                            className="mt-1 bg-background/50 border-border"
                          />
                        </div>

                        <div>
                          <Label htmlFor="metric-project" className="text-foreground">Projeto</Label>
                          <Select value={selectedProject} onValueChange={setSelectedProject}>
                            <SelectTrigger className="mt-1 bg-background/50 border-border">
                              <SelectValue placeholder="Selecione um projeto" />
                            </SelectTrigger>
                            <SelectContent className="bg-background border-border">
                              <SelectItem value="ecommerce">E-commerce Principal</SelectItem>
                              <SelectItem value="marketing">Marketing Digital</SelectItem>
                              <SelectItem value="b2b">Vendas B2B</SelectItem>
                              <SelectItem value="global">Global (Todos os projetos)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Data Sources */}
                      <div>
                        <Label className="text-foreground">Fontes de Dados</Label>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          {dataSources.map((source) => (
                            <div
                              key={source.id}
                              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                                selectedDataSources.includes(source.id)
                                  ? 'border-primary bg-primary/10'
                                  : 'border-border hover:bg-muted/50'
                              }`}
                              onClick={() => {
                                setSelectedDataSources(prev =>
                                  prev.includes(source.id)
                                    ? prev.filter(id => id !== source.id)
                                    : [...prev, source.id]
                                );
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{source.icon}</span>
                                <span className="text-sm font-medium text-foreground">{source.name}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Formula Builder */}
                      <div>
                        <Label htmlFor="formula" className="text-foreground">Fórmula *</Label>
                        <div className="space-y-3 mt-2">
                          {/* Function Buttons */}
                          <div className="flex flex-wrap gap-2">
                            {formulaFunctions.map((func) => (
                              <Button
                                key={func}
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => insertFormulaFunction(func)}
                                className="text-xs"
                              >
                                {func}
                              </Button>
                            ))}
                          </div>

                          {/* Formula Input */}
                          <Textarea
                            id="formula"
                            value={formula}
                            onChange={(e) => setFormula(e.target.value)}
                            placeholder="Ex: SUM(marketing_spend) / COUNT(new_customers)"
                            className="font-mono text-sm bg-background/50 border-border"
                            rows={4}
                          />
                          
                          <p className="text-xs text-muted-foreground">
                            Use as funções acima ou digite sua própria fórmula. Você pode referenciar campos das fontes de dados selecionadas.
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-4">
                        <Button onClick={handleCreateMetric} className="flex-1 verdash-gradient">
                          <Calculator className="w-4 h-4 mr-2" />
                          Criar Métrica
                        </Button>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customMetrics.map((metric, index) => (
            <div key={index} className="p-4 rounded-lg border border-border/30 hover:border-border/50 bg-card/20 hover:bg-card/40 verdash-animate">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-verdash-blue to-verdash-cyan flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{metric.name}</p>
                  <p className="text-xl font-bold text-foreground">{metric.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
