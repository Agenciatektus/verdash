import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, Bell, BarChart3, Zap, TrendingUp, FileText, MessageCircle } from "lucide-react";
import { InsightCard } from "@/components/ai/InsightCard";
import { AIChat } from "@/components/ai/AIChat";
import { AlertsPanel } from "@/components/ai/AlertsPanel";
import { ReportsConfigDialog } from "@/components/ai/ReportsConfigDialog";
import { Insight, Alert, AIRecommendation } from "@/types/ai";

// Mock data
const mockInsights: Insight[] = [
  {
    id: '1',
    title: 'Custo por Lead Aumentou',
    description: 'Seu custo de aquisição no Google Ads subiu 12% nos últimos 7 dias. Isso pode estar relacionado ao aumento da concorrência nas palavras-chave principais.',
    type: 'negative',
    severity: 'medium',
    source: 'Google Ads',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    action: 'Otimizar Campanhas',
    metrics: {
      current: 45.30,
      previous: 40.50,
      change: 12,
      changeType: 'increase'
    }
  },
  {
    id: '2',
    title: 'WhatsApp Convertendo Melhor',
    description: 'Os leads do WhatsApp estão convertendo 35% melhor que outras fontes. Esta é uma oportunidade para aumentar o investimento neste canal.',
    type: 'positive',
    severity: 'high',
    source: 'WhatsApp',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    action: 'Expandir Estratégia',
    metrics: {
      current: 5.2,
      previous: 3.8,
      change: 35,
      changeType: 'increase'
    }
  },
  {
    id: '3',
    title: 'Meta Ads Performance Estável',
    description: 'Suas campanhas no Meta mantiveram performance consistente esta semana, com taxa de conversão de 2.8% e custo controlado.',
    type: 'neutral',
    severity: 'low',
    source: 'Meta Ads',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  }
];

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Anomalia no Custo por Click',
    message: 'O CPC do Google Ads aumentou 40% em 2 horas. Isso pode indicar um problema na configuração ou aumento súbito da concorrência.',
    type: 'anomaly',
    severity: 'high',
    status: 'active',
    source: 'Google Ads',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    threshold: {
      value: 2.5,
      operator: 'above',
      metric: 'CPC'
    }
  },
  {
    id: '2',
    title: 'Queda na Taxa de Conversão',
    message: 'A conversão do funil caiu abaixo de 3% nas últimas 4 horas. Verifique se há problemas técnicos no site.',
    type: 'threshold',
    severity: 'medium',
    status: 'active',
    source: 'Site',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  }
];

const mockRecommendations: AIRecommendation[] = [
  {
    id: '1',
    title: 'Redirecionar Budget para WhatsApp',
    description: 'Com base na performance superior do WhatsApp, redirecionar 20% do budget do Meta pode aumentar o ROI geral.',
    impact: 'high',
    effort: 'low',
    category: 'optimization',
    actions: [
      'Reduzir budget do Meta em 20%',
      'Aumentar investimento em anúncios que direcionam para WhatsApp',
      'Criar mais conteúdos focados em conversação'
    ],
    expectedResult: 'Aumento estimado de 15% no ROI geral',
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Otimizar Horários de Anúncios',
    description: 'Seus anúncios performam 25% melhor entre 19h-22h. Concentrar budget neste período pode reduzir custos.',
    impact: 'medium',
    effort: 'low',
    category: 'cost-reduction',
    actions: [
      'Configurar agendamento de anúncios',
      'Aumentar lances no horário nobre',
      'Pausar anúncios em horários de baixa performance'
    ],
    expectedResult: 'Redução de 10-15% no custo por conversão',
    timestamp: new Date().toISOString()
  }
];

