
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calculator, 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  Play,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FormulaBuilder } from "@/types/data";

const availableFields = [
  { id: 'gasto_meta', name: 'Gasto Meta Ads', type: 'currency' },
  { id: 'gasto_google', name: 'Gasto Google Ads', type: 'currency' },
  { id: 'total_leads', name: 'Total de Leads', type: 'number' },
  { id: 'vendas_realizadas', name: 'Vendas Realizadas', type: 'number' },
  { id: 'receita_vendas', name: 'Receita de Vendas', type: 'currency' },
  { id: 'visitantes_site', name: 'Visitantes do Site', type: 'number' },
  { id: 'conversoes_landing', name: 'Conversões Landing Page', type: 'number' }
];

const formulaFunctions = [
  { name: 'SUM', description: 'Soma valores', syntax: 'SUM(campo1, campo2, ...)', example: 'SUM(gasto_meta, gasto_google)' },
  { name: 'AVG', description: 'Média', syntax: 'AVG(campo1, campo2, ...)', example: 'AVG(conversoes_janeiro, conversoes_fevereiro)' },
  { name: 'MAX', description: 'Valor máximo', syntax: 'MAX(campo1, campo2, ...)', example: 'MAX(vendas_diarias)' },
  { name: 'MIN', description: 'Valor mínimo', syntax: 'MIN(campo1, campo2, ...)', example: 'MIN(custo_leads)' },
  { name: 'COUNT', description: 'Contar registros', syntax: 'COUNT(campo)', example: 'COUNT(leads_mes)' },
  { name: 'IF', description: 'Condição', syntax: 'IF(condição, valor_se_verdadeiro, valor_se_falso)', example: 'IF(vendas > 1000, vendas * 0.1, 0)' }
];

export const MetricBuilder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [metricName, setMetricName] = useState("");
  const [description, setDescription] = useState("");
  const [formula, setFormula] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [isValid, setIsValid] = useState(false);

  const insertField = (fieldId: string) => {
    setFormula(prev => prev + fieldId);
  };

  const insertFunction = (functionName: string) => {
    setFormula(prev => prev + `${functionName}()`);
  };

  const validateFormula = () => {
    // Simulação de validação
    const hasValidSyntax = formula.length > 0 && formula.includes('(') && formula.includes(')');
    setIsValid(hasValidSyntax);
    return hasValidSyntax;
  };

  const testFormula = () => {
    if (validateFormula()) {
      // Simulação de teste com dados mock
      console.log("Testing formula:", formula);
    }
  };

  return (
    <Card className="verdash-glass">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-verdash-input-bg/20 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calculator className="w-6 h-6 text-verdash-cyan" />
                <div>
                  <CardTitle className="text-white font-grotesk">Construtor de Métricas</CardTitle>
                  <CardDescription className="text-white/60">
                    Crie fórmulas personalizadas empilhando cálculos
                  </CardDescription>
                </div>
              </div>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-white/60" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white/60" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="metric-name" className="text-white text-sm font-grotesk">
                  Nome da Métrica
                </Label>
                <Input
                  id="metric-name"
                  placeholder="Ex: Custo por Lead Qualificado"
                  value={metricName}
                  onChange={(e) => setMetricName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metric-type" className="text-white text-sm font-grotesk">
                  Tipo
                </Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="currency">Moeda (R$)</SelectItem>
                    <SelectItem value="percentage">Porcentagem (%)</SelectItem>
                    <SelectItem value="number">Número</SelectItem>
                    <SelectItem value="ratio">Proporção</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white text-sm font-grotesk">
                Descrição
              </Label>
              <Textarea
                id="description"
                placeholder="Descreva o que esta métrica calcula..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-white text-sm font-grotesk">
                Categoria
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Vendas</SelectItem>
                  <SelectItem value="finance">Financeiro</SelectItem>
                  <SelectItem value="operations">Operações</SelectItem>
                  <SelectItem value="custom">Personalizada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Formula Builder */}
            <div className="space-y-4">
              <Label className="text-white text-sm font-grotesk">Fórmula</Label>
              
              {/* Available Fields */}
              <div className="space-y-2">
                <p className="text-xs text-white/60 uppercase font-grotesk">Campos Disponíveis</p>
                <div className="flex flex-wrap gap-2">
                  {availableFields.map((field) => (
                    <Badge
                      key={field.id}
                      variant="outline"
                      className="cursor-pointer hover:bg-verdash-cyan/20 hover:border-verdash-cyan transition-colors"
                      onClick={() => insertField(field.id)}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      {field.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Functions */}
              <div className="space-y-2">
                <p className="text-xs text-white/60 uppercase font-grotesk">Funções</p>
                <div className="flex flex-wrap gap-2">
                  {formulaFunctions.map((func) => (
                    <Badge
                      key={func.name}
                      variant="secondary"
                      className="cursor-pointer hover:bg-verdash-coral/20 hover:border-verdash-coral transition-colors"
                      onClick={() => insertFunction(func.name)}
                      title={func.description}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      {func.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Formula Input */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Digite sua fórmula aqui... Ex: (gasto_meta + gasto_google) / total_leads"
                  value={formula}
                  onChange={(e) => setFormula(e.target.value)}
                  rows={3}
                  className="font-mono text-sm bg-verdash-input-bg/50"
                />
                
                {/* Validation */}
                <div className="flex items-center gap-2">
                  {formula && (
                    <>
                      {isValid ? (
                        <div className="flex items-center gap-1 text-verdash-success text-xs">
                          <CheckCircle className="w-3 h-3" />
                          Fórmula válida
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-verdash-error text-xs">
                          <AlertTriangle className="w-3 h-3" />
                          Verifique a sintaxe
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Test Formula */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={testFormula}
                  className="verdash-btn-secondary"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Testar Fórmula
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={validateFormula}
                  className="verdash-btn-secondary"
                >
                  Validar
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-verdash-divider/30">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="verdash-btn-secondary"
              >
                Cancelar
              </Button>
              <Button className="verdash-btn-primary">
                <Calculator className="w-4 h-4 mr-2" />
                Criar Métrica
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
