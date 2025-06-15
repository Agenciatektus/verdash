
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
    color: "text-green-500"
  },
  {
    title: "Usuários Ativos",
    value: "12.543",
    change: "+8.2%",
    trend: "up", 
    icon: Users,
    color: "text-blue-500"
  },
  {
    title: "Taxa de Conversão",
    value: "3.4%",
    change: "-2.1%",
    trend: "down",
    icon: Target,
    color: "text-red-500"
  },
  {
    title: "Sessões",
    value: "89.123",
    change: "+15.3%",
    trend: "up",
    icon: Activity,
    color: "text-purple-500"
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
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral dos seus dados e métricas</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Visualizar
          </Button>
          <Button className="verdash-gradient">
            <Plus className="w-4 h-4 mr-2" />
            Novo Dashboard
          </Button>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index} className="verdash-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                </div>
                <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
              </div>
              <div className="flex items-center mt-4">
                {kpi.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  kpi.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  {kpi.change}
                </span>
                <span className="text-sm text-muted-foreground ml-1">vs. mês anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="verdash-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Tendência de Receita
            </CardTitle>
            <CardDescription>Evolução mensal da receita</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="verdash-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Usuários por Mês
            </CardTitle>
            <CardDescription>Crescimento da base de usuários</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
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
              <CardTitle>Métricas Recentes</CardTitle>
              <CardDescription>Suas métricas personalizadas mais utilizadas</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Ver Todas
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMetrics.map((metric) => (
              <div key={metric.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{metric.name}</p>
                    <p className="text-sm text-muted-foreground">{metric.project}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-foreground">{metric.value}</span>
                  <Badge 
                    variant={metric.status === 'active' ? 'default' : 'secondary'}
                    className={metric.status === 'active' ? 'bg-green-500/10 text-green-500' : ''}
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
