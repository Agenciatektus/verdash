
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  Plus, 
  Search, 
  Settings, 
  Zap,
  Sheet,
  Globe,
  Webhook,
  Calculator,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw
} from "lucide-react";
import { DataSourceCard } from "@/components/data/DataSourceCard";
import { MetricBuilder } from "@/components/data/MetricBuilder";
import { DataSource, CalculatedMetric } from "@/types/data";

const mockDataSources: DataSource[] = [
  {
    id: '1',
    name: 'Planilha Vendas 2024',
    type: 'google_sheets',
    status: 'connected',
    lastSync: '2024-01-15T10:30:00Z',
    recordCount: 15420,
    config: {
      sheetId: '1ABC123xyz',
      range: 'A1:Z1000'
    },
    fields: [
      { id: '1', name: 'data_venda', type: 'date', isCalculated: false },
      { id: '2', name: 'valor_venda', type: 'number', isCalculated: false },
      { id: '3', name: 'produto', type: 'string', isCalculated: false },
      { id: '4', name: 'vendedor', type: 'string', isCalculated: false }
    ],
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Meta Ads - Campanhas',
    type: 'meta_ads',
    status: 'syncing',
    lastSync: '2024-01-15T09:45:00Z',
    recordCount: 2340,
    config: {
      apiKey: 'meta_****_****'
    },
    fields: [
      { id: '5', name: 'gasto_campanha', type: 'number', isCalculated: false },
      { id: '6', name: 'impressoes', type: 'number', isCalculated: false },
      { id: '7', name: 'cliques', type: 'number', isCalculated: false },
      { id: '8', name: 'conversoes', type: 'number', isCalculated: false }
    ],
    createdAt: '2024-01-12T14:20:00Z',
    updatedAt: '2024-01-15T09:45:00Z'
  },
  {
    id: '3',
    name: 'CRM Leads',
    type: 'crm',
    status: 'error',
    lastSync: '2024-01-14T16:20:00Z',
    recordCount: 0,
    config: {
      apiKey: 'crm_****_****',
      url: 'https://api.crm.com'
    },
    fields: [],
    createdAt: '2024-01-08T11:00:00Z',
    updatedAt: '2024-01-14T16:20:00Z'
  }
];

const mockCalculatedMetrics: CalculatedMetric[] = [
  {
    id: '1',
    name: 'Custo por Lead',
    description: 'Gasto total dividido pelo número de leads gerados',
    formula: '(gasto_meta + gasto_google) / total_leads',
    type: 'currency',
    dependencies: ['gasto_meta', 'gasto_google', 'total_leads'],
    category: 'marketing',
    isActive: true,
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-15T08:30:00Z'
  },
  {
    id: '2',
    name: 'ROI Campanhas',
    description: 'Retorno sobre investimento das campanhas publicitárias',
    formula: '((receita_vendas - gasto_total) / gasto_total) * 100',
    type: 'percentage',
    dependencies: ['receita_vendas', 'gasto_total'],
    category: 'marketing',
    isActive: true,
    createdAt: '2024-01-10T15:30:00Z',
    updatedAt: '2024-01-14T12:15:00Z'
  }
];

const DataAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("sources");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-verdash-success" />;
      case 'syncing':
        return <RefreshCw className="w-4 h-4 text-verdash-info animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-verdash-error" />;
      default:
        return <Clock className="w-4 h-4 text-verdash-disabled" />;
    }
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'google_sheets':
        return <Sheet className="w-5 h-5 text-green-500" />;
      case 'meta_ads':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'api':
        return <Globe className="w-5 h-5 text-purple-500" />;
      case 'webhook':
        return <Webhook className="w-5 h-5 text-orange-500" />;
      default:
        return <Database className="w-5 h-5 text-verdash-cyan" />;
    }
  };

  const filteredSources = mockDataSources.filter(source =>
    source.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMetrics = mockCalculatedMetrics.filter(metric =>
    metric.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white font-grotesk uppercase tracking-wide verdash-glow-text">
            Administração de Dados
          </h1>
          <p className="text-white/70 mt-2 font-inter">
            Gerencie fontes de dados, crie métricas calculadas e configure transformações
          </p>
        </div>
        <Button className="verdash-btn-primary verdash-hover-scale">
          <Plus className="w-5 h-5 mr-2" />
          Nova Fonte
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
        <Input
          placeholder="Pesquisar fontes e métricas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 verdash-glass">
          <TabsTrigger value="sources" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Fontes de Dados
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Métricas Calculadas
          </TabsTrigger>
          <TabsTrigger value="transformations" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Transformações
          </TabsTrigger>
        </TabsList>

        {/* Data Sources Tab */}
        <TabsContent value="sources" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="verdash-kpi">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80">Total de Fontes</p>
                    <p className="text-2xl font-bold text-white">{mockDataSources.length}</p>
                  </div>
                  <Database className="w-8 h-8 text-verdash-cyan" />
                </div>
              </CardContent>
            </Card>

            <Card className="verdash-kpi">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80">Conectadas</p>
                    <p className="text-2xl font-bold text-white">
                      {mockDataSources.filter(s => s.status === 'connected').length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-verdash-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="verdash-kpi">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80">Total de Registros</p>
                    <p className="text-2xl font-bold text-white">
                      {mockDataSources.reduce((sum, s) => sum + s.recordCount, 0).toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-verdash-coral" />
                </div>
              </CardContent>
            </Card>

            <Card className="verdash-kpi">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80">Sincronizando</p>
                    <p className="text-2xl font-bold text-white">
                      {mockDataSources.filter(s => s.status === 'syncing').length}
                    </p>
                  </div>
                  <RefreshCw className="w-8 h-8 text-verdash-info" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Sources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSources.map((source) => (
              <DataSourceCard key={source.id} source={source} />
            ))}
          </div>
        </TabsContent>

        {/* Calculated Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white font-grotesk">Métricas Calculadas</h2>
              <p className="text-white/70 text-sm">Crie fórmulas personalizadas entre suas métricas</p>
            </div>
            <Button className="verdash-btn-primary verdash-hover-scale">
              <Plus className="w-4 h-4 mr-2" />
              Nova Métrica
            </Button>
          </div>

          <MetricBuilder />

          {/* Existing Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMetrics.map((metric) => (
              <Card key={metric.id} className="verdash-glass verdash-glass-hover">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Calculator className="w-6 h-6 text-verdash-cyan" />
                      <div>
                        <CardTitle className="text-white font-grotesk">{metric.name}</CardTitle>
                        <CardDescription className="text-white/60">
                          {metric.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={metric.isActive ? "default" : "secondary"}>
                      {metric.isActive ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-verdash-input-bg/30 rounded-lg p-3 border border-verdash-divider/30">
                      <p className="text-xs text-white/60 uppercase font-grotesk mb-1">Fórmula</p>
                      <code className="text-sm text-verdash-cyan font-mono">{metric.formula}</code>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {metric.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {metric.type}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="verdash-btn-secondary">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="verdash-btn-primary">
                          Editar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Transformations Tab */}
        <TabsContent value="transformations" className="space-y-6">
          <div className="text-center py-12">
            <Zap className="w-16 h-16 text-verdash-cyan mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-white mb-2">Transformações de Dados</h3>
            <p className="text-white/60 mb-6">
              Configure pipelines de transformação, filtros e agregações dos seus dados
            </p>
            <Button className="verdash-btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Criar Transformação
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataAdmin;
