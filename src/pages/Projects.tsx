
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
    color: 'bg-blue-500'
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
    color: 'bg-green-500'
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
    color: 'bg-purple-500'
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
    color: 'bg-orange-500'
  }
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || project.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projetos</h1>
          <p className="text-muted-foreground">Gerencie todos os seus projetos e dashboards</p>
        </div>
        <Button className="verdash-gradient">
          <Plus className="w-4 h-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Pesquisar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("all")}
          >
            Todos
          </Button>
          <Button 
            variant={filter === "active" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("active")}
          >
            Ativos
          </Button>
          <Button 
            variant={filter === "inactive" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("inactive")}
          >
            Inativos
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="verdash-card hover:shadow-lg transition-all duration-200 group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${project.color} rounded-lg flex items-center justify-center`}>
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge 
                      variant={project.status === 'active' ? 'default' : 'secondary'}
                      className={project.status === 'active' ? 'bg-green-500/10 text-green-500' : ''}
                    >
                      {project.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover border border-border">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Configurações
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="mt-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <span className="text-2xl font-bold text-foreground">{project.dashboards}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Dashboards</p>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-2xl font-bold text-foreground">{project.users}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Usuários</p>
                </div>
              </div>

              {/* Metrics */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Métricas principais:</p>
                <div className="flex flex-wrap gap-1">
                  {project.metrics.map((metric, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {metric}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Last Update */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>Atualizado em {new Date(project.lastUpdate).toLocaleDateString('pt-BR')}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Abrir
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Nenhum projeto encontrado</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Tente ajustar sua pesquisa" : "Comece criando seu primeiro projeto"}
          </p>
          <Button className="verdash-gradient">
            <Plus className="w-4 h-4 mr-2" />
            Criar Projeto
          </Button>
        </div>
      )}
    </div>
  );
};

export default Projects;
