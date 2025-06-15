
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  BarChart3, 
  Users, 
  Calendar,
  Settings,
  Eye,
  Plus,
  Trash2,
  Edit
} from "lucide-react";
import { toast } from "sonner";

const mockProjects = {
  '1': {
    id: '1',
    name: 'E-commerce Principal',
    description: 'Dashboard completo para análise de vendas online',
    dashboards: [
      { id: 1, name: 'Performance de Vendas', lastUpdate: '2024-01-15', views: 245 },
      { id: 4, name: 'Análise de Conversão', lastUpdate: '2024-01-14', views: 189 },
      { id: 7, name: 'Métricas de Produto', lastUpdate: '2024-01-13', views: 156 }
    ],
    users: 12,
    status: 'active',
    lastUpdate: '2024-01-15',
    metrics: ['Receita', 'Conversão', 'CAC', 'LTV'],
    gradient: 'from-verdash-blue to-verdash-cyan'
  },
  '2': {
    id: '2', 
    name: 'Marketing Digital',
    description: 'Análise de campanhas e performance de marketing',
    dashboards: [
      { id: 2, name: 'Marketing ROI', lastUpdate: '2024-01-14', views: 189 },
      { id: 5, name: 'Campanhas Facebook', lastUpdate: '2024-01-12', views: 167 },
      { id: 6, name: 'Google Ads Performance', lastUpdate: '2024-01-11', views: 134 },
      { id: 8, name: 'Email Marketing', lastUpdate: '2024-01-10', views: 123 },
      { id: 9, name: 'Social Media Analytics', lastUpdate: '2024-01-09', views: 98 }
    ],
    users: 6,
    status: 'active',
    lastUpdate: '2024-01-14',
    metrics: ['ROAS', 'CPC', 'CTR', 'Impressões'],
    gradient: 'from-verdash-cyan to-verdash-coral'
  },
  '3': {
    id: '3',
    name: 'Vendas B2B',
    description: 'Acompanhamento do pipeline e conversões B2B',
    dashboards: [
      { id: 3, name: 'Funil de Conversão', lastUpdate: '2024-01-10', views: 312 },
      { id: 10, name: 'Pipeline de Vendas', lastUpdate: '2024-01-08', views: 201 }
    ],
    users: 8,
    status: 'inactive',
    lastUpdate: '2024-01-10',
    metrics: ['Pipeline', 'Oportunidades', 'Fechamento'],
    gradient: 'from-verdash-coral to-verdash-red'
  }
};

const ProjectView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const project = mockProjects[id as keyof typeof mockProjects];
  
  if (!project) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-foreground mb-4">Projeto não encontrado</h2>
        <p className="text-muted-foreground mb-6">O projeto solicitado não existe ou foi removido.</p>
        <Button onClick={() => navigate('/projects')} className="verdash-btn-primary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar aos Projetos
        </Button>
      </div>
    );
  }

  const handleViewDashboard = (dashboardId: number, dashboardName: string) => {
    console.log(`Opening dashboard: ${dashboardId}`);
    toast.success(`Abrindo dashboard "${dashboardName}"`);
    navigate(`/dashboard-view/${dashboardId}`);
  };

  const handleEditDashboard = (dashboardId: number, dashboardName: string) => {
    console.log(`Editing dashboard: ${dashboardId}`);
    toast.success(`Editando dashboard "${dashboardName}"`);
    navigate(`/dashboard-editor/${dashboardId}`);
  };

  const handleCreateDashboard = () => {
    console.log(`Creating new dashboard for project: ${project.id}`);
    toast.success(`Criando novo dashboard para "${project.name}"`);
    navigate('/dashboard-editor/new');
  };

  return (
    <div className="space-y-8 animate-verdash-fade-in font-jakarta">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/projects')}
            className="verdash-btn-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className={`w-16 h-16 bg-gradient-to-br ${project.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">{project.name}</h1>
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant={project.status === 'active' ? 'default' : 'secondary'}
                className={project.status === 'active' 
                  ? 'bg-gradient-to-r from-verdash-success/20 to-verdash-cyan/20 text-verdash-success border-verdash-success/30' 
                  : 'bg-gradient-to-r from-verdash-error/20 to-verdash-coral/20 text-verdash-error border-verdash-error/30'
                }
              >
                {project.status === 'active' ? 'Ativo' : 'Inativo'}
              </Badge>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{project.dashboards.length} dashboards</span>
            </div>
            <p className="text-muted-foreground text-lg">{project.description}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="verdash-btn-secondary"
            onClick={() => toast.success(`Configurações do projeto "${project.name}"`)}
          >
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </Button>
          <Button 
            className="verdash-btn-primary verdash-hover-scale"
            onClick={handleCreateDashboard}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Dashboard
          </Button>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="verdash-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-verdash-blue to-verdash-cyan flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total de Dashboards</p>
              <p className="text-3xl font-bold text-foreground mb-2">{project.dashboards.length}</p>
              <p className="text-sm text-verdash-cyan">Ativos no projeto</p>
            </div>
          </CardContent>
        </Card>

        <Card className="verdash-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-verdash-coral to-verdash-red flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Usuários com Acesso</p>
              <p className="text-3xl font-bold text-foreground mb-2">{project.users}</p>
              <p className="text-sm text-verdash-coral">Membros da equipe</p>
            </div>
          </CardContent>
        </Card>

        <Card className="verdash-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-verdash-cyan to-verdash-success flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Última Atualização</p>
              <p className="text-lg font-bold text-foreground mb-2">
                {new Date(project.lastUpdate).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-sm text-verdash-success">Dados atualizados</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboards */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Dashboards do Projeto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.dashboards.map((dashboard) => (
            <Card key={dashboard.id} className="verdash-card verdash-card-hover verdash-hover-scale group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-verdash-blue to-verdash-cyan flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Eye className="w-4 h-4" />
                    {dashboard.views}
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold">{dashboard.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Última atualização: {new Date(dashboard.lastUpdate).toLocaleDateString('pt-BR')}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1 verdash-btn-primary"
                    onClick={() => handleViewDashboard(dashboard.id, dashboard.name)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-border/50 hover:border-border verdash-animate"
                    onClick={() => handleEditDashboard(dashboard.id, dashboard.name)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Metrics Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Métricas Principais</h2>
        <div className="flex flex-wrap gap-2">
          {project.metrics.map((metric, index) => (
            <Badge key={index} variant="outline" className="text-sm border-border/30 hover:border-verdash-cyan/50 verdash-animate px-4 py-2">
              {metric}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
