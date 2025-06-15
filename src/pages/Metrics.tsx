import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Plus, 
  Search, 
  Calculator,
  BarChart3,
  Target,
  TrendingUp,
  Edit,
  Trash2,
  Code,
  Database,
  Zap
} from "lucide-react";
import { toast } from "sonner";
import { availableMetrics } from "@/constants/metricsData";

const mockMetrics = [
  {
    id: '1',
    name: 'CAC - Custo de Aquisição',
    description: 'Custo médio para adquirir um novo cliente',
    formula: 'SUM(marketing_spend) / COUNT(new_customers)',
    dataSources: ['Meta Ads', 'Google Ads', 'CRM'],
    project: 'E-commerce Principal',
    type: 'KPI',
    value: 'R$ 45,30',
    status: 'active',
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    name: 'LTV - Lifetime Value',
    description: 'Valor total que um cliente traz ao longo do relacionamento',
    formula: 'AVG(order_value) * AVG(orders_per_customer) * AVG(customer_lifespan)',
    dataSources: ['CRM', 'E-commerce'],
    project: 'Marketing Digital',
    type: 'KPI',
    value: 'R$ 230,45',
    status: 'active',
    createdAt: '2024-01-08'
  },
  {
    id: '3',
    name: 'ROI Campanhas',
    description: 'Retorno sobre investimento das campanhas de marketing',
    formula: '(revenue - marketing_spend) / marketing_spend * 100',
    dataSources: ['Meta Ads', 'Google Ads', 'Planilha'],
    project: 'Vendas B2B',
    type: 'Percentage',
    value: '15.4%',
    status: 'warning',
    createdAt: '2024-01-05'
  }
];

const dataSources = [
  { id: 'meta_ads', name: 'Meta Ads', icon: '📱' },
  { id: 'google_ads', name: 'Google Ads', icon: '🔍' },
  { id: 'crm', name: 'CRM', icon: '👥' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
  { id: 'spreadsheet', name: 'Planilha', icon: '📊' },
  { id: 'webhook', name: 'Webhook', icon: '🔗' }
];

const formulaFunctions = [
  'SUM', 'AVG', 'COUNT', 'MIN', 'MAX', 'IF', 'AND', 'OR'
];

const Metrics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("list");

  // Form states
  const [metricName, setMetricName] = useState("");
  const [metricDescription, setMetricDescription] = useState("");
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const [formula, setFormula] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const filteredMetrics = mockMetrics.filter(metric => {
    const matchesSearch = metric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         metric.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || metric.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleCreateMetric = () => {
    if (!metricName || !formula) {
      toast.error("Nome e fórmula são obrigatórios");
      return;
    }

    // Simulate API call
    toast.success("Métrica criada com sucesso!");
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setMetricName("");
    setMetricDescription("");
    setSelectedDataSources([]);
    setFormula("");
    setSelectedProject("");
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
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Métricas Personalizadas</h1>
          <p className="text-muted-foreground">Crie e gerencie suas métricas e KPIs customizados</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="verdash-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Nova Métrica
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>Criar Nova Métrica</DialogTitle>
              <DialogDescription>
                Escolha uma métrica pré-definida ou configure uma métrica personalizada
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="available">Métricas Disponíveis</TabsTrigger>
                <TabsTrigger value="create">Criar Personalizada</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
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
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="metric-name">Nome da Métrica *</Label>
                      <Input
                        id="metric-name"
                        value={metricName}
                        onChange={(e) => setMetricName(e.target.value)}
                        placeholder="Ex: CAC - Custo de Aquisição"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="metric-description">Descrição</Label>
                      <Textarea
                        id="metric-description"
                        value={metricDescription}
                        onChange={(e) => setMetricDescription(e.target.value)}
                        placeholder="Descreva o que esta métrica representa..."
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="metric-project">Projeto</Label>
                      <Select value={selectedProject} onValueChange={setSelectedProject}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione um projeto" />
                        </SelectTrigger>
                        <SelectContent>
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
                    <Label>Fontes de Dados</Label>
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
                            <span className="text-sm font-medium">{source.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Formula Builder */}
                  <div>
                    <Label htmlFor="formula">Fórmula *</Label>
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
                        className="font-mono text-sm"
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
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="templates" className="mt-6">
                <ScrollArea className="h-[500px] pr-4">
                  <div className="text-center py-12 text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                    <p>Templates de métricas estão em desenvolvimento.</p>
                    <p className="text-sm">Por enquanto, use as métricas disponíveis ou crie personalizadas.</p>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="list">Lista de Métricas</TabsTrigger>
          <TabsTrigger value="builder">Construtor</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Pesquisar métricas..."
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
                Todas
              </Button>
              <Button 
                variant={filter === "active" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("active")}
              >
                Ativas
              </Button>
              <Button 
                variant={filter === "warning" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("warning")}
              >
                Atenção
              </Button>
            </div>
          </div>

          {/* Metrics List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMetrics.map((metric) => (
              <Card key={metric.id} className="verdash-card hover:shadow-lg transition-all duration-200 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        {metric.type === 'KPI' ? (
                          <Target className="w-6 h-6 text-primary" />
                        ) : (
                          <TrendingUp className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{metric.name}</CardTitle>
                        <Badge 
                          variant={metric.status === 'active' ? 'default' : 'secondary'}
                          className={metric.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}
                        >
                          {metric.status === 'active' ? 'Ativa' : 'Atenção'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="mt-2">
                    {metric.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Current Value */}
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-3xl font-bold text-foreground">{metric.value}</div>
                    <p className="text-sm text-muted-foreground">Valor Atual</p>
                  </div>

                  {/* Formula */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Fórmula:</span>
                    </div>
                    <code className="text-xs bg-muted/30 p-2 rounded block font-mono">
                      {metric.formula}
                    </code>
                  </div>

                  {/* Data Sources */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Fontes de Dados:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {metric.dataSources.map((source, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Project */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Projeto:</span>
                    <span className="font-medium">{metric.project}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredMetrics.length === 0 && (
            <div className="text-center py-12">
              <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Nenhuma métrica encontrada</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Tente ajustar sua pesquisa" : "Comece criando sua primeira métrica personalizada"}
              </p>
              <Button className="verdash-gradient" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Criar Métrica
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          <Card className="verdash-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Construtor Avançado de Métricas
              </CardTitle>
              <CardDescription>
                Use o construtor visual para criar métricas complexas com múltiplas fontes de dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                <p>O construtor visual estará disponível em breve.</p>
                <p className="text-sm">Por enquanto, use o formulário de criação de métricas.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Metrics;
