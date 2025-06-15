
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";

interface MetricsFiltersProps {
  searchTerm: string;
  selectedCategory: string;
  selectedStatus: string;
  selectedProject: string;
  selectedSources: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onProjectChange: (value: string) => void;
  onSourcesChange: (sources: string[]) => void;
  onClearFilters: () => void;
}

const categories = [
  { value: 'all', label: 'Todas as Categorias' },
  { value: 'marketing', label: '📊 Marketing' },
  { value: 'sales', label: '💰 Vendas' },
  { value: 'finance', label: '🏦 Financeiro' },
  { value: 'operations', label: '⚙️ Operações' },
  { value: 'custom', label: '🎯 Personalizada' }
];

const statuses = [
  { value: 'all', label: 'Todos os Status' },
  { value: 'active', label: '✅ Ativa' },
  { value: 'inactive', label: '⏸️ Inativa' },
  { value: 'warning', label: '⚠️ Atenção' },
  { value: 'error', label: '❌ Erro' }
];

const projects = [
  { value: 'all', label: 'Todos os Projetos' },
  { value: 'ecommerce', label: 'E-commerce Principal' },
  { value: 'marketing', label: 'Marketing Digital' },
  { value: 'b2b', label: 'Vendas B2B' },
  { value: 'global', label: 'Global' }
];

const dataSources = [
  { id: 'meta_ads', name: 'Meta Ads', icon: '📱' },
  { id: 'google_ads', name: 'Google Ads', icon: '🔍' },
  { id: 'crm', name: 'CRM', icon: '👥' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
  { id: 'analytics', name: 'Analytics', icon: '📊' },
  { id: 'sheets', name: 'Planilhas', icon: '📋' }
];

export const MetricsFilters = ({
  searchTerm,
  selectedCategory,
  selectedStatus,
  selectedProject,
  selectedSources,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onProjectChange,
  onSourcesChange,
  onClearFilters
}: MetricsFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters = selectedCategory !== 'all' || 
                          selectedStatus !== 'all' || 
                          selectedProject !== 'all' || 
                          selectedSources.length > 0 ||
                          searchTerm.trim() !== '';

  const toggleSource = (sourceId: string) => {
    const newSources = selectedSources.includes(sourceId)
      ? selectedSources.filter(id => id !== sourceId)
      : [...selectedSources, sourceId];
    onSourcesChange(newSources);
  };

  const removeSource = (sourceId: string) => {
    onSourcesChange(selectedSources.filter(id => id !== sourceId));
  };

  return (
    <Card className="verdash-glass">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-verdash-input-bg/10 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-verdash-cyan" />
                <div>
                  <CardTitle className="text-white font-grotesk">Filtros</CardTitle>
                  <CardDescription className="text-white/60">
                    {hasActiveFilters ? 'Filtros aplicados' : 'Refine sua busca'}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <Badge variant="secondary" className="bg-verdash-cyan/20 text-verdash-cyan">
                    Ativos
                  </Badge>
                )}
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-white/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-white/60" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Busca */}
            <div className="space-y-2">
              <Label className="text-white font-medium">Buscar Métricas</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <Input
                  placeholder="Nome, descrição ou fórmula..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 bg-verdash-input-bg border-verdash-divider text-white placeholder:text-white/40"
                />
              </div>
            </div>

            {/* Filtros Principais */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-white font-medium">Categoria</Label>
                <Select value={selectedCategory} onValueChange={onCategoryChange}>
                  <SelectTrigger className="bg-verdash-input-bg border-verdash-divider text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-verdash-background border-verdash-divider">
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white font-medium">Status</Label>
                <Select value={selectedStatus} onValueChange={onStatusChange}>
                  <SelectTrigger className="bg-verdash-input-bg border-verdash-divider text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-verdash-background border-verdash-divider">
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white font-medium">Projeto</Label>
                <Select value={selectedProject} onValueChange={onProjectChange}>
                  <SelectTrigger className="bg-verdash-input-bg border-verdash-divider text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-verdash-background border-verdash-divider">
                    {projects.map((project) => (
                      <SelectItem key={project.value} value={project.value}>
                        {project.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Fontes de Dados */}
            <div className="space-y-3">
              <Label className="text-white font-medium">Fontes de Dados</Label>
              
              {/* Selected Sources */}
              {selectedSources.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedSources.map((sourceId) => {
                    const source = dataSources.find(s => s.id === sourceId);
                    return source ? (
                      <Badge
                        key={sourceId}
                        variant="default"
                        className="bg-verdash-cyan/20 text-verdash-cyan border-verdash-cyan/30 flex items-center gap-1"
                      >
                        <span>{source.icon}</span>
                        {source.name}
                        <button
                          onClick={() => removeSource(sourceId)}
                          className="ml-1 hover:bg-verdash-cyan/30 rounded-full"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}

              {/* Available Sources */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {dataSources.map((source) => (
                  <button
                    key={source.id}
                    onClick={() => toggleSource(source.id)}
                    className={`p-2 text-left rounded-lg border transition-colors ${
                      selectedSources.includes(source.id)
                        ? 'border-verdash-cyan bg-verdash-cyan/10'
                        : 'border-verdash-divider/50 hover:border-verdash-divider hover:bg-verdash-input-bg/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{source.icon}</span>
                      <span className="text-sm text-white">{source.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="pt-4 border-t border-verdash-divider/30">
                <Button
                  variant="outline"
                  onClick={onClearFilters}
                  className="w-full bg-verdash-input-bg/50 border-verdash-divider hover:bg-verdash-input-bg text-white"
                >
                  <X className="w-4 h-4 mr-2" />
                  Limpar Filtros
                </Button>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
