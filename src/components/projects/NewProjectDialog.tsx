
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProject: (projectData: ProjectData) => void;
}

interface ProjectData {
  name: string;
  description: string;
  template: string;
  metrics: string[];
}

const projectTemplates = [
  { id: 'custom', name: 'Projeto Personalizado', description: 'Comece do zero com um projeto em branco' },
  { id: 'ecommerce', name: 'E-commerce', description: 'Dashboard para análise de vendas online' },
  { id: 'marketing', name: 'Marketing Digital', description: 'Métricas de campanhas e performance' },
  { id: 'sales', name: 'Vendas B2B', description: 'Pipeline e conversões de vendas' },
  { id: 'support', name: 'Suporte ao Cliente', description: 'Métricas de atendimento e satisfação' }
];

const commonMetrics = [
  'Receita', 'Conversão', 'CAC', 'LTV', 'ROAS', 'CPC', 'CTR', 'Impressões',
  'Pipeline', 'Oportunidades', 'Fechamento', 'Tickets', 'SLA', 'CSAT', 'NPS'
];

export const NewProjectDialog = ({ open, onOpenChange, onCreateProject }: NewProjectDialogProps) => {
  const [projectData, setProjectData] = useState<ProjectData>({
    name: '',
    description: '',
    template: '',
    metrics: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectData.name && projectData.template) {
      onCreateProject(projectData);
      // Reset form
      setProjectData({
        name: '',
        description: '',
        template: '',
        metrics: []
      });
    }
  };

  const toggleMetric = (metric: string) => {
    setProjectData(prev => ({
      ...prev,
      metrics: prev.metrics.includes(metric)
        ? prev.metrics.filter(m => m !== metric)
        : [...prev.metrics, metric]
    }));
  };

  const selectedTemplate = projectTemplates.find(t => t.id === projectData.template);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Criar Novo Projeto</DialogTitle>
          <DialogDescription>
            Configure os detalhes do seu novo projeto de analytics
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome do Projeto */}
          <div className="space-y-2">
            <Label htmlFor="projectName">Nome do Projeto *</Label>
            <Input
              id="projectName"
              placeholder="Ex: Análise de Vendas 2024"
              value={projectData.name}
              onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="projectDescription">Descrição</Label>
            <Textarea
              id="projectDescription"
              placeholder="Descreva brevemente o objetivo deste projeto..."
              value={projectData.description}
              onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          {/* Template */}
          <div className="space-y-2">
            <Label htmlFor="projectTemplate">Template *</Label>
            <Select 
              value={projectData.template} 
              onValueChange={(value) => setProjectData(prev => ({ ...prev, template: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um template" />
              </SelectTrigger>
              <SelectContent>
                {projectTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-muted-foreground">{template.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedTemplate && (
              <p className="text-sm text-muted-foreground">
                {selectedTemplate.description}
              </p>
            )}
          </div>

          {/* Métricas */}
          <div className="space-y-3">
            <Label>Métricas Principais (opcional)</Label>
            <p className="text-sm text-muted-foreground">
              Selecione as métricas que você pretende acompanhar neste projeto
            </p>
            <div className="flex flex-wrap gap-2">
              {commonMetrics.map((metric) => (
                <Badge
                  key={metric}
                  variant={projectData.metrics.includes(metric) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    projectData.metrics.includes(metric)
                      ? "bg-verdash-cyan text-white"
                      : "hover:bg-verdash-cyan/10"
                  }`}
                  onClick={() => toggleMetric(metric)}
                >
                  {metric}
                  {projectData.metrics.includes(metric) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
            {projectData.metrics.length > 0 && (
              <p className="text-sm text-verdash-cyan">
                {projectData.metrics.length} métrica(s) selecionada(s)
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="verdash-btn-primary"
              disabled={!projectData.name || !projectData.template}
            >
              Criar Projeto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
