
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Target, Calculator } from "lucide-react";
import { toast } from "sonner";

const customMetrics = [
  { name: "Custo/lead Meta", value: "R$999,99" },
  { name: "Custo por lead Real - CRM", value: "R$999,99" },
  { name: "Custo por Lead qualificado", value: "R$999,99" },
  { name: "Custo por visita agendada", value: "R$999,99" },
  { name: "Custo por Briefing", value: "R$999,99" },
  { name: "Custo por Desenho de planta", value: "R$999,99" },
  { name: "Custo por Negociação", value: "R$999,99" },
  { name: "Custo por Ap. agendada", value: "R$999,99" }
];

const dataSources = [
  { id: 'meta_ads', name: 'Meta Ads', icon: '📱' },
  { id: 'google_ads', name: 'Google Ads', icon: '🔍' },
  { id: 'crm', name: 'CRM', icon: '👥' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
  { id: 'planilha', name: 'Planilha', icon: '📊' },
  { id: 'webhook', name: 'Webhook', icon: '🔗' }
];

const formulaFunctions = [
  'SUM', 'AVG', 'COUNT', 'MIN', 'MAX', 'IF', 'AND', 'OR'
];

interface CustomMetricsProps {
  onNewMetric?: () => void;
}

export const CustomMetrics = ({ onNewMetric }: CustomMetricsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [metricName, setMetricName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const [formula, setFormula] = useState("");

  const handleCreateMetric = () => {
    if (!metricName || !formula) {
      toast.error("Nome e fórmula são obrigatórios");
      return;
    }

    toast.success("Métrica criada com sucesso!");
    setIsDialogOpen(false);
    resetForm();
    onNewMetric?.();
  };

  const resetForm = () => {
    setMetricName("");
    setDescription("");
    setSelectedProject("");
    setSelectedDataSources([]);
    setFormula("");
  };

  const insertFormulaFunction = (func: string) => {
    setFormula(prev => prev + `${func}()`);
  };

  return (
    <Card className="verdash-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Métricas De Custo</CardTitle>
            <CardDescription>Métricas personalizadas de custo por ação</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="verdash-btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Nova Métrica
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-sm border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Criar Nova Métrica</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Configure sua métrica personalizada com fórmulas e fontes de dados
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="metric-name" className="text-foreground">Nome da Métrica *</Label>
                    <Input
                      id="metric-name"
                      value={metricName}
                      onChange={(e) => setMetricName(e.target.value)}
                      placeholder="Ex: CAC - Custo de Aquisição"
                      className="mt-1 bg-background/50 border-border"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="metric-description" className="text-foreground">Descrição</Label>
                    <Textarea
                      id="metric-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Descreva o que esta métrica representa..."
                      className="mt-1 bg-background/50 border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="metric-project" className="text-foreground">Projeto</Label>
                    <Select value={selectedProject} onValueChange={setSelectedProject}>
                      <SelectTrigger className="mt-1 bg-background/50 border-border">
                        <SelectValue placeholder="Selecione um projeto" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        <SelectItem value="ecommerce">E-commerce Principal</SelectItem>
                        <SelectItem value="marketing">Marketing Digital</SelectItem>
                        <SelectItem value="b2b">Vendas B2B</SelectItem>
                        <SelectItem value="global">Global (Todos os projetos)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Data Sources */}
                <div>
                  <Label className="text-foreground">Fontes de Dados</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {dataSources.map((source) => (
                      <div
                        key={source.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedDataSources.includes(source.id)
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:bg-muted/50'
                        }`}
                        onClick={() => {
                          setSelectedDataSources(prev =>
                            prev.includes(source.id)
                              ? prev.filter(id => id !== source.id)
                              : [...prev, source.id]
                          );
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{source.icon}</span>
                          <span className="text-sm font-medium text-foreground">{source.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Formula Builder */}
                <div>
                  <Label htmlFor="formula" className="text-foreground">Fórmula *</Label>
                  <div className="space-y-3 mt-2">
                    {/* Function Buttons */}
                    <div className="flex flex-wrap gap-2">
                      {formulaFunctions.map((func) => (
                        <Button
                          key={func}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => insertFormulaFunction(func)}
                          className="text-xs"
                        >
                          {func}
                        </Button>
                      ))}
                    </div>

                    {/* Formula Input */}
                    <Textarea
                      id="formula"
                      value={formula}
                      onChange={(e) => setFormula(e.target.value)}
                      placeholder="Ex: SUM(marketing_spend) / COUNT(new_customers)"
                      className="font-mono text-sm bg-background/50 border-border"
                      rows={4}
                    />
                    
                    <p className="text-xs text-muted-foreground">
                      Use as funções acima ou digite sua própria fórmula. Você pode referenciar campos das fontes de dados selecionadas.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleCreateMetric} className="flex-1 verdash-gradient">
                    <Calculator className="w-4 h-4 mr-2" />
                    Criar Métrica
                  </Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customMetrics.map((metric, index) => (
            <div key={index} className="p-4 rounded-lg border border-border/30 hover:border-border/50 bg-card/20 hover:bg-card/40 verdash-animate">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-verdash-blue to-verdash-cyan flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{metric.name}</p>
                  <p className="text-xl font-bold text-foreground">{metric.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