export default function VerdashAI() {
  const [activeTab, setActiveTab] = useState<'insights' | 'chat' | 'alerts' | 'reports'>('insights');

  const handleInsightAction = (insight: Insight) => {
    console.log('Ação para insight:', insight.id);
    // Implementar navegação para área específica
  };

  const handleDismissAlert = (alertId: string) => {
    console.log('Dispensar alerta:', alertId);
    // Implementar lógica para dispensar alerta
  };

  const handleViewAlert = (alertId: string) => {
    console.log('Ver alerta:', alertId);
    // Implementar navegação para detalhes do alerta
  };

  return (
    <div className="space-y-8 animate-verdash-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white font-grotesk uppercase tracking-wide">
            Verdash IA
          </h1>
          <p className="text-white/70 mt-2 font-inter">
            Seu copiloto inteligente de dados • Transforme números em decisões
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-900 px-4 py-2 font-semibold">
          <Zap className="w-4 h-4 mr-2" />
          Plano Engage+
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="verdash-kpi">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70 font-grotesk uppercase">Insights Gerados</p>
                <p className="text-2xl font-bold text-white">127</p>
              </div>
              <Lightbulb className="w-8 h-8 text-verdash-cyan" />
            </div>
          </CardContent>
        </Card>

        <Card className="verdash-kpi">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70 font-grotesk uppercase">Alertas Ativos</p>
                <p className="text-2xl font-bold text-white">{mockAlerts.filter(a => a.status === 'active').length}</p>
              </div>
              <Bell className="w-8 h-8 text-verdash-coral" />
            </div>
          </CardContent>
        </Card>

        <Card className="verdash-kpi">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70 font-grotesk uppercase">Recomendações</p>
                <p className="text-2xl font-bold text-white">{mockRecommendations.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-verdash-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="verdash-kpi">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70 font-grotesk uppercase">Economia Gerada</p>
                <p className="text-2xl font-bold text-white">R$ 12.4K</p>
              </div>
              <BarChart3 className="w-8 h-8 text-verdash-blue" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-verdash-divider/30">
        {[
          { id: 'insights', label: 'Insights & Análises', icon: Lightbulb },
          { id: 'chat', label: 'Chat Inteligente', icon: MessageCircle },
          { id: 'alerts', label: 'Alertas', icon: Bell },
          { id: 'reports', label: 'Relatórios', icon: FileText }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            className={`${
              activeTab === tab.id 
                ? 'verdash-btn-primary' 
                : 'text-white/70 hover:text-white hover:bg-verdash-input-bg/50'
            } font-grotesk uppercase text-sm`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'insights' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-grotesk uppercase">
                Insights Recentes
              </h2>
              <Button variant="outline" size="sm" className="verdash-btn-secondary">
                Ver Todos
              </Button>
            </div>
            {mockInsights.map((insight) => (
              <InsightCard 
                key={insight.id} 
                insight={insight} 
                onActionClick={handleInsightAction}
              />
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white font-grotesk uppercase">
              Recomendações IA
            </h2>
            {mockRecommendations.map((rec) => (
              <Card key={rec.id} className="verdash-glass">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-white font-grotesk">{rec.title}</CardTitle>
                    <Badge 
                      variant={rec.impact === 'high' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {rec.impact === 'high' ? 'Alto Impacto' : rec.impact === 'medium' ? 'Médio Impacto' : 'Baixo Impacto'}
                    </Badge>
                  </div>
                  <CardDescription className="text-white/70">
                    {rec.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-white/80 mb-2">Ações Sugeridas:</p>
                      <ul className="space-y-1">
                        {rec.actions.map((action, index) => (
                          <li key={index} className="text-sm text-white/70 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-verdash-cyan"></div>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 rounded-lg bg-verdash-success/10 border border-verdash-success/30">
                      <p className="text-sm text-verdash-success font-medium">
                        Resultado Esperado: {rec.expectedResult}
                      </p>
                    </div>
                    <Button className="w-full verdash-btn-primary verdash-hover-scale">
                      Implementar Recomendação
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="max-w-4xl mx-auto">
          <AIChat />
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="max-w-3xl mx-auto">
          <AlertsPanel 
            alerts={mockAlerts} 
            onDismiss={handleDismissAlert}
            onView={handleViewAlert}
          />
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-900" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Relatórios Inteligentes</h3>
          <p className="text-white/70 mb-6">Configure relatórios automáticos diários, semanais e mensais</p>
          <ReportsConfigDialog />
        </div>
      )}
    </div>
  );
}
