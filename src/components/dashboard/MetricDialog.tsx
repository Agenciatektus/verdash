
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
  const [metricType, setMetricType] = useState("");

  const handleCreateMetric = () => {
    if (!metricName || !formula || !metricType) {
      toast.error("Nome, fórmula e tipo são obrigatórios");
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
    setMetricType("");
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
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-hidden bg-verdash-background border-verdash-divider/30" 
      >
        <DialogHeader>
          <DialogTitle className="text-white font-grotesk">Criar Nova Métrica</DialogTitle>
          <DialogDescription className="text-white/60">
            Escolha uma métrica pré-definida ou configure uma métrica personalizada
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-2 bg-verdash-input-bg/30">
            <TabsTrigger value="available" className="data-[state=active]:bg-verdash-cyan/20 data-[state=active]:text-verdash-cyan">
              Métricas Disponíveis
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-verdash-cyan/20 data-[state=active]:text-verdash-cyan">
              Criar Personalizada
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="mt-6">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-6">
                {Object.entries(availableMetrics).map(([key, category]) => (
                  <div key={key} className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <category.icon className="w-5 h-5 text-verdash-cyan" />
                      <h3 className="text-lg font-semibold text-white font-grotesk">{category.title}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {category.metrics.map((metric, index) => (
                        <button
                          key={index}
                          onClick={() => selectPredefinedMetric(metric)}
                          className="text-left p-3 rounded-lg bg-verdash-input-bg/20 hover:bg-verdash-input-bg/40 transition-all duration-200 group border border-verdash-divider/30 hover:border-verdash-cyan/50"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white group-hover:text-verdash-cyan transition-colors">
                              {metric}
                            </span>
                            <Plus className="w-4 h-4 text-white/60 group-hover:text-verdash-cyan transition-colors" />
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
                    <Label htmlFor="metric-name" className="text-white text-sm font-grotesk">Nome da Métrica *</Label>
                    <Input
                      id="metric-name"
                      value={metricName}
                      onChange={(e) => setMetricName(e.target.value)}
                      placeholder="Ex: CAC - Custo de Aquisição"
                      className="mt-1 bg-verdash-input-bg/50 border-verdash-divider/30 text-white placeholder:text-white/40"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="metric-description" className="text-white text-sm font-grotesk">Descrição</Label>
                    <Textarea
                      id="metric-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Descreva o que esta métrica representa..."
                      className="mt-1 bg-verdash-input-bg/50 border-verdash-divider/30 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="metric-project" className="text-white text-sm font-grotesk">Projeto</Label>
                      <Select value={selectedProject} onValueChange={setSelectedProject}>
                        <SelectTrigger className="mt-1 bg-verdash-input-bg/50 border-verdash-divider/30 text-white">
                          <SelectValue placeholder="Selecione um projeto" />
                        </SelectTrigger>
                        <SelectContent className="bg-verdash-background border-verdash-divider/30">
                          <SelectItem value="ecommerce" className="text-white hover:bg-verdash-input-bg/50">E-commerce Principal</SelectItem>
                          <SelectItem value="marketing" className="text-white hover:bg-verdash-input-bg/50">Marketing Digital</SelectItem>
                          <SelectItem value="b2b" className="text-white hover:bg-verdash-input-bg/50">Vendas B2B</SelectItem>
                          <SelectItem value="global" className="text-white hover:bg-verdash-input-bg/50">Global (Todos os projetos)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="metric-type" className="text-white text-sm font-grotesk">Tipo de Métrica *</Label>
                      <Select value={metricType} onValueChange={setMetricType}>
                        <SelectTrigger className="mt-1 bg-verdash-input-bg/50 border-verdash-divider/30 text-white">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent className="bg-verdash-background border-verdash-divider/30">
                          <SelectItem value="currency" className="text-white hover:bg-verdash-input-bg/50">Moeda (R$)</SelectItem>
                          <SelectItem value="percentage" className="text-white hover:bg-verdash-input-bg/50">Porcentagem (%)</SelectItem>
                          <SelectItem value="number" className="text-white hover:bg-verdash-input-bg/50">Número</SelectItem>
                          <SelectItem value="text" className="text-white hover:bg-verdash-input-bg/50">Texto</SelectItem>
                          <SelectItem value="ratio" className="text-white hover:bg-verdash-input-bg/50">Proporção</SelectItem>
                          <SelectItem value="boolean" className="text-white hover:bg-verdash-input-bg/50">Verdadeiro/Falso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Data Sources */}
                <div>
                  <Label className="text-white text-sm font-grotesk">Fontes de Dados</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {dataSources.map((source) => (
                      <div
                        key={source.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                          selectedDataSources.includes(source.id)
                            ? 'bg-verdash-cyan/10 border-verdash-cyan/50'
                            : 'hover:bg-verdash-input-bg/30 border-verdash-divider/30 hover:border-verdash-divider/50'
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
                          <span className="text-sm font-medium text-white">{source.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Formula Builder */}
                <div>
                  <Label htmlFor="formula" className="text-white text-sm font-grotesk">Fórmula *</Label>
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
                          className="text-xs border-verdash-divider/30 text-white hover:bg-verdash-coral/20 hover:border-verdash-coral"
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
                      placeholder="Ex: (gasto_meta + gasto_google) / total_leads"
                      className="font-mono text-sm bg-verdash-input-bg/50 border-verdash-divider/30 text-white placeholder:text-white/40"
                      rows={4}
                    />
                    
                    <p className="text-xs text-white/60">
                      Use as funções acima ou digite sua própria fórmula. Você pode referenciar campos das fontes de dados selecionadas.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleCreateMetric} className="flex-1 verdash-btn-primary">
                    <Calculator className="w-4 h-4 mr-2" />
                    Criar Métrica
                  </Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="verdash-btn-secondary">
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
