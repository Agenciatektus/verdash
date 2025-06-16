import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  BarChart3, 
  Plus,
  Activity,
  Target,
  Eye,
  Zap,
  MessageCircle,
  Award,
  Wallet,
  RefreshCw,
  UserX
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { DashboardTemplatesDialog } from "@/components/dashboard/DashboardTemplatesDialog";
import { EnhancedDateRangeFilter } from "@/components/dashboard/EnhancedDateRangeFilter";
import { WidgetVisibilityFilter } from "@/components/dashboard/WidgetVisibilityFilter";
import { KPIWidget } from "@/components/widgets/KPIWidget";
import { DonutChartWidget } from "@/components/widgets/DonutChartWidget";
import { BarChartWidget } from "@/components/widgets/BarChartWidget";
import { LineChartWidget } from "@/components/widgets/LineChartWidget";
import { TableWidget } from "@/components/widgets/TableWidget";
import { FunnelWidget } from "@/components/widgets/FunnelWidget";
import { mockWidgets, mockWidgetData } from "@/data/mockWidgetData";
import { AreaChartWidget } from "@/components/widgets/AreaChartWidget";

// Dados mockados para os gráficos
const revenueData = [
  { month: 'Jan', receita: 125000, investimento: 45000, leads: 1250, mrr: 85000 },
  { month: 'Fev', receita: 148000, investimento: 52000, leads: 1380, mrr: 92000 },
  { month: 'Mar', receita: 167000, investimento: 48000, leads: 1520, mrr: 98000 },
  { month: 'Abr', receita: 195000, investimento: 55000, leads: 1680, mrr: 105000 },
  { month: 'Mai', receita: 234000, investimento: 62000, leads: 1850, mrr: 112000 },
  { month: 'Jun', receita: 267000, investimento: 68000, leads: 2100, mrr: 118000 }
];

const investmentByChannel = [
  { month: 'Jan', meta: 18000, google: 15000, whatsapp: 8000, organico: 2000, offline: 2000 },
  { month: 'Fev', meta: 22000, google: 18000, whatsapp: 7000, organico: 3000, offline: 2000 },
  { month: 'Mar', meta: 20000, google: 16000, whatsapp: 7000, organico: 3000, offline: 2000 },
  { month: 'Abr', meta: 25000, google: 18000, whatsapp: 7000, organico: 3000, offline: 2000 },
  { month: 'Mai', meta: 28000, google: 22000, whatsapp: 7000, organico: 3000, offline: 2000 },
  { month: 'Jun', meta: 32000, google: 24000, whatsapp: 7000, organico: 3000, offline: 2000 }
];

const channelRevenue = [
  { name: 'Meta Ads', value: 85000, color: '#1877F2' },
  { name: 'Google Ads', value: 72000, color: '#4285F4' },
  { name: 'WhatsApp', value: 35000, color: '#25D366' },
  { name: 'Orgânico', value: 45000, color: '#00FFB0' },
  { name: 'Offline', value: 30000, color: '#FF6F1B' }
];

const funnelData = [
  { stage: 'Leads Gerados', value: 2100, conversion: 100 },
  { stage: 'Qualificados', value: 1470, conversion: 70 },
  { stage: 'Propostas', value: 735, conversion: 50 },
  { stage: 'Negociação', value: 367, conversion: 50 },
  { stage: 'Fechamento', value: 147, conversion: 40 }
];

const conversionByChannel = [
  { channel: 'Meta Ads', leads: 850, vendas: 68, taxa: 8.0 },
  { channel: 'Google Ads', leads: 720, vendas: 50, taxa: 6.9 },
  { channel: 'WhatsApp', vendas: 15, leads: 350, taxa: 4.3 },
  { channel: 'Orgânico', leads: 130, vendas: 10, taxa: 7.7 },
  { channel: 'Offline', leads: 50, vendas: 4, taxa: 8.0 }
];

// KPIs principais expandidos com novos indicadores financeiros
const mainKpis = [
  {
    title: "Receita Total",
    value: "R$ 267.000",
    previousValue: "R$ 234.000",
    target: "R$ 280.000",
    change: "+14.1%",
    trend: "up",
    icon: DollarSign,
    gradient: "from-verdash-blue to-verdash-cyan"
  },
  {
    title: "Investimento Total",
    value: "R$ 68.000",
    previousValue: "R$ 62.000",
    change: "+9.7%",
    trend: "up",
    icon: BarChart3,
    gradient: "from-verdash-coral to-verdash-red"
  },
  {
    title: "ROI Médio",
    value: "292%",
    previousValue: "277%",
    target: "300%",
    change: "+5.4%",
    trend: "up",
    icon: TrendingUp,
    gradient: "from-verdash-blue to-verdash-cyan"
  },
  {
    title: "Leads Gerados",
    value: "2.100",
    previousValue: "1.850",
    target: "2.200",
    change: "+13.5%",
    trend: "up",
    icon: Users,
    gradient: "from-verdash-blue to-verdash-cyan"
  }
];

