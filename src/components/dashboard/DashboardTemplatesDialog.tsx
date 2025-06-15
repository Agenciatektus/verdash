
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Brain, Target, TrendingUp, BarChart3, Users, Settings, Zap, DollarSign, Server } from "lucide-react";
import { toast } from "sonner";
import { getDashboardTemplate } from "@/utils/dashboardTemplates";

const dashboardTemplates = [
  {
    id: 'executive',
    name: '🏛️ Visão Geral Executiva (C-Level)',
    description: 'KPIs executivos, crescimento da receita, receita por canal e pipeline resumido',
    icon: Brain,
    color: 'bg-purple-500',
    metrics: ['Receita Total', 'Crescimento Mensal', 'Churn Rate', 'Meta vs Realizado', 'NPS'],
    widgets: ['5 KPI Cards', 'Gráfico de Linha', 'Gráfico de Donut', 'Funil', 'Barras'],
    category: 'Estratégico'
  },
  {
    id: 'sales',
    name: '🎯 Dashboard Comercial / Vendas',
    description: 'Funil de vendas, receita por vendedor, pipeline de oportunidades',
    icon: Target,
    color: 'bg-green-500',
    metrics: ['Receita Gerada', 'Leads Qualificados', 'Taxa de Conversão', 'Ciclo de Vendas'],
    widgets: ['KPIs de Vendas', 'Funil Interativo', 'Barras de Performance', 'Tabela de Pipeline'],
    category: 'Comercial'
  },
  {
    id: 'marketing',
    name: '📢 Dashboard Marketing',
    description: 'CPL, ROI de campanhas, leads por canal, investimento por canal',
    icon: TrendingUp,
    color: 'bg-blue-500',
    metrics: ['CPL', 'CPA', 'ROI Campanhas', 'CTR', 'Leads Gerados'],
    widgets: ['KPIs Marketing', 'Gráfico de Área', 'Donut por Canal', 'Barras Empilhadas'],
    category: 'Marketing'
  },
  {
    id: 'product',
    name: '🧠 Dashboard Produto / Usuário',
    description: 'DAU/MAU, tempo de sessão, uso por funcionalidade, bugs reportados',
    icon: BarChart3,
    color: 'bg-indigo-500',
    metrics: ['DAU/MAU', 'Tempo de Sessão', 'Adoção Features', 'Bugs', 'AHA Moment'],
    widgets: ['KPIs Produto', 'Linha de Uso', 'Heatmap', 'Radar de Funcionalidades'],
    category: 'Produto'
  },
  {
    id: 'customer-success',
    name: '🤝 Dashboard Customer Success',
    description: 'Health score, churn, intervenções CS, expansões vs cancelamentos',
    icon: Users,
    color: 'bg-emerald-500',
    metrics: ['Health Score', 'Churn Rate', 'NPS por Cliente', 'Intervenções CS'],
    widgets: ['KPIs CS', 'Donut Status', 'Barras por CSM', 'Timeline Intervenções'],
    category: 'Customer Success'
  },
  {
    id: 'operational',
    name: '🏗️ Dashboard Operacional',
    description: 'SLA, tempo de resolução, volume de chamados, heatmap de picos',
    icon: Settings,
    color: 'bg-orange-500',
    metrics: ['SLA Cumprido', 'Tempo Resolução', 'Volume Chamados', 'Eficiência'],
    widgets: ['KPIs Operacionais', 'Linha Evolução', 'Barras por Canal', 'Heatmap Horários'],
    category: 'Operacional'
  },
  {
    id: 'growth',
    name: '🔥 Dashboard Growth',
    description: 'Crescimento de receita e usuários, viral coefficient, retenção de cohort',
    icon: Zap,
    color: 'bg-red-500',
    metrics: ['Crescimento Receita', 'Viral Coefficient', 'Taxa Upgrade', 'Retenção Cohort'],
    widgets: ['KPIs Growth', 'Linha Crescimento', 'Sankey Flow', 'Radar Canais'],
    category: 'Growth'
  },
  {
    id: 'financial',
    name: '🏦 Dashboard Financeiro',
    description: 'MRR/ARR, burn rate, runway, análise de cascata financeira',
    icon: DollarSign,
    color: 'bg-yellow-500',
    metrics: ['MRR/ARR', 'Burn Rate', 'Runway', 'Margem Bruta'],
    widgets: ['KPIs Financeiros', 'Linha Faturamento', 'Cascata Financeira', 'Donut Gastos'],
    category: 'Financeiro'
  },
  {
    id: 'technical',
    name: '🔧 Dashboard Técnico',
    description: 'Uptime, latência, incidentes, uso de recursos, tempo de deploy',
    icon: Server,
    color: 'bg-gray-500',
    metrics: ['Uptime', 'Latência', 'Incidentes', 'MTTR', 'Erros'],
    widgets: ['KPIs Técnicos', 'Linha Performance', 'Heatmap Erros', 'Barras Recursos'],
    category: 'Técnico'
  }
];

