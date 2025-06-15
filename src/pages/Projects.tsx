import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Users, 
  BarChart3,
  Calendar,
  Settings,
  Eye,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { NewProjectDialog } from "@/components/projects/NewProjectDialog";

const mockProjects = [
  {
    id: '1',
    name: 'E-commerce Principal',
    description: 'Dashboard completo para análise de vendas online',
    dashboards: 5,
    users: 12,
    status: 'active',
    lastUpdate: '2024-01-15',
    metrics: ['Receita', 'Conversão', 'CAC', 'LTV'],
    gradient: 'from-verdash-blue to-verdash-cyan'
  },
  {
    id: '2', 
    name: 'Marketing Digital',
    description: 'Análise de campanhas e performance de marketing',
    dashboards: 8,
    users: 6,
    status: 'active',
    lastUpdate: '2024-01-14',
    metrics: ['ROAS', 'CPC', 'CTR', 'Impressões'],
    gradient: 'from-verdash-cyan to-verdash-coral'
  },
  {
    id: '3',
    name: 'Vendas B2B',
    description: 'Acompanhamento do pipeline e conversões B2B',
    dashboards: 3,
    users: 8,
    status: 'inactive',
    lastUpdate: '2024-01-10',
    metrics: ['Pipeline', 'Oportunidades', 'Fechamento'],
    gradient: 'from-verdash-coral to-verdash-red'
  },
  {
    id: '4',
    name: 'Suporte ao Cliente',
    description: 'Métricas de atendimento e satisfação',
    dashboards: 2,
    users: 15,
    status: 'active',
    lastUpdate: '2024-01-13',
    metrics: ['Tickets', 'SLA', 'CSAT', 'NPS'],
    gradient: 'from-verdash-red to-verdash-blue'
  }
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const navigate = useNavigate();

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || project.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleOpenProject = (projectId: string, projectName: string) => {
    console.log(`Opening project: ${projectId}`);
    toast.success(`Abrindo projeto "${projectName}"`);
    // Navigate to project dashboard
    navigate(`/dashboard?project=${projectId}`);
  };

  const handleProjectSettings = (projectId: string, projectName: string) => {
    console.log(`Opening settings for project: ${projectId}`);
    toast.success(`Configurações do projeto "${projectName}"`);
    // Navigate to project settings (could be a new page or modal)
    navigate(`/projects/${projectId}/settings`);
  };

  const handleDeleteProject = (projectId: string, projectName: string) => {
    console.log(`Deleting project: ${projectId}`);
    toast.success(`Projeto "${projectName}" removido`);
    // In a real app, this would call an API to delete the project
  };

  const handleCreateProject = (projectData: any) => {
    console.log('Creating new project:', projectData);
    toast.success(`Projeto "${projectData.name}" criado com sucesso!`);
    setIsNewProjectDialogOpen(false);
    // In a real app, this would call an API to create the project
    // and then navigate to the new project
    navigate('/dashboard');
  };

  return (
    <div className="space-y-8 animate-verdash-fade-in font-jakarta">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Projetos</h1>
          <p className="text-muted-foreground text-lg">Gerencie todos os seus projetos e dashboards</p>
        </div>
        <Button 
          className="verdash-btn-primary verdash-hover-scale"
          onClick={() => setIsNewProjectDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Pesquisar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-card/50 border-border/50 rounded-xl h-12 text-foreground placeholder:text-muted-foreground focus:border-verdash-cyan verdash-animate"
          />
        </div>
        <div className="flex gap-3">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("all")}
            className={filter === "all" ? "verdash-btn-primary" : "border-border/50 hover:border-border verdash-animate"}
          >
            Todos
          </Button>
          <Button 
            variant={filter === "active" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("active")}
            className={filter === "active" ? "verdash-btn-primary" : "border-border/50 hover:border-border verdash-animate"}
          >
            Ativos
          </Button>
          <Button 
            variant={filter === "inactive" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("inactive")}
            className={filter === "inactive" ? "verdash-btn-primary" : "border-border/50 hover:border-border verdash-animate"}
          >
            Inativos
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="verdash-card verdash-card-hover verdash-hover-scale group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${project.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <BarChart3 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">{project.name}</CardTitle>
                    <Badge 
                      variant={project.status === 'active' ? 'default' : 'secondary'}
                      className={project.status === 'active' 
                        ? 'bg-gradient-to-r from-verdash-success/20 to-verdash-cyan/20 text-verdash-success border-verdash-success/30 mt-2' 
                        : 'bg-gradient-to-r from-verdash-error/20 to-verdash-coral/20 text-verdash-error border-verdash-error/30 mt-2'
                      }
                    >
                      {project.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 verdash-animate hover:bg-sidebar-accent/30">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border border-border/50 rounded-xl">
                    <DropdownMenuItem 
                      className="hover:bg-sidebar-accent/30 verdash-animate"
                      onClick={() => handleOpenProject(project.id, project.name)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="hover:bg-sidebar-accent/30 verdash-animate"
                      onClick={() => handleProjectSettings(project.id, project.name)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Configurações
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border/30" />
                    <DropdownMenuItem 
                      className="text-verdash-error hover:bg-verdash-error/10 verdash-animate"
                      onClick={() => handleDeleteProject(project.id, project.name)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="mt-3 text-muted-foreground">
                {project.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-card/30 to-card/10 rounded-xl border border-border/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-verdash-cyan" />
                    <span className="text-2xl font-bold text-foreground">{project.dashboards}</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">Dashboards</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-card/30 to-card/10 rounded-xl border border-border/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-verdash-coral" />
                    <span className="text-2xl font-bold text-foreground">{project.users}</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">Usuários</p>
                </div>
              </div>

              {/* Metrics */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Métricas principais:</p>
                <div className="flex flex-wrap gap-2">
                  {project.metrics.map((metric, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-border/30 hover:border-verdash-cyan/50 verdash-animate">
                      {metric}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Last Update */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Atualizado em {new Date(project.lastUpdate).toLocaleDateString('pt-BR')}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button 
                  size="sm" 
                  className="flex-1 verdash-btn-primary"
                  onClick={() => handleOpenProject(project.id, project.name)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Abrir
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-border/50 hover:border-border verdash-animate"
                  onClick={() => handleProjectSettings(project.id, project.name)}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-verdash-blue to-verdash-cyan rounded-xl flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Nenhum projeto encontrado</h3>
          <p className="text-muted-foreground mb-6 text-lg">
            {searchTerm ? "Tente ajustar sua pesquisa" : "Comece criando seu primeiro projeto"}
          </p>
          <Button 
            className="verdash-btn-primary verdash-hover-scale"
            onClick={() => setIsNewProjectDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Criar Projeto
          </Button>
        </div>
      )}

      {/* New Project Dialog */}
      <NewProjectDialog
        open={isNewProjectDialogOpen}
        onOpenChange={setIsNewProjectDialogOpen}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
};

export default Projects;