const financialKpis = [
  {
    title: "Conversões (Vendas)",
    value: "147",
    previousValue: "128",
    target: "160",
    change: "+14.8%",
    trend: "up",
    icon: Target,
    gradient: "from-verdash-blue to-verdash-cyan"
  },
  {
    title: "Meta vs Realizado",
    value: "95.4%",
    previousValue: "89.2%",
    target: "100%",
    change: "+6.9%",
    trend: "up",
    icon: Award,
    gradient: "from-verdash-coral to-verdash-red"
  },
  {
    title: "MRR",
    value: "R$ 118.000",
    previousValue: "R$ 112.000",
    target: "R$ 125.000",
    change: "+5.4%",
    trend: "up",
    icon: RefreshCw,
    gradient: "from-verdash-blue to-verdash-cyan"
  },
  {
    title: "LTV",
    value: "R$ 15.840",
    previousValue: "R$ 14.200",
    target: "R$ 18.000",
    change: "+11.5%",
    trend: "up",
    icon: TrendingUp,
    gradient: "from-verdash-blue to-verdash-cyan"
  },
  {
    title: "Churn Rate",
    value: "3.2%",
    previousValue: "4.1%",
    target: "2.5%",
    change: "-21.9%",
    trend: "up",
    icon: UserX,
    gradient: "from-verdash-cyan to-verdash-blue"
  },
  {
    title: "Valor em Caixa",
    value: "R$ 485.000",
    previousValue: "R$ 427.000",
    change: "+13.6%",
    trend: "up",
    icon: Wallet,
    gradient: "from-verdash-blue to-verdash-cyan"
  }
];

const additionalKpis = [
  {
    title: "SLA Atendimento",
    value: "2h 15m",
    target: "2h",
    status: "warning",
    icon: Activity
  },
  {
    title: "Volume WhatsApp",
    value: "3.247",
    change: "+8.2%",
    status: "success",
    icon: MessageCircle
  },
  {
    title: "NPS Clientes",
    value: "8.7",
    target: "9.0",
    status: "success",
    icon: Award
  },
  {
    title: "Receita Nova vs Perdida",
    value: "+R$ 142k",
    change: "Nova: +R$ 165k | Churn: -R$ 23k",
    status: "success",
    icon: TrendingUp
  }
];

