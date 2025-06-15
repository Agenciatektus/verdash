
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Calculator } from "lucide-react";
import { toast } from "sonner";
import { dataSources, formulaFunctions, availableMetrics } from "@/constants/metricsData";

interface MetricDialogProps {
  onNewMetric?: () => void;
}

export const MetricDialog = ({ onNewMetric }: MetricDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const [metricName, setMetricName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const [formula, setFormula] = useState("");
  const [selectedMetric, setSelectedMetric] = useState("");

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
    setSelectedMetric("");
  };

  const insertFormulaFunction = (func: string) => {
    setFormula(prev => prev + `${func}()`);
  };

  const selectPredefinedMetric = (metricName: string) => {
    setMetricName(metricName);
    setActiveTab("create");
    toast.success(`Métrica "${metricName}" selecionada!`);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="verdash-btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Nova Métrica
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-background/95 backdrop-blur-sm border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Criar Nova Métrica</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Escolha uma métrica pré-definida ou configure uma métrica personalizada
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="available">Métricas Disponíveis</TabsTrigger>
            <TabsTrigger value="create">Criar Personalizada</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="mt-6">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-6">
                {Object.entries(availableMetrics).map(([key, category]) => (
                  <div key={key} className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <category.icon className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {category.metrics.map((metric, index) => (
                        <button
                          key={index}
                          onClick={() => selectPredefinedMetric(metric)}
                          className="text-left p-3 rounded-lg border border-border/30 hover:border-border/50 bg-card/20 hover:bg-card/40 transition-all duration-200 group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                              {metric}
                            </span>
                            <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="create" className="mt-6">
            <ScrollArea className="h-[500px] pr-4">
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
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
