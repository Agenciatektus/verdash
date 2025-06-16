import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Edit,
  Share,
  Download,
  Settings,
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  BarChart3,
  Activity,
  Target,
  Eye,
  Zap,
  ShoppingCart,
  Brain
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { DonutChartWidget } from "@/components/widgets/DonutChartWidget";
import { BarChartWidget } from "@/components/widgets/BarChartWidget";
import { LineChartWidget } from "@/components/widgets/LineChartWidget";
import { AreaChartWidget } from "@/components/widgets/AreaChartWidget";
import { PieChartWidget } from "@/components/widgets/PieChartWidget";
import { TableWidget } from "@/components/widgets/TableWidget";
import { FunnelWidget } from "@/components/widgets/FunnelWidget";
import { KPIWidget } from "@/components/widgets/KPIWidget";
import { mockWidgets, mockWidgetData } from "@/data/mockWidgetData";

const revenueData = [
  { name: 'Jan', value: 450000, target: 400000 },
  { name: 'Fev', value: 520000, target: 450000 },
  { name: 'Mar', value: 480000, target: 500000 },
  { name: 'Abr', value: 610000, target: 550000 },
  { name: 'Mai', value: 580000, target: 580000 },
  { name: 'Jun', value: 720000, target: 600000 },
  { name: 'Jul', value: 680000, target: 650000 },
  { name: 'Ago', value: 750000, target: 700000 },
  { name: 'Set', value: 820000, target: 750000 },
  { name: 'Out', value: 890000, target: 800000 },
  { name: 'Nov', value: 950000, target: 850000 },
  { name: 'Dez', value: 1050000, target: 900000 }
];

const channelData = [
  { name: 'E-commerce', value: 45, color: '#1042F6' },
  { name: 'Vendas Diretas', value: 28, color: '#00FFB0' },
  { name: 'Marketplace', value: 15, color: '#FF6F1B' },
  { name: 'Parcerias', value: 8, color: '#FF4757' },
  { name: 'Outros', value: 4, color: '#9c88ff' }
];

const performanceData = [
  { name: 'Ana Silva', vendas: 145, meta: 120 },
  { name: 'Carlos Santos', vendas: 132, meta: 120 },
  { name: 'Maria Oliveira', vendas: 128, meta: 120 },
  { name: 'João Pedro', vendas: 118, meta: 120 },
  { name: 'Fernanda Costa', vendas: 112, meta: 120 },
  { name: 'Rafael Lima', vendas: 108, meta: 120 }
];

const userEngagementData = [
  { month: 'Jul', dau: 12500, mau: 35000, sessions: 45000 },
  { month: 'Ago', dau: 13200, mau: 36500, sessions: 48000 },
  { month: 'Set', dau: 12800, mau: 35800, sessions: 46500 },
  { month: 'Out', dau: 14100, mau: 38200, sessions: 52000 },
  { month: 'Nov', dau: 13900, mau: 37800, sessions: 50500 },
  { month: 'Dez', dau: 15200, mau: 40100, sessions: 55000 }
];

const kpis = [
  {
    title: "Receita Total",
    value: "R$ 1.234.567",
    change: "+18.5%",
    trend: "up",
    icon: DollarSign,
    gradient: "from-verdash-blue to-verdash-cyan",
    description: "vs. mês anterior"
  },
  {
    title: "Usuários Ativos",
    value: "15.243",
    change: "+12.8%",
    trend: "up", 
    icon: Users,
    gradient: "from-verdash-blue to-verdash-cyan",
    description: "DAU este mês"
  },
  {
    title: "Taxa de Conversão",
    value: "4.2%",
    change: "+0.8%",
    trend: "up",
    icon: Target,
    gradient: "from-verdash-blue to-verdash-cyan",
    description: "funil principal"
  },
  {
    title: "NPS Score",
    value: "72",
    change: "+4 pts",
    trend: "up",
    icon: Brain,
    gradient: "from-verdash-blue to-verdash-cyan",
    description: "satisfação geral"
  },
  {
    title: "Churn Rate",
    value: "2.1%",
    change: "-0.7%",
    trend: "up",
    icon: Activity,
    gradient: "from-verdash-blue to-verdash-cyan",
    description: "cancelamentos mensais"
  },
  {
    title: "Vendas Hoje",
    value: "R$ 45.890",
    change: "+23.4%",
    trend: "up",
    icon: ShoppingCart,
    gradient: "from-verdash-blue to-verdash-cyan",
    description: "vs. ontem"
  }
];

const DashboardView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock dashboard data based on ID
  const dashboardData = {
    1: { name: "Dashboard Executivo", project: "Visão Geral C-Level", description: "KPIs executivos e performance geral" },
    2: { name: "Dashboard de Vendas", project: "Comercial", description: "Funil de vendas e performance comercial" },
    3: { name: "Dashboard de Marketing", project: "Marketing Digital", description: "ROI de campanhas e geração de leads" },
  };

  const dashboardId = id ? parseInt(id) : 1;
  const dashboard = dashboardData[dashboardId as keyof typeof dashboardData] || dashboardData[1];

  const handleEdit = () => {
    navigate(`/dashboard-editor/${id}`);
  };

  return (
    <div className="space-y-8 animate-verdash-fade-in font-jakarta">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboards')}
            className="verdash-btn-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">{dashboard.name}</h1>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="border-verdash-cyan/30 text-verdash-cyan">
                {dashboard.project}
              </Badge>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">Última atualização: 5 min atrás</span>
            </div>
            <p className="text-muted-foreground">{dashboard.description}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="verdash-btn-secondary">
            <Share className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
          <Button variant="outline" className="verdash-btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={handleEdit} className="verdash-btn-primary">
            <Edit className="w-4 h-4 mr-2" />
            Editar Dashboard
          </Button>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index} className="verdash-card verdash-card-hover verdash-hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.gradient} flex items-center justify-center`}>
                  <kpi.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-verdash-cyan" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{kpi.title}</p>
                <p className="text-2xl font-bold text-foreground mb-2">{kpi.value}</p>
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-verdash-cyan">
                    {kpi.change}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">{kpi.description}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evolução da Receita (LineChart) */}
        <div className="lg:col-span-2">
          <LineChartWidget widget={mockWidgets.find(w => w.type === 'line-chart')!} data={mockWidgetData['6']} />
        </div>
        {/* Receita por Canal (DonutChart) */}
        <DonutChartWidget widget={mockWidgets.find(w => w.type === 'donut-chart')!} data={mockWidgetData['7']} />
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance por Vendedor (BarChart) */}
        <BarChartWidget widget={mockWidgets.find(w => w.type === 'bar-chart')!} data={mockWidgetData['8']} />
        {/* Top Produtos (TableWidget) */}
        <TableWidget widget={mockWidgets.find(w => w.type === 'table')!} data={mockWidgetData['9']} />
      </div>
    </div>
  );
};

export default DashboardView;
