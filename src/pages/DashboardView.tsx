
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
  Eye
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const mockData = [
  { name: 'Jan', value: 400, revenue: 2400 },
  { name: 'Fev', value: 300, revenue: 1398 },
  { name: 'Mar', value: 200, revenue: 9800 },
  { name: 'Abr', value: 278, revenue: 3908 },
  { name: 'Mai', value: 189, revenue: 4800 },
  { name: 'Jun', value: 239, revenue: 3800 },
];

const kpis = [
  {
    title: "Receita Total",
    value: "R$ 234.567",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    gradient: "from-verdash-blue to-verdash-cyan"
  },
  {
    title: "Usuários Ativos",
    value: "12.543",
    change: "+8.2%",
    trend: "up", 
    icon: Users,
    gradient: "from-verdash-blue to-verdash-cyan"
  },
  {
    title: "Taxa de Conversão",
    value: "3.4%",
    change: "-2.1%",
    trend: "down",
    icon: Target,
    gradient: "from-verdash-red to-verdash-coral"
  },
  {
    title: "Sessões",
    value: "89.123",
    change: "+15.3%",
    trend: "up",
    icon: Activity,
    gradient: "from-verdash-blue to-verdash-cyan"
  }
];

const DashboardView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock dashboard data based on ID
  const dashboardData = {
    1: { name: "Performance de Vendas", project: "E-commerce Principal" },
    2: { name: "Marketing ROI", project: "Marketing Digital" },
    3: { name: "Funil de Conversão", project: "Vendas B2B" },
  };

  const dashboard = dashboardData[id as keyof typeof dashboardData] || dashboardData[1];

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
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-verdash-cyan/30 text-verdash-cyan">
                {dashboard.project}
              </Badge>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">Última atualização: 2 horas atrás</span>
            </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index} className="verdash-card verdash-card-hover verdash-hover-scale">
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
                <p className="text-sm font-medium text-muted-foreground mb-1">{kpi.title}</p>
                <p className="text-3xl font-bold text-foreground mb-2">{kpi.value}</p>
                <div className="flex items-center">
                  <span className={`text-sm font-semibold ${
                    kpi.trend === "up" ? "text-verdash-cyan" : "text-verdash-red"
                  }`}>
                    {kpi.change}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">vs. mês anterior</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="verdash-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-semibold">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-verdash-blue to-verdash-cyan flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              Tendência de Receita
            </CardTitle>
            <CardDescription className="text-muted-foreground">Evolução mensal da receita</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name" 
                  stroke="white"
                  fontSize={12}
                  tick={{ fill: 'white' }}
                />
                <YAxis 
                  stroke="white"
                  fontSize={12}
                  tick={{ fill: 'white' }}
                />
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
                  dataKey="revenue" 
                  stroke="url(#verdashGradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#1042F6', strokeWidth: 2, r: 6 }}
                />
                <defs>
                  <linearGradient id="verdashGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1042F6" />
                    <stop offset="100%" stopColor="#00FFB0" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="verdash-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-semibold">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-verdash-blue to-verdash-cyan flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              Usuários por Mês
            </CardTitle>
            <CardDescription className="text-muted-foreground">Crescimento da base de usuários</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name" 
                  stroke="white"
                  fontSize={12}
                  tick={{ fill: 'white' }}
                />
                <YAxis 
                  stroke="white"
                  fontSize={12}
                  tick={{ fill: 'white' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(16, 24, 44, 0.95)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: 'white'
                  }} 
                />
                <Bar dataKey="value" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00FFB0" />
                    <stop offset="100%" stopColor="#1042F6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