const Dashboard = () => {
  const [activeFilters, setActiveFilters] = useState({
    canal: 'all',
    time: 'all',
    regiao: 'all'
  });
  const [widgetVisibility, setWidgetVisibility] = useState<any>({});

  const handleCreateDashboard = (templateId: string) => {
    console.log('Creating dashboard with template:', templateId);
  };

  const handleApplyFilters = () => {
    console.log('Aplicando filtros:', activeFilters);
    // Aqui você pode implementar a lógica para aplicar os filtros
    // Por exemplo, fazer uma chamada para API ou atualizar o estado global
  };

  const handleVisualizeDashboard = () => {
    // Abre o dashboard em uma nova aba
    window.open('/', '_blank');
  };

  const handleWidgetVisibilityChange = (widgets: any[]) => {
    const visibilityMap = widgets.reduce((acc, widget) => {
      acc[widget.id] = widget.enabled;
      return acc;
    }, {});
    setWidgetVisibility(visibilityMap);
  };

  const isWidgetVisible = (widgetId: string) => {
    return widgetVisibility[widgetId] !== false; // Default to true if not set
  };

  return (
    <div className="relative space-y-8 animate-verdash-fade-in font-jakarta w-full flex flex-col p-0">
      {/* Aero Radial Gradient Background */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at -200px -200px, rgba(0, 255, 176, 0.3) 0%, rgba(10, 14, 30, 0) 50%)`,
          filter: 'blur(100px)'
        }}
      />
      
      {/* Granulado overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Content Container with higher z-index */}
      <div className="relative z-10 w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 font-grotesk">Dashboard Principal</h1>
            <p className="text-muted-foreground text-lg font-inter">Visão executiva completa da saúde do seu negócio</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="verdash-animate"
              onClick={handleVisualizeDashboard}
            >
              <Eye className="w-4 h-4 mr-2" />
              Visualizar
            </Button>
            <DashboardTemplatesDialog onCreateDashboard={handleCreateDashboard} />
          </div>
        </div>

        {/* Filtros Globais */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground font-grotesk">Filtros Globais</h2>
          <div className="flex flex-wrap items-center gap-4 p-6 bg-card/20 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Período</label>
              <EnhancedDateRangeFilter />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Canal</label>
              <Select value={activeFilters.canal} onValueChange={(value) => setActiveFilters(prev => ({...prev, canal: value}))}>
                <SelectTrigger className="w-[160px] border-0 bg-white/5 backdrop-blur-sm">
                  <SelectValue placeholder="Todos os canais" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os canais</SelectItem>
                  <SelectItem value="meta">Meta Ads</SelectItem>
                  <SelectItem value="google">Google Ads</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="organico">Orgânico</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Time</label>
              <Select value={activeFilters.time} onValueChange={(value) => setActiveFilters(prev => ({...prev, time: value}))}>
                <SelectTrigger className="w-[160px] border-0 bg-white/5 backdrop-blur-sm">
                  <SelectValue placeholder="Todos os times" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os times</SelectItem>
                  <SelectItem value="trafego">Tráfego</SelectItem>
                  <SelectItem value="vendas">Vendas</SelectItem>
                  <SelectItem value="cs">Customer Success</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Região</label>
              <Select value={activeFilters.regiao} onValueChange={(value) => setActiveFilters(prev => ({...prev, regiao: value}))}>
                <SelectTrigger className="w-[160px] border-0 bg-white/5 backdrop-blur-sm">
                  <SelectValue placeholder="Todas as regiões" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as regiões</SelectItem>
                  <SelectItem value="sudeste">Sudeste</SelectItem>
                  <SelectItem value="sul">Sul</SelectItem>
                  <SelectItem value="nordeste">Nordeste</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Widgets</label>
              <WidgetVisibilityFilter onWidgetVisibilityChange={handleWidgetVisibilityChange} />
            </div>

            <Button className="verdash-btn-primary mt-6" onClick={handleApplyFilters}>
              <Zap className="w-4 h-4 mr-2" />
              Aplicar Filtros
            </Button>
          </div>
        </div>

        {/* ===================== KPIs de Impacto e Saúde do Negócio ===================== */}
        <div className="space-y-8 mt-12">
          <h2 className="text-2xl font-bold text-foreground font-grotesk flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-verdash-blue to-verdash-cyan flex items-center justify-center">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="white"/></svg>
            </div>
            KPIs de Impacto e Saúde do Negócio
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <KPIWidget widget={{ ...mockWidgets[0], title: 'Receita Total do Período', config: { ...mockWidgets[0].config, value: 267000, previousValue: 234000, target: 280000, format: 'currency' } }} />
            <KPIWidget widget={{ ...mockWidgets[1], title: 'Investimento Total em Tráfego', config: { ...mockWidgets[1].config, value: 68000, previousValue: 62000, target: 70000, format: 'currency' } }} />
            <KPIWidget widget={{ ...mockWidgets[2], title: 'ROI Médio no Período', config: { ...mockWidgets[2].config, value: 292, previousValue: 277, target: 300, format: 'percentage' } }} />
            <KPIWidget widget={{ ...mockWidgets[2], title: 'Leads Gerados no Período', config: { ...mockWidgets[2].config, value: 2100, previousValue: 1850, target: 2200, format: 'number' } }} />
            <KPIWidget widget={{ ...mockWidgets[2], title: 'Conversões (Vendas)', config: { ...mockWidgets[2].config, value: 147, previousValue: 128, target: 160, format: 'number' } }} />
            <KPIWidget widget={{ ...mockWidgets[2], title: 'Meta vs Realizado (%)', config: { ...mockWidgets[2].config, value: 95.4, previousValue: 89.2, target: 100, format: 'percentage' } }} />
            <KPIWidget widget={{ ...mockWidgets[4], title: 'Churn Rate (%)', config: { ...mockWidgets[4].config, value: 3.2, previousValue: 4.1, target: 2.5, format: 'percentage' } }} />
            <KPIWidget widget={{ ...mockWidgets[2], title: 'MRR (Receita Recorrente Mensal)', config: { ...mockWidgets[2].config, value: 118000, previousValue: 112000, target: 125000, format: 'currency' } }} />
            <KPIWidget widget={{ ...mockWidgets[2], title: 'LTV (Lifetime Value)', config: { ...mockWidgets[2].config, value: 15840, previousValue: 14200, target: 18000, format: 'currency' } }} />
            <KPIWidget widget={{ ...mockWidgets[2], title: 'Valor em Caixa Atual', config: { ...mockWidgets[2].config, value: 485000, previousValue: 427000, target: undefined, format: 'currency' } }} />
          </div>
        </div>

        {/* ===================== Linha Intermediária: Funil Comercial + KPIs do Funil ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {/* Funil Comercial SVG */}
          <div>
            {(() => {
              const funnelWidget = mockWidgets.find(w => w.type === 'funnel');
              // Dados reais do funil comercial
              const funnelStages = [
                { stage: 'Novos Leads', value: 3200, percentage: 100 },
                { stage: 'MQLs', value: 1800, percentage: 56.3 },
                { stage: 'Agendamentos', value: 950, percentage: 29.7 },
                { stage: 'Reuniões', value: 600, percentage: 18.8 },
                { stage: 'Vendas', value: 210, percentage: 6.6 }
              ];
              return funnelWidget && (
                <FunnelWidget 
                  widget={{
                    ...funnelWidget,
                    config: {
                      ...funnelWidget.config,
                      stages: funnelStages.map((stage, index) => ({
                        step: stage.stage,
                        value: stage.value,
                        percentage: stage.percentage,
                        conversion: index === 0 ? 0 : (stage.value / funnelStages[index - 1].value * 100),
                        icon: 'Users',
                        color: ['#1042F6', '#00FFB0', '#FF6F1B', '#9c88ff', '#FF4757'][index % 5],
                        metric: 'leads'
                      }))
                    }
                  }}
                />
              );
            })()}
          </div>
          {/* KPIs do Funil */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <KPIWidget widget={{ ...mockWidgets[2], title: 'CPL (Custo por Lead)', config: { ...mockWidgets[2].config, value: 32, previousValue: 35, target: 30, format: 'currency' } }} />
            <KPIWidget widget={{ ...mockWidgets[2], title: 'Custo por MQL', config: { ...mockWidgets[2].config, value: 57, previousValue: 60, target: 50, format: 'currency' } }} />
            <KPIWidget widget={{ ...mockWidgets[2], title: 'Custo por Agendamento', config: { ...mockWidgets[2].config, value: 108, previousValue: 120, target: 100, format: 'currency' } }} />
            <KPIWidget widget={{ ...mockWidgets[2], title: 'Custo por Reunião', config: { ...mockWidgets[2].config, value: 170, previousValue: 180, target: 150, format: 'currency' } }} />
            <KPIWidget widget={{ ...mockWidgets[2], title: 'SQLs (Oportunidades)', config: { ...mockWidgets[2].config, value: 420, previousValue: 390, target: 500, format: 'number' } }} />
            <KPIWidget widget={{ ...mockWidgets[2], title: 'CPA (Custo por Aquisição)', config: { ...mockWidgets[2].config, value: 310, previousValue: 340, target: 300, format: 'currency' } }} />
            <KPIWidget widget={{ ...mockWidgets[2], title: 'Ticket Médio', config: { ...mockWidgets[2].config, value: 1850, previousValue: 1700, target: 2000, format: 'currency' } }} />
            <KPIWidget widget={{ ...mockWidgets[2], title: 'Taxa de Conversão Geral (%)', config: { ...mockWidgets[2].config, value: 6.6, previousValue: 5.9, target: 8, format: 'percentage' } }} />
            <KPIWidget widget={{ ...mockWidgets[2], title: 'ROAS', config: { ...mockWidgets[2].config, value: 4.2, previousValue: 3.8, target: 5, format: 'number' } }} />
          </div>
        </div>

        {/* ===================== Linha Inferior: Gráficos de Performance ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <LineChartWidget widget={mockWidgets.find(w => w.type === 'line-chart')} data={mockWidgetData['6']} />
          <AreaChartWidget widget={{ ...mockWidgets[6], type: 'area-chart', title: 'Receita e Leads por Canal', config: { ...mockWidgets[6].config, xAxisKey: 'date', yAxisKey: 'value', colors: ['#00FFB0', '#1042F6'], showGrid: true } }} data={mockWidgetData['6']} />
          <BarChartWidget widget={{ ...mockWidgets[8], type: 'bar-chart', title: 'Investimento por Canal', config: { ...mockWidgets[8].config, xAxisKey: 'name', yAxisKey: 'value', colors: ['#1042F6'], showGrid: true } }} data={mockWidgetData['8']} />
          <DonutChartWidget widget={{ ...mockWidgets[7], type: 'donut-chart', title: 'Participação dos Canais', config: { ...mockWidgets[7].config, dataKey: 'value', colors: ['#1042F6', '#00FFB0', '#FF6F1B', '#FF4757', '#9c88ff'], showLegend: true } }} data={mockWidgetData['7']} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
