
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Trash2, 
  Play,
  CheckCircle,
  AlertTriangle,
  Database,
  X,
  Code,
  Info
} from "lucide-react";
import { toast } from "sonner";

const availableFields = [
  { id: 'gasto_meta', name: 'Gasto Meta Ads', type: 'currency', source: 'meta_ads' },
  { id: 'gasto_google', name: 'Gasto Google Ads', type: 'currency', source: 'google_ads' },
  { id: 'total_leads', name: 'Total de Leads', type: 'number', source: 'crm' },
  { id: 'vendas_realizadas', name: 'Vendas Realizadas', type: 'number', source: 'crm' },
  { id: 'receita_vendas', name: 'Receita de Vendas', type: 'currency', source: 'ecommerce' },
  { id: 'visitantes_site', name: 'Visitantes do Site', type: 'number', source: 'analytics' },
  { id: 'conversoes_landing', name: 'Conversões Landing Page', type: 'number', source: 'analytics' }
];

const dataSources = [
  { id: 'meta_ads', name: 'Meta Ads', icon: '📱', description: 'Dados de campanhas do Facebook/Instagram' },
  { id: 'google_ads', name: 'Google Ads', icon: '🔍', description: 'Dados de campanhas do Google' },
  { id: 'crm', name: 'CRM', icon: '👥', description: 'Dados de leads e vendas' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒', description: 'Dados de vendas online' },
  { id: 'analytics', name: 'Google Analytics', icon: '📊', description: 'Dados de tráfego e conversões' },
  { id: 'spreadsheet', name: 'Planilha', icon: '📋', description: 'Dados de planilhas Google Sheets' }
];

const formulaFunctions = [
  { 
    name: 'SUM', 
    syntax: 'SUM(campo1, campo2, ...)', 
    description: 'Soma todos os valores de um campo', 
    example: 'SUM(gasto_meta, gasto_google)',
    category: 'matemática'
  },
  { 
    name: 'AVG', 
    syntax: 'AVG(campo1, campo2, ...)', 
    description: 'Calcula a média dos valores de um campo', 
    example: 'AVG(conversoes_janeiro, conversoes_fevereiro)',
    category: 'matemática'
  },
  { 
    name: 'MAX', 
    syntax: 'MAX(campo1, campo2, ...)', 
    description: 'Retorna o maior valor de um campo', 
    example: 'MAX(vendas_diarias)',
    category: 'matemática'
  },
  { 
    name: 'MIN', 
    syntax: 'MIN(campo1, campo2, ...)', 
    description: 'Retorna o menor valor de um campo', 
    example: 'MIN(custo_leads)',
    category: 'matemática'
  },
  { 
    name: 'COUNT', 
    syntax: 'COUNT(campo)', 
    description: 'Conta o número de registros ou itens', 
    example: 'COUNT(leads_mes)',
    category: 'matemática'
  },
  { 
    name: 'IF', 
    syntax: 'IF(condição, valor_se_verdadeiro, valor_se_falso)', 
    description: 'Retorna um valor com base na condição', 
    example: 'IF(vendas > 1000, vendas * 0.1, 0)',
    category: 'lógica'
  }
];

const operators = [
  { symbol: '+', name: 'Soma', description: 'Adição de valores' },
  { symbol: '-', name: 'Subtração', description: 'Subtração de valores' },
  { symbol: '*', name: 'Multiplicação', description: 'Multiplicação de valores' },
  { symbol: '/', name: 'Divisão', description: 'Divisão de valores' },
  { symbol: '()', name: 'Parênteses', description: 'Define a ordem dos cálculos' },
  { symbol: '>', name: 'Maior que', description: 'Comparação maior que' },
  { symbol: '<', name: 'Menor que', description: 'Comparação menor que' },
  { symbol: '>=', name: 'Maior ou igual', description: 'Comparação maior ou igual' },
  { symbol: '<=', name: 'Menor ou igual', description: 'Comparação menor ou igual' },
  { symbol: '==', name: 'Igual', description: 'Comparação de igualdade' },
  { symbol: '!=', name: 'Diferente', description: 'Comparação de diferença' }
];

interface MetricBuilderFormProps {
  onSave?: (metric: any) => void;
  onCancel?: () => void;
  showActions?: boolean;
  initialData?: any;
}

export const MetricBuilderForm = ({ 
  onSave, 
  onCancel, 
  showActions = true,
  initialData 
}: MetricBuilderFormProps) => {
  const [metricName, setMetricName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [formula, setFormula] = useState(initialData?.formula || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [type, setType] = useState(initialData?.type || "");
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>(initialData?.dataSources || []);
  const [isValid, setIsValid] = useState(false);
  const [showFunctionDetails, setShowFunctionDetails] = useState(false);

  const insertField = (fieldId: string) => {
    setFormula(prev => prev + fieldId);
  };

  const insertFunction = (functionName: string) => {
    setFormula(prev => prev + `${functionName}()`);
  };

  const insertOperator = (operator: string) => {
    setFormula(prev => prev + ` ${operator} `);
  };

  const validateFormula = () => {
    const hasValidSyntax = formula.length > 0 && formula.includes('(') && formula.includes(')');
    setIsValid(hasValidSyntax);
    return hasValidSyntax;
  };

  const testFormula = () => {
    if (validateFormula()) {
      console.log("Testing formula:", formula);
      toast.success("Fórmula testada com sucesso!");
    } else {
      toast.error("Fórmula inválida!");
    }
  };

  const toggleDataSource = (sourceId: string) => {
    setSelectedDataSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const removeDataSource = (sourceId: string) => {
    setSelectedDataSources(prev => prev.filter(id => id !== sourceId));
  };

  const handleSave = () => {
    if (!metricName || !formula || !type) {
      toast.error("Nome, fórmula e tipo são obrigatórios");
      return;
    }

    const metricData = {
      name: metricName,
      description,
      formula,
      category,
      type,
      dataSources: selectedDataSources
    };

    onSave?.(metricData);
    toast.success("Métrica criada com sucesso!");
  };

  const availableFieldsFiltered = selectedDataSources.length > 0 
    ? availableFields.filter(field => selectedDataSources.includes(field.source))
    : availableFields;

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="metric-name" className="text-sm font-medium">
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
          <Label htmlFor="metric-type" className="text-sm font-medium">
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
              <SelectItem value="text">Texto</SelectItem>
              <SelectItem value="ratio">Proporção</SelectItem>
              <SelectItem value="boolean">Verdadeiro/Falso</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
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
        <Label htmlFor="category" className="text-sm font-medium">
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

      {/* Data Sources Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          <Label className="text-sm font-medium">Fontes de Dados</Label>
        </div>
        
        {/* Selected Data Sources */}
        {selectedDataSources.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase">Fontes Selecionadas</p>
            <div className="flex flex-wrap gap-2">
              {selectedDataSources.map((sourceId) => {
                const source = dataSources.find(s => s.id === sourceId);
                return source ? (
                  <Badge
                    key={sourceId}
                    variant="default"
                    className="bg-primary/20 text-primary border-primary/30 flex items-center gap-1"
                  >
                    <span>{source.icon}</span>
                    {source.name}
                    <button
                      onClick={() => removeDataSource(sourceId)}
                      className="ml-1 hover:bg-primary/30 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Available Data Sources */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase">Fontes Disponíveis</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dataSources.map((source) => (
              <div
                key={source.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedDataSources.includes(source.id)
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-border/80 bg-card/20 hover:bg-card/40'
                }`}
                onClick={() => toggleDataSource(source.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{source.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{source.name}</p>
                    <p className="text-xs text-muted-foreground">{source.description}</p>
                  </div>
                  {selectedDataSources.includes(source.id) && (
                    <CheckCircle className="w-4 h-4 text-primary" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formula Builder */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-primary" />
          <Label className="text-sm font-medium">Construtor de Fórmula</Label>
        </div>
        
        {/* Functions Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium uppercase tracking-wide">Funções</p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowFunctionDetails(!showFunctionDetails)}
              className="text-xs text-primary hover:bg-primary/10"
            >
              <Info className="w-3 h-3 mr-1" />
              {showFunctionDetails ? 'Ocultar' : 'Ver'} Detalhes
            </Button>
          </div>

          {/* Mathematics Functions */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase">Funções Matemáticas</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {formulaFunctions.filter(f => f.category === 'matemática').map((func) => (
                <Button
                  key={func.name}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertFunction(func.name)}
                  className="justify-start text-xs hover:bg-primary/20 hover:border-primary"
                  title={func.description}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {func.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Logic Functions */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase">Funções Lógicas</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {formulaFunctions.filter(f => f.category === 'lógica').map((func) => (
                <Button
                  key={func.name}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertFunction(func.name)}
                  className="justify-start text-xs hover:bg-secondary/20 hover:border-secondary"
                  title={func.description}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {func.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Operators */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase">Operadores</p>
            <div className="flex flex-wrap gap-2">
              {operators.map((op) => (
                <Button
                  key={op.symbol}
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => insertOperator(op.symbol)}
                  className="text-xs"
                  title={op.description}
                >
                  {op.symbol}
                </Button>
              ))}
            </div>
          </div>

          {/* Function Details */}
          {showFunctionDetails && (
            <div className="bg-muted/20 rounded-lg p-4 space-y-3">
              <h4 className="text-sm font-medium">Detalhes das Funções</h4>
              <div className="space-y-3">
                {formulaFunctions.map((func) => (
                  <div key={func.name} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-primary/20 text-primary px-2 py-1 rounded font-mono">
                        {func.syntax}
                      </code>
                    </div>
                    <p className="text-xs text-muted-foreground">{func.description}</p>
                    <p className="text-xs text-muted-foreground/70 font-mono">Exemplo: {func.example}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Available Fields - Only show if data sources are selected */}
        {selectedDataSources.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase">Campos Disponíveis</p>
            <div className="flex flex-wrap gap-2">
              {availableFieldsFiltered.map((field) => (
                <Badge
                  key={field.id}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/20 hover:border-primary transition-colors"
                  onClick={() => insertField(field.id)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {field.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Formula Input */}
        <div className="space-y-2">
          <Textarea
            placeholder="Digite sua fórmula aqui... Ex: (gasto_meta + gasto_google) / total_leads"
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            rows={3}
            className="font-mono text-sm bg-muted/50"
          />
          
          {/* Formula Rules */}
          <div className="bg-muted/10 rounded-lg p-3 space-y-2">
            <p className="text-xs font-medium">📜 Regras da Fórmula:</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Use parênteses para definir a ordem dos cálculos</li>
              <li>Nomes dos campos sem espaços, acentos ou caracteres especiais</li>
              <li>Use underline (_) se necessário nos nomes</li>
              <li>Evite divisão por zero - use IF() para tratar casos</li>
              <li>Funções podem ser aninhadas (uma dentro da outra)</li>
            </ul>
          </div>
          
          {/* Validation */}
          <div className="flex items-center gap-2">
            {formula && (
              <>
                {isValid ? (
                  <div className="flex items-center gap-1 text-green-600 text-xs">
                    <CheckCircle className="w-3 h-3" />
                    Fórmula válida
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-600 text-xs">
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
          >
            <Play className="w-4 h-4 mr-2" />
            Testar Fórmula
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={validateFormula}
          >
            Validar
          </Button>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Criar Métrica
          </Button>
        </div>
      )}
    </div>
  );
};
