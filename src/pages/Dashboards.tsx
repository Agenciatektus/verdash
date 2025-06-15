
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Plus, BarChart3, Users, Eye } from "lucide-react";
import { DashboardTemplatesDialog } from "@/components/dashboard/DashboardTemplatesDialog";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const mockDashboards = [
  {
    id: 1,
    name: "Performance de Vendas",
    description: "Análise completa de métricas de vendas em tempo real",
    lastUpdate: "2 horas atrás",
    views: 245,
    project: "E-commerce Principal"
  },
  {
    id: 2,
    name: "Marketing ROI",
    description: "Dashboard de retorno sobre investimento em campanhas",
    lastUpdate: "5 horas atrás",
    views: 189,
    project: "Marketing Digital"
  },
  {
    id: 3,
    name: "Funil de Conversão",
    description: "Análise do funil de vendas e pontos de otimização",
    lastUpdate: "1 dia atrás",
    views: 312,
    project: "Vendas B2B"
  }
];

export default function Dashboards() {
  const navigate = useNavigate();

  const handleCreateDashboard = (templateId: string) => {
    if (templateId === 'custom') {
      console.log('Creating custom dashboard...');
      toast.success("Dashboard personalizado criado!");
      // Navigate to dashboard editor
      navigate('/dashboard');
    } else {
      console.log(`Creating dashboard from template: ${templateId}`);
      toast.success("Dashboard criado a partir do template!");
      // Navigate to dashboard editor
      navigate('/dashboard');
    }
  };

  const handleViewDashboard = (dashboardId: number, dashboardName: string) => {
    console.log(`Viewing dashboard: ${dashboardId}`);
    toast.success(`Abrindo dashboard "${dashboardName}"`);
    // Navigate to dashboard view
    navigate('/dashboard');
  };

  const handleEditDashboard = (dashboardId: number, dashboardName: string) => {
    console.log(`Editing dashboard: ${dashboardId}`);
    toast.success(`Editando dashboard "${dashboardName}"`);
    // Navigate to dashboard editor in edit mode
    navigate('/dashboard');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white font-grotesk uppercase tracking-wide">
            Dashboards
          </h1>
          <p className="text-white/70 mt-2 font-inter">
            Gerencie e visualize todos os seus dashboards criados
          </p>
        </div>
        <DashboardTemplatesDialog onCreateDashboard={handleCreateDashboard} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="verdash-kpi">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/80 font-grotesk uppercase">
              Total de Dashboards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">{mockDashboards.length}</div>
            <p className="text-verdash-success text-sm">+2 este mês</p>
          </CardContent>
        </Card>

        <Card className="verdash-kpi">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/80 font-grotesk uppercase">
              Visualizações Totais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">
              {mockDashboards.reduce((sum, dash) => sum + dash.views, 0)}
            </div>
            <p className="text-verdash-success text-sm">+15% esta semana</p>
          </CardContent>
        </Card>

        <Card className="verdash-kpi">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/80 font-grotesk uppercase">
              Média de Uso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">
              {Math.round(mockDashboards.reduce((sum, dash) => sum + dash.views, 0) / mockDashboards.length)}
            </div>
            <p className="text-verdash-info text-sm">views por dashboard</p>
          </CardContent>
        </Card>
      </div>

      {/* Dashboards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDashboards.map((dashboard) => (
          <Card key={dashboard.id} className="verdash-glass verdash-glass-hover">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Brain className="w-8 h-8 text-verdash-cyan" />
                <div className="flex items-center gap-1 text-white/60 text-sm">
                  <Eye className="w-4 h-4" />
                  {dashboard.views}
                </div>
              </div>
              <CardTitle className="text-white font-grotesk">
                {dashboard.name}
              </CardTitle>
              <CardDescription className="text-white/70">
                {dashboard.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Projeto:</span>
                  <span className="text-verdash-cyan font-medium">{dashboard.project}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Última atualização:</span>
                  <span className="text-white">{dashboard.lastUpdate}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1 verdash-btn-primary"
                    onClick={() => handleViewDashboard(dashboard.id, dashboard.name)}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="verdash-btn-secondary"
                    onClick={() => handleEditDashboard(dashboard.id, dashboard.name)}
                  >
                    Editar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