interface DashboardTemplatesDialogProps {
  onCreateDashboard?: (templateId: string, widgets?: any[]) => void;
}

export const DashboardTemplatesDialog = ({ onCreateDashboard }: DashboardTemplatesDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSelectTemplate = (templateId: string, templateName: string) => {
    const widgets = getDashboardTemplate(templateId);
    toast.success(`Template "${templateName}" criado com ${widgets.length} widgets!`);
    onCreateDashboard?.(templateId, widgets);
    setIsDialogOpen(false);
  };

  const handleCreateCustom = () => {
    toast.success("Criando dashboard personalizado...");
    onCreateDashboard?.('custom', []);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="verdash-btn-primary verdash-hover-scale">
          <Plus className="w-5 h-5 mr-2" />
          Novo Dashboard
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="max-w-7xl max-h-[90vh] overflow-hidden bg-verdash-dark border-verdash-divider/30" 
      >
        <DialogHeader>
          <DialogTitle className="text-white font-grotesk">Criar Novo Dashboard</DialogTitle>
          <DialogDescription className="text-white/60">
            Escolha um template pré-configurado com widgets específicos ou crie um dashboard personalizado
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {/* Custom Dashboard Option */}
            <Card className="border-2 border-dashed border-verdash-cyan/30 hover:border-verdash-cyan/50 transition-colors cursor-pointer bg-verdash-dark/50" onClick={handleCreateCustom}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-verdash-cyan/10 rounded-lg flex items-center justify-center">
                    <Plus className="w-6 h-6 text-verdash-cyan" />
                  </div>
                  <div>
                    <CardTitle className="text-white font-grotesk">Dashboard Personalizado</CardTitle>
                    <CardDescription className="text-white/60">Comece do zero e configure seu próprio dashboard</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Template Categories */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white font-grotesk">Templates Pré-Configurados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardTemplates.map((template) => (
                  <Card 
                    key={template.id} 
                    className="hover:shadow-lg transition-all duration-200 cursor-pointer group bg-verdash-dark/50 border-verdash-divider/30 hover:border-verdash-cyan/50" 
                    onClick={() => handleSelectTemplate(template.id, template.name)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={`w-10 h-10 ${template.color} rounded-lg flex items-center justify-center mb-3`}>
                          <template.icon className="w-5 h-5 text-white" />
                        </div>
                        <Badge variant="outline" className="text-xs border-verdash-divider/30 text-white/70">
                          {template.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-sm font-semibold text-white group-hover:text-verdash-cyan transition-colors font-grotesk">
                        {template.name}
                      </CardTitle>
                      <CardDescription className="text-xs text-white/60">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-white/60">Widgets inclusos:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.widgets.slice(0, 3).map((widget, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-verdash-cyan/10 border-verdash-cyan/30 text-verdash-cyan">
                              {widget}
                            </Badge>
                          ))}
                          {template.widgets.length > 3 && (
                            <Badge variant="secondary" className="text-xs bg-verdash-divider/20 border-verdash-divider/30 text-white/70">
                              +{template.widgets.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-white/60">Principais métricas:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.metrics.slice(0, 3).map((metric, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-verdash-divider/20 border-verdash-divider/30 text-white/70">
                              {metric}
                            </Badge>
                          ))}
                          {template.metrics.length > 3 && (
                            <Badge variant="secondary" className="text-xs bg-verdash-divider/20 border-verdash-divider/30 text-white/70">
                              +{template.metrics.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
