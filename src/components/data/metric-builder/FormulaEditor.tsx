
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Calculator } from "lucide-react";

const availableFields = [
  { id: 'revenue', name: 'Receita', source: 'ecommerce', type: 'currency' },
  { id: 'leads', name: 'Leads', source: 'crm', type: 'number' },
  { id: 'cost', name: 'Custo', source: 'meta', type: 'currency' },
  { id: 'conversions', name: 'Conversões', source: 'google', type: 'number' },
  { id: 'sessions', name: 'Sessões', source: 'analytics', type: 'number' },
  { id: 'orders', name: 'Pedidos', source: 'ecommerce', type: 'number' },
  { id: 'clicks', name: 'Cliques', source: 'meta', type: 'number' },
];

interface FormulaEditorProps {
  selectedSources: string[];
  formula: string;
  onFormulaChange: (formula: string) => void;
  onFieldSelect: (field: string) => void;
  onFunctionSelect: (func: string) => void;
}

export const FormulaEditor = ({ 
  selectedSources, 
  formula, 
  onFormulaChange, 
  onFieldSelect,
  onFunctionSelect 
}: FormulaEditorProps) => {
  const [isValid, setIsValid] = useState(true);

  const validateFormula = (value: string) => {
    // Validação básica da fórmula
    if (!value.trim()) {
      setIsValid(true);
      return;
    }
    
    // Verifica parênteses balanceados
    const openParens = (value.match(/\(/g) || []).length;
    const closeParens = (value.match(/\)/g) || []).length;
    setIsValid(openParens === closeParens);
  };

  const handleFormulaChange = (value: string) => {
    onFormulaChange(value);
    validateFormula(value);
  };

  const filteredFields = availableFields.filter(field => 
    selectedSources.length === 0 || selectedSources.includes(field.source)
  );

  return (
    <Card className="verdash-glass">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Calculator className="w-5 h-5 text-verdash-cyan" />
          <div>
            <CardTitle className="text-white font-grotesk">Editor de Fórmula</CardTitle>
            <CardDescription className="text-white/60">
              Construa sua fórmula usando campos e funções
            </CardDescription>
          </div>
          {formula && (
            isValid ? (
              <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400 ml-auto" />
            )
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Campos Disponíveis */}
        <div className="space-y-3">
          <Label className="text-white font-medium">Campos Disponíveis</Label>
          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
            {filteredFields.map((field) => (
              <Button
                key={field.id}
                variant="outline"
                size="sm"
                onClick={() => onFieldSelect(field.id)}
                className="justify-start bg-verdash-input-bg/50 border-verdash-divider hover:bg-verdash-cyan/10 hover:border-verdash-cyan/50 text-white"
              >
                <span className="font-mono">{field.id}</span>
                <Badge variant="secondary" className="ml-2 text-xs bg-verdash-divider/50">
                  {field.type}
                </Badge>
              </Button>
            ))}
          </div>
          {filteredFields.length === 0 && selectedSources.length > 0 && (
            <p className="text-sm text-white/60 italic">
              Nenhum campo disponível para as fontes selecionadas
            </p>
          )}
        </div>

        {/* Editor de Fórmula */}
        <div className="space-y-3">
          <Label className="text-white font-medium">Fórmula</Label>
          <Textarea
            value={formula}
            onChange={(e) => handleFormulaChange(e.target.value)}
            placeholder="Ex: revenue / leads"
            className="min-h-[100px] font-mono bg-verdash-input-bg border-verdash-divider text-white placeholder:text-white/40"
          />
          {!isValid && (
            <p className="text-sm text-red-400">
              Fórmula inválida: verifique parênteses e sintaxe
            </p>
          )}
        </div>

        {/* Funções Rápidas */}
        <div className="space-y-3">
          <Label className="text-white font-medium">Funções Rápidas</Label>
          <div className="flex flex-wrap gap-2">
            {['SUM', 'AVG', 'MAX', 'MIN', 'COUNT', 'IF'].map((func) => (
              <Button
                key={func}
                variant="outline"
                size="sm"
                onClick={() => onFunctionSelect(func)}
                className="bg-verdash-input-bg/50 border-verdash-divider hover:bg-verdash-cyan/10 hover:border-verdash-cyan/50 text-white font-mono"
              >
                {func}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
