
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  BarChart3, 
  Plus,
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

const recentMetrics = [
  { id: 1, name: "CAC - Custo de Aquisição", project: "E-commerce Principal", value: "R$ 45,30", status: "active" },
  { id: 2, name: "LTV - Lifetime Value", project: "Marketing Digital", value: "R$ 230,45", status: "active" },
  { id: 3, name: "ROI - Retorno do Investimento", project: "Vendas B2B", value: "15.4%", status: "warning" },
  { id: 4, name: "Churn Rate", project: "E-commerce Principal", value: "2.3%", status: "active" },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-verdash-fade-in font-jakarta">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-lg">Visão geral dos seus dados e métricas</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-border/50 hover:border-border verdash-animate">
            <Eye className="w-4 h-4 mr-2" />
            Visualizar
          </Button>
          <Button className="verdash-btn-primary verdash-hover-scale">
            <Plus className="w-4 h-4 mr-2" />
            Novo Dashboard
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
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--foreground))" 
                  fontSize={12}
                  tick={{ fill: 'hsl(var(--foreground))' }}
                />
                <YAxis 
                  stroke="hsl(var(--foreground))" 
                  fontSize={12}
                  tick={{ fill: 'hsl(var(--foreground))' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    color: 'hsl(var(--foreground))'
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
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--foreground))" 
                  fontSize={12}
                  tick={{ fill: 'hsl(var(--foreground))' }}
                />
                <YAxis 
                  stroke="hsl(var(--foreground))" 
                  fontSize={12}
                  tick={{ fill: 'hsl(var(--foreground))' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    color: 'hsl(var(--foreground))'
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

      {/* Recent Metrics */}
      <Card className="verdash-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold mb-2">Métricas Recentes</CardTitle>
              <CardDescription className="text-muted-foreground">Suas métricas personalizadas mais utilizadas</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-border/50 hover:border-border verdash-animate">
              Ver Todas
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMetrics.map((metric) => (
              <div key={metric.id} className="flex items-center justify-between p-5 rounded-xl border border-border/30 hover:border-border/50 bg-card/20 hover:bg-card/40 verdash-animate">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-verdash-blue to-verdash-cyan flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{metric.name}</p>
                    <p className="text-sm text-muted-foreground">{metric.project}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-foreground">{metric.value}</span>
                  <Badge 
                    variant={metric.status === 'active' ? 'default' : 'secondary'}
                    className={metric.status === 'active' 
                      ? 'bg-gradient-to-r from-verdash-cyan/20 to-verdash-blue/20 text-verdash-cyan border-verdash-cyan/30' 
                      : 'bg-gradient-to-r from-verdash-red/20 to-verdash-coral/20 text-verdash-red border-verdash-red/30'
                    }
                  >
                    {metric.status === 'active' ? 'Ativo' : 'Atenção'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
