
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, AlertTriangle } from "lucide-react";

interface NewAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateAlert: (alert: {
    name: string;
    client: string;
    metric: string;
    status: 'active' | 'inactive';
    conditions: string;
  }) => void;
  clients: string[];
}

interface AlertCondition {
  id: string;
  metric: string;
  operator: string;
  value: string;
}

export const NewAlertDialog = ({ open, onOpenChange, onCreateAlert, clients }: NewAlertDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    status: 'active' as 'active' | 'inactive'
  });

  const [conditions, setConditions] = useState<AlertCondition[]>([
    { id: '1', metric: '', operator: '>', value: '' }
  ]);

  const metrics = [
    'Custo por Click (CPC)',
    'Taxa de Conversão',
    'Custo por Aquisição (CPA)',
    'ROAS',
    'Impressões',
    'Cliques',
    'CTR'
  ];

  const operators = [
    { value: '>', label: 'Maior que' },
    { value: '<', label: 'Menor que' },
    { value: '>=', label: 'Maior ou igual a' },
    { value: '<=', label: 'Menor ou igual a' },
    { value: '=', label: 'Igual a' }
  ];

  const handleAddCondition = () => {
    const newCondition: AlertCondition = {
      id: Date.now().toString(),
      metric: '',
      operator: '>',
      value: ''
    };
    setConditions(prev => [...prev, newCondition]);
  };

  const handleRemoveCondition = (conditionId: string) => {
    if (conditions.length > 1) {
      setConditions(prev => prev.filter(c => c.id !== conditionId));
    }
  };

  const handleConditionChange = (conditionId: string, field: keyof AlertCondition, value: string) => {
    setConditions(prev => prev.map(c => 
      c.id === conditionId ? { ...c, [field]: value } : c
    ));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.client || conditions.some(c => !c.metric || !c.value)) {
      return;
    }

    const conditionsText = conditions
      .filter(c => c.metric && c.value)
      .map(c => `${c.metric} ${c.operator} ${c.value}`)
      .join(' E ');

    onCreateAlert({
      name: formData.name,
      client: formData.client,
      metric: conditions[0].metric,
      status: formData.status,
      conditions: conditionsText
    });

    // Reset form
    setFormData({ name: '', client: '', status: 'active' });
    setConditions([{ id: '1', metric: '', operator: '>', value: '' }]);
    onOpenChange(false);
  };

  const isValid = formData.name && formData.client && conditions.every(c => c.metric && c.value);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl verdash-glass border-verdash-divider">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-verdash-cyan" />
            <div>
              <DialogTitle className="text-white font-grotesk text-xl">
                Criar Novo Alerta
              </DialogTitle>
              <DialogDescription className="text-white/70">
                Configure um alerta personalizado para suas métricas
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 max-h-96 overflow-y-auto">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="text-white font-grotesk font-medium">Informações Básicas</h3>
            
            <div className="space-y-2">
              <Label className="text-white/80">Nome do Alerta</Label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-verdash-input-bg border border-verdash-divider/30 rounded-lg px-3 py-2 text-white text-sm focus:border-verdash-cyan focus:outline-none"
                placeholder="Ex: CPC Alto - Google Ads"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/80">Cliente/Projeto</Label>
              <select
                value={formData.client}
                onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                className="w-full bg-verdash-input-bg border border-verdash-divider/30 rounded-lg px-3 py-2 text-white text-sm focus:border-verdash-cyan focus:outline-none"
              >
                <option value="">Selecione um cliente</option>
                {clients.map(client => (
                  <option key={client} value={client}>{client}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-white/80">Status Inicial</Label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full bg-verdash-input-bg border border-verdash-divider/30 rounded-lg px-3 py-2 text-white text-sm focus:border-verdash-cyan focus:outline-none"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
          </div>

          {/* Condições do Alerta */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-grotesk font-medium">Condições</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddCondition}
                className="verdash-btn-secondary text-xs"
              >
                <Plus className="w-3 h-3 mr-1" />
                Adicionar
              </Button>
            </div>

            <div className="space-y-3">
              {conditions.map((condition, index) => (
                <div key={condition.id} className="p-3 rounded-lg border border-verdash-divider/30 bg-verdash-input-bg/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/60 text-xs">Condição {index + 1}</span>
                    {conditions.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCondition(condition.id)}
                        className="w-6 h-6 p-0 text-white/50 hover:text-verdash-error"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <Label className="text-white/60 text-xs">Métrica</Label>
                      <select
                        value={condition.metric}
                        onChange={(e) => handleConditionChange(condition.id, 'metric', e.target.value)}
                        className="w-full bg-verdash-input-bg border border-verdash-divider/30 rounded px-2 py-1 text-white text-xs focus:border-verdash-cyan focus:outline-none"
                      >
                        <option value="">Selecione</option>
                        {metrics.map(metric => (
                          <option key={metric} value={metric}>{metric}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-white/60 text-xs">Operador</Label>
                      <select
                        value={condition.operator}
                        onChange={(e) => handleConditionChange(condition.id, 'operator', e.target.value)}
                        className="w-full bg-verdash-input-bg border border-verdash-divider/30 rounded px-2 py-1 text-white text-xs focus:border-verdash-cyan focus:outline-none"
                      >
                        {operators.map(op => (
                          <option key={op.value} value={op.value}>{op.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-white/60 text-xs">Valor</Label>
                      <input
                        type="text"
                        value={condition.value}
                        onChange={(e) => handleConditionChange(condition.id, 'value', e.target.value)}
                        className="w-full bg-verdash-input-bg border border-verdash-divider/30 rounded px-2 py-1 text-white text-xs focus:border-verdash-cyan focus:outline-none"
                        placeholder="Ex: 2.5"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-verdash-divider/30">
          <Button
            variant="outline"
            className="flex-1 verdash-btn-secondary"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            className="flex-1 verdash-btn-primary"
            onClick={handleSubmit}
            disabled={!isValid}
          >
            Criar Alerta
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
