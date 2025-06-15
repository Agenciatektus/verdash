
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
    <div className="relative space-y-8 animate-verdash-fade-in font-jakarta">
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
      <div className="relative z-10">
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

        {/* 🏆 LINHA SUPERIOR - KPIs de Impacto e Saúde do Negócio */}
        {isWidgetVisible('kpis-impact') && (
          <div className="space-y-8 mt-12">
            <h2 className="text-2xl font-bold text-foreground font-grotesk flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-verdash-blue to-verdash-cyan flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              KPIs de Impacto e Saúde do Negócio
            </h2>

            {/* Primeira linha de KPIs - Métricas principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mainKpis.map((kpi, index) => (
                <Card key={index} className="bg-card/20 backdrop-blur-xl rounded-2xl shadow-2xl hover:bg-card/30 hover:shadow-[0_8px_32px_rgba(0,255,176,0.04)] transition-all duration-300 hover:transform hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.gradient} flex items-center justify-center`}>
                        <kpi.icon className="w-6 h-6 text-white" />
                      </div>
                      {kpi.trend === "up" ? (
                        <TrendingUp className="w-5 h-5 text-verdash-cyan" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-verdash-red" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1 font-inter">{kpi.title}</p>
                      <p className="text-3xl font-bold text-foreground mb-2 font-grotesk">{kpi.value}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className={`text-sm font-semibold ${
                            kpi.trend === "up" ? "text-verdash-cyan" : "text-verdash-red"
                          }`}>
                            {kpi.change}
                          </span>
                          <span className="text-sm text-muted-foreground ml-2">vs. período anterior</span>
                        </div>
                        {kpi.target && (
                          <div className="text-xs text-muted-foreground">
                            Meta: {kpi.target}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Segunda linha de KPIs - Métricas financeiras e conversão */}
            {isWidgetVisible('kpis-financial') && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {financialKpis.map((kpi, index) => (
                  <Card key={index} className="bg-card/20 backdrop-blur-xl rounded-2xl shadow-2xl hover:bg-card/30 hover:shadow-[0_8px_32px_rgba(0,255,176,0.04)] transition-all duration-300 hover:transform hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.gradient} flex items-center justify-center`}>
                          <kpi.icon className="w-6 h-6 text-white" />
                        </div>
                        {kpi.trend === "up" ? (
                          <TrendingUp className="w-5 h-5 text-verdash-cyan" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-verdash-red" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1 font-inter">{kpi.title}</p>
                        <p className="text-2xl font-bold text-foreground mb-2 font-grotesk">{kpi.value}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className={`text-sm font-semibold ${
                              kpi.trend === "up" ? "text-verdash-cyan" : "text-verdash-red"
                            }`}>
                              {kpi.change}
                            </span>
                            <span className="text-sm text-muted-foreground ml-2">vs. período anterior</span>
                          </div>
                          {kpi.target && (
                            <div className="text-xs text-muted-foreground">
                              Meta: {kpi.target}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 📈 LINHA INTERMEDIÁRIA - Visão de Performance ao Longo do Tempo */}
        {isWidgetVisible('performance-charts') && (
          <div className="space-y-8 mt-16">
            <h2 className="text-2xl font-bold text-foreground font-grotesk flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-verdash-coral to-verdash-red flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              Performance ao Longo do Tempo
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Linha - Receita, Investimento, Leads e MRR */}
              {isWidgetVisible('revenue-evolution') && (
                <Card className="bg-card/20 backdrop-blur-xl rounded-2xl shadow-2xl hover:bg-card/30 hover:shadow-[0_8px_32px_rgba(0,255,176,0.04)] transition-all duration-300 hover:transform hover:scale-[1.02] lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-white text-xl font-grotesk flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-verdash-blue to-verdash-cyan flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      Evolução de Receita, Investimento, Leads e MRR
                    </CardTitle>
                    <CardDescription className="text-white/70 font-inter">Últimos 6 meses - Visão comparativa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="month" stroke="white" fontSize={12} />
                        <YAxis stroke="white" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(16, 24, 44, 0.95)', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            color: 'white'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="receita" 
                          stroke="#00FFB0" 
                          strokeWidth={3}
                          name="Receita"
                          dot={{ fill: '#00FFB0', strokeWidth: 2, r: 5 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="investimento" 
                          stroke="#FF6F1B" 
                          strokeWidth={3}
                          name="Investimento"
                          dot={{ fill: '#FF6F1B', strokeWidth: 2, r: 5 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="leads" 
                          stroke="#1042F6" 
                          strokeWidth={3}
                          name="Leads"
                          dot={{ fill: '#1042F6', strokeWidth: 2, r: 5 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="mrr" 
                          stroke="#FF3871" 
                          strokeWidth={3}
                          name="MRR"
                          dot={{ fill: '#FF3871', strokeWidth: 2, r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {/* Gráfico de Barras Empilhadas - Investimento por Canal */}
              {isWidgetVisible('investment-by-channel') && (
                <Card className="bg-card/20 backdrop-blur-xl rounded-2xl shadow-2xl hover:bg-card/30 hover:shadow-[0_8px_32px_rgba(0,255,176,0.04)] transition-all duration-300 hover:transform hover:scale-[1.02]">
                  <CardHeader>
                    <CardTitle className="text-white text-lg font-grotesk">Investimento por Canal</CardTitle>
                    <CardDescription className="text-white/70 font-inter">Distribuição mensal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={investmentByChannel}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="month" stroke="white" fontSize={11} />
                        <YAxis stroke="white" fontSize={11} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(16, 24, 44, 0.95)', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            color: 'white'
                          }} 
                          cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }}
                        />
                        <Bar dataKey="meta" stackId="a" fill="#1877F2" name="Meta Ads" />
                        <Bar dataKey="google" stackId="a" fill="#4285F4" name="Google Ads" />
                        <Bar dataKey="whatsapp" stackId="a" fill="#25D366" name="WhatsApp" />
                        <Bar dataKey="organico" stackId="a" fill="#00FFB0" name="Orgânico" />
                        <Bar dataKey="offline" stackId="a" fill="#FF6F1B" name="Offline" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {/* Gráfico de Donut - Participação na Receita */}
              {isWidgetVisible('revenue-participation') && (
                <Card className="bg-card/20 backdrop-blur-xl rounded-2xl shadow-2xl hover:bg-card/30 hover:shadow-[0_8px_32px_rgba(0,255,176,0.04)] transition-all duration-300 hover:transform hover:scale-[1.02]">
                  <CardHeader>
                    <CardTitle className="text-white text-lg font-grotesk">Participação na Receita</CardTitle>
                    <CardDescription className="text-white/70 font-inter">Por canal de aquisição</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={channelRevenue}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {channelRevenue.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(16, 24, 44, 0.95)', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            color: 'white'
                          }} 
                          formatter={(value: any) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Receita']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* 🔍 LINHA INFERIOR - Operações e Funil de Vendas */}
        <div className="space-y-8 mt-16">
          <h2 className="text-2xl font-bold text-foreground font-grotesk flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-verdash-red to-verdash-coral flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            Operações e Funil de Vendas
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Funil de Vendas */}
            {isWidgetVisible('sales-funnel') && (
              <Card className="bg-card/20 backdrop-blur-xl rounded-2xl shadow-2xl hover:bg-card/30 hover:shadow-[0_8px_32px_rgba(0,255,176,0.04)] transition-all duration-300 hover:transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="text-white text-lg font-grotesk">Pipeline de Vendas</CardTitle>
                  <CardDescription className="text-white/70 font-inter">Funil completo do processo comercial</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {funnelData.map((stage, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-white/80">{stage.stage}</span>
                          <div className="text-right">
                            <span className="text-lg font-bold text-white">{stage.value.toLocaleString()}</span>
                            <span className="text-xs text-white/60 ml-2">({stage.conversion}%)</span>
                          </div>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-verdash-blue to-verdash-cyan h-3 rounded-full transition-all duration-300"
                            style={{ width: `${(stage.value / funnelData[0].value) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Conversão por Canal */}
            {isWidgetVisible('conversion-by-channel') && (
              <Card className="bg-card/20 backdrop-blur-xl rounded-2xl shadow-2xl hover:bg-card/30 hover:shadow-[0_8px_32px_rgba(0,255,176,0.04)] transition-all duration-300 hover:transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="text-white text-lg font-grotesk">Taxa de Conversão por Canal</CardTitle>
                  <CardDescription className="text-white/70 font-inter">Performance de cada fonte</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={conversionByChannel} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis type="number" domain={[0, 10]} stroke="white" fontSize={11} />
                      <YAxis dataKey="channel" type="category" stroke="white" fontSize={11} width={80} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(16, 24, 44, 0.95)', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                        formatter={(value: any) => [`${value}%`, 'Taxa de Conversão']}
                        cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }}
                      />
                      <Bar dataKey="taxa" fill="#00FFB0" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </div>

          {/* KPIs Adicionais Expandidos */}
          {isWidgetVisible('additional-kpis') && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalKpis.map((kpi, index) => (
                <Card key={index} className="bg-card/20 backdrop-blur-xl rounded-2xl shadow-2xl hover:bg-card/30 hover:shadow-[0_8px_32px_rgba(0,255,176,0.04)] transition-all duration-300 hover:transform hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                        kpi.status === 'success' ? 'from-verdash-blue to-verdash-cyan' : 
                        kpi.status === 'warning' ? 'from-verdash-coral to-verdash-red' : 
                        'from-gray-600 to-gray-700'
                      } flex items-center justify-center`}>
                        <kpi.icon className="w-5 h-5 text-white" />
                      </div>
                      <Badge 
                        variant={kpi.status === 'success' ? 'default' : 'secondary'}
                        className={kpi.status === 'success' 
                          ? 'bg-verdash-cyan/20 text-verdash-cyan border-verdash-cyan/30' 
                          : 'bg-verdash-coral/20 text-verdash-coral border-verdash-coral/30'
                        }
                      >
                        {kpi.status === 'success' ? 'Bom' : 'Atenção'}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1 font-inter">{kpi.title}</p>
                      <p className="text-xl font-bold text-foreground mb-2 font-grotesk">{kpi.value}</p>
                      {kpi.change && (
                        <p className="text-xs text-verdash-cyan font-inter">{kpi.change}</p>
                      )}
                      {kpi.target && (
                        <p className="text-xs text-muted-foreground font-inter">Meta: {kpi.target}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
