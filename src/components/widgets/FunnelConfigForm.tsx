
import { useState, useEffect } from "react";
import { Widget, FunnelStage } from "@/types/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface FunnelConfigFormProps {
  widget: Widget;
  onUpdate: (updatedWidget: Widget) => void;
}

interface Metric {
  id: string;
  name: string;
  category: string;
}

const iconOptions = [
  { value: 'Users', label: 'Usuários' },
  { value: 'UserCheck', label: 'Usuário Verificado' },
  { value: 'Calendar', label: 'Calendário' },
  { value: 'Calculator', label: 'Calculadora' },
  { value: 'FileText', label: 'Documento' },
  { value: 'MessageSquare', label: 'Chat' },
  { value: 'Clock', label: 'Relógio' },
  { value: 'DollarSign', label: 'Dinheiro' },
  { value: 'CheckCircle', label: 'Check' },
  { value: 'Target', label: 'Alvo' }
];

const colorOptions = [
  '#1042F6', '#00FFB0', '#FF6F1B', '#FF4757', '#9c88ff', 
  '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#34495e'
];

// Mock de métricas - na implementação real, isso viria de uma API
const getClientMetrics = (clientId?: string): Metric[] => {
  // Simulando métricas específicas do cliente
  const allMetrics: Metric[] = [
    { id: 'leads', name: 'Leads Totais', category: 'Marketing' },
    { id: 'leads_qualificados', name: 'Leads Qualificados', category: 'Marketing' },
    { id: 'visitas_agendadas', name: 'Visitas Agendadas', category: 'Vendas' },
    { id: 'propostas_enviadas', name: 'Propostas Enviadas', category: 'Vendas' },
    { id: 'orcamentos', name: 'Orçamentos Criados', category: 'Vendas' },
    { id: 'aguardando_pagamento', name: 'Aguardando Pagamento', category: 'Financeiro' },
    { id: 'vendas', name: 'Vendas Fechadas', category: 'Vendas' },
    { id: 'receita', name: 'Receita Total', category: 'Financeiro' },
    { id: 'custo_aquisicao', name: 'Custo de Aquisição', category: 'Marketing' },
    { id: 'ltv', name: 'Lifetime Value', category: 'Financeiro' },
    { id: 'churn_rate', name: 'Taxa de Churn', category: 'Retenção' },
    { id: 'tempo_ciclo_vendas', name: 'Tempo do Ciclo de Vendas', category: 'Vendas' }
  ];

  // Em uma implementação real, filtrar por cliente
  return allMetrics;
};

export const FunnelConfigForm = ({ 
  widget, 
  onUpdate
}: FunnelConfigFormProps) => {
  const [stages, setStages] = useState<FunnelStage[]>(widget.config.stages || []);
  const [availableMetrics, setAvailableMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    // Carregar métricas do cliente
    // Em uma implementação real, pegar o clientId do contexto do dashboard
    const metrics = getClientMetrics();
    setAvailableMetrics(metrics);
  }, []);

  const addStage = () => {
    const newStage: FunnelStage = {
      step: `Etapa ${stages.length + 1}`,
      value: 0,
      percentage: 0,
      conversion: 0,
      icon: 'Target',
      color: colorOptions[stages.length % colorOptions.length],
      metric: ''
    };
    setStages([...stages, newStage]);
  };

  const removeStage = (index: number) => {
    setStages(stages.filter((_, i) => i !== index));
  };

  const updateStage = (index: number, field: keyof FunnelStage, value: any) => {
    const updatedStages = stages.map((stage, i) => 
      i === index ? { ...stage, [field]: value } : stage
    );
    setStages(updatedStages);
  };

  const calculateConversions = () => {
    const updatedStages = stages.map((stage, index) => {
      if (index === 0) {
        return { ...stage, percentage: 100, conversion: 0 };
      }
      
      const previousValue = stages[index - 1].value;
      const percentage = previousValue > 0 ? (stage.value / stages[0].value) * 100 : 0;
      const conversion = previousValue > 0 ? (stage.value / previousValue) * 100 : 0;
      
      return { ...stage, percentage, conversion };
    });
    
    setStages(updatedStages);
  };

  const handleSave = () => {
    const updatedWidget = {
      ...widget,
      config: {
        ...widget.config,
        stages: stages
      }
    };
    onUpdate(updatedWidget);
  };

  const getMetricsByCategory = (): Record<string, Metric[]> => {
    return availableMetrics.reduce((acc, metric) => {
      if (!acc[metric.category]) {
        acc[metric.category] = [];
      }
      acc[metric.category].push(metric);
      return acc;
    }, {} as Record<string, Metric[]>);
  };

  const metricsByCategory = getMetricsByCategory();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Configurar Funil Comercial</h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={calculateConversions}>
            Calcular Conversões
          </Button>
          <Button size="sm" onClick={addStage}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Etapa
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {stages.map((stage, index) => (
          <Card key={index} className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  <CardTitle className="text-sm">Etapa {index + 1}</CardTitle>
                </div>
                {stages.length > 1 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeStage(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`step-${index}`}>Nome da Etapa</Label>
                  <Input
                    id={`step-${index}`}
                    value={stage.step}
                    onChange={(e) => updateStage(index, 'step', e.target.value)}
                    placeholder="Nome da etapa"
                  />
                </div>
                <div>
                  <Label htmlFor={`value-${index}`}>Valor</Label>
                  <Input
                    id={`value-${index}`}
                    type="number"
                    value={stage.value}
                    onChange={(e) => updateStage(index, 'value', Number(e.target.value))}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`icon-${index}`}>Ícone</Label>
                  <Select 
                    value={stage.icon} 
                    onValueChange={(value) => updateStage(index, 'icon', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`color-${index}`}>Cor</Label>
                  <div className="flex gap-2 flex-wrap">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`w-8 h-8 rounded border-2 ${
                          stage.color === color ? 'border-white' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => updateStage(index, 'color', color)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Métrica</Label>
                  <Select 
                    value={stage.metric || ''} 
                    onValueChange={(value) => updateStage(index, 'metric', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar métrica" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(metricsByCategory).map(([category, metrics]) => (
                        <div key={category}>
                          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground border-b">
                            {category}
                          </div>
                          {metrics.map((metric) => (
                            <SelectItem key={metric.id} value={metric.id}>
                              {metric.name}
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Percentual</Label>
                  <Input
                    value={stage.percentage.toFixed(1) + '%'}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div>
                  <Label>Conversão</Label>
                  <Input
                    value={index === 0 ? '-' : stage.conversion.toFixed(1) + '%'}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancelar</Button>
        <Button onClick={handleSave} className="verdash-btn-primary">
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};
