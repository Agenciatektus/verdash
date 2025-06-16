import { useState, useEffect } from "react";
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
  Trash2,
  Loader2
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
import { useProjects } from "@/mcp/projects/provider";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const { 
    projects, 
    loading, 
    error, 
    createProject, 
    deleteProject, 
    listProjects 
  } = useProjects();

  useEffect(() => {
    listProjects();
  }, [listProjects]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || project.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleOpenProject = (projectId: string, projectName: string) => {
    console.log(`Opening project: ${projectId}`);
    toast.success(`Abrindo projeto "${projectName}"`);
    navigate(`/projects/${projectId}`);
  };

  const handleProjectSettings = (projectId: string, projectName: string) => {
    console.log(`Opening settings for project: ${projectId}`);
    toast.success(`Configurações do projeto "${projectName}"`);
    navigate(`/projects/${projectId}`);
  };

  const handleDeleteProject = async (projectId: string, projectName: string) => {
    try {
      await deleteProject(projectId);
      toast.success(`Projeto "${projectName}" removido`);
    } catch (error) {
      toast.error(`Erro ao remover projeto "${projectName}"`);
    }
  };

  const handleCreateProject = async (projectData: any) => {
    try {
      await createProject({
        name: projectData.name,
        description: projectData.description,
        ownerId: 'user123', // Em um caso real, isso viria do contexto de autenticação
        members: ['user123'],
        status: 'active',
        settings: {
          visibility: 'private',
          notifications: true,
        },
      });
      toast.success(`Projeto "${projectData.name}" criado com sucesso!`);
      setIsNewProjectDialogOpen(false);
      navigate('/dashboard');
    } catch (error) {
      toast.error(`Erro ao criar projeto "${projectData.name}"`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Erro: {error}
      </div>
    );
  }

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
                  <div className="w-14 h-14 bg-gradient-to-br from-verdash-blue to-verdash-cyan rounded-xl flex items-center justify-center shadow-lg">
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
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleOpenProject(project.id, project.name)}>
                      <Eye className="w-4 h-4 mr-2" />
                      Abrir
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleProjectSettings(project.id, project.name)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Configurações
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-500 focus:text-red-500"
                      onClick={() => handleDeleteProject(project.id, project.name)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{project.members.length} membros</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <NewProjectDialog 
        open={isNewProjectDialogOpen}
        onOpenChange={setIsNewProjectDialogOpen}
        onSubmit={handleCreateProject}
      />
    </div>
  );
};

export default Projects;
