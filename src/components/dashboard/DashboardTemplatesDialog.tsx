
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Brain, Target, TrendingUp, BarChart3, Users, Settings, Zap, DollarSign, Server } from "lucide-react";
import { toast } from "sonner";

const dashboardTemplates = [
  {
    id: 'executive',
    name: '🏛️ Visão Geral Executiva (C-Level)',
    description: 'Olhar macro do negócio — saúde financeira, crescimento e performance geral',
    icon: Brain,
    color: 'bg-purple-500',
    metrics: ['Receita Total', 'MRR/ARR', 'Crescimento da Receita', 'CAC, LTV', 'NPS', 'Health Score'],
    category: 'Estratégico'
  },
  {
    id: 'sales',
    name: '🎯 Dashboard Comercial / Vendas',
    description: 'Acompanhar pipeline, conversões e eficiência de vendas',
    icon: Target,
    color: 'bg-green-500',
    metrics: ['Pipeline de Vendas', 'Taxa de Conversão', 'Ciclo de Vendas', 'Ticket Médio', 'Performance por Vendedor'],
    category: 'Comercial'
  },
  {
    id: 'marketing',
    name: '📢 Dashboard Marketing',
    description: 'Analisar geração de demanda, eficiência dos canais e conversões',
    icon: TrendingUp,
    color: 'bg-blue-500',
    metrics: ['Leads por Canal', 'CPL, CPC, CPM', 'Taxa de Conversão', 'ROI das Campanhas', 'Tráfego por Fonte'],
    category: 'Marketing'
  },
  {
    id: 'product',
    name: '🧠 Dashboard Produto / Usuário',
    description: 'Acompanhamento de uso, adoção e retenção do produto',
    icon: BarChart3,
    color: 'bg-indigo-500',
    metrics: ['DAU/MAU', 'Retenção de Cohort', 'Adoção de Features', 'NPS', 'Tempo até AHA Moment'],
    category: 'Produto'
  },
  {
    id: 'customer-success',
    name: '🤝 Dashboard Customer Success',
    description: 'Gestão da carteira, saúde dos clientes e expansão',
    icon: Users,
    color: 'bg-emerald-500',
    metrics: ['Health Score', 'Churn Rate', 'Upsell/Cross-sell', 'NPS por Cliente', 'Intervenções CS'],
    category: 'Customer Success'
  },
  {
    id: 'operational',
    name: '🏗️ Dashboard Operacional',
    description: 'Controle de SLA, atendimento e eficiência',
    icon: Settings,
    color: 'bg-orange-500',
    metrics: ['SLA Cumprido', 'Tempo de Resolução', 'Volume de Chamados', 'Eficiência Operacional'],
    category: 'Operacional'
  },
  {
    id: 'growth',
    name: '🔥 Dashboard Growth',
    description: 'Métricas de crescimento e expansão',
    icon: Zap,
    color: 'bg-red-500',
    metrics: ['Crescimento de Receita', 'Viral Coefficient', 'Taxa de Upgrade', 'NRR', 'Retenção de Cohort'],
    category: 'Growth'
  },
  {
    id: 'financial',
    name: '🏦 Dashboard Financeiro',
    description: 'Saúde financeira e sustentabilidade do negócio',
    icon: DollarSign,
    color: 'bg-yellow-500',
    metrics: ['Receita Total', 'Burn Rate', 'Runway', 'EBITDA', 'CAC vs LTV'],
    category: 'Financeiro'
  },
  {
    id: 'technical',
    name: '🔧 Dashboard Técnico',
    description: 'Saúde da infraestrutura, sistema e estabilidade',
    icon: Server,
    color: 'bg-gray-500',
    metrics: ['Uptime', 'Tempo de Resposta', 'Erros', 'Latência', 'Uso de Recursos'],
    category: 'Técnico'
  }
];

interface DashboardTemplatesDialogProps {
  onCreateDashboard?: (templateId: string) => void;
}

export const DashboardTemplatesDialog = ({ onCreateDashboard }: DashboardTemplatesDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSelectTemplate = (templateId: string, templateName: string) => {
    toast.success(`Template "${templateName}" selecionado!`);
    onCreateDashboard?.(templateId);
    setIsDialogOpen(false);
  };

  const handleCreateCustom = () => {
    toast.success("Criando dashboard personalizado...");
    onCreateDashboard?.('custom');
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-foreground">Criar Novo Dashboard</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Escolha um template pré-configurado ou crie um dashboard personalizado
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {/* Custom Dashboard Option */}
            <Card className="border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors cursor-pointer" onClick={handleCreateCustom}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Plus className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">Dashboard Personalizado</CardTitle>
                    <CardDescription>Comece do zero e configure seu próprio dashboard</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Template Categories */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Templates Disponíveis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboardTemplates.map((template) => (
                  <Card 
                    key={template.id} 
                    className="hover:shadow-lg transition-all duration-200 cursor-pointer group" 
                    onClick={() => handleSelectTemplate(template.id, template.name)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={`w-10 h-10 ${template.color} rounded-lg flex items-center justify-center mb-3`}>
                          <template.icon className="w-5 h-5 text-white" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {template.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Principais métricas:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.metrics.slice(0, 3).map((metric, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {metric}
                            </Badge>
                          ))}
                          {template.metrics.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
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
