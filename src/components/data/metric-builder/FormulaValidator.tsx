
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertTriangle, Play, Zap } from "lucide-react";

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

interface FormulaValidatorProps {
  formula: string;
  selectedFields: string[];
  onValidationChange: (result: ValidationResult) => void;
}

export const FormulaValidator = ({ formula, selectedFields, onValidationChange }: FormulaValidatorProps) => {
  const [validation, setValidation] = useState<ValidationResult>({
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: []
  });
  const [isValidating, setIsValidating] = useState(false);

  const validateFormula = () => {
    setIsValidating(true);
    
    setTimeout(() => {
      const result: ValidationResult = {
        isValid: true,
        errors: [],
        warnings: [],
        suggestions: []
      };

      // Validação básica
      if (!formula.trim()) {
        result.isValid = false;
        result.errors.push("Fórmula não pode estar vazia");
      }

      // Verifica parênteses balanceados
      const openParens = (formula.match(/\(/g) || []).length;
      const closeParens = (formula.match(/\)/g) || []).length;
      if (openParens !== closeParens) {
        result.isValid = false;
        result.errors.push("Parênteses não estão balanceados");
      }

      // Verifica divisão por zero
      if (formula.includes('/ 0') || formula.includes('/0')) {
        result.isValid = false;
        result.errors.push("Divisão por zero detectada");
      }

      // Verifica campos válidos
      const fieldPattern = /[a-zA-Z_][a-zA-Z0-9_]*/g;
      const usedFields = formula.match(fieldPattern) || [];
      const functionsKeywords = ['SUM', 'AVG', 'MAX', 'MIN', 'COUNT', 'IF', 'AND', 'OR'];
      
      usedFields.forEach(field => {
        if (!functionsKeywords.includes(field.toUpperCase()) && !selectedFields.includes(field)) {
          result.warnings.push(`Campo '${field}' não foi encontrado nas fontes selecionadas`);
        }
      });

      // Sugestões
      if (formula.includes('revenue') && formula.includes('cost')) {
        result.suggestions.push("Considere usar parênteses para clarificar a ordem das operações");
      }

      if (!formula.includes('IF') && selectedFields.length > 3) {
        result.suggestions.push("Com muitos campos, considere usar condições IF para tratar casos especiais");
      }

      setValidation(result);
      onValidationChange(result);
      setIsValidating(false);
    }, 800);
  };

  useEffect(() => {
    if (formula) {
      validateFormula();
    }
  }, [formula, selectedFields]);

  const testFormula = () => {
    console.log("Testing formula with mock data:", formula);
    // Aqui seria implementado o teste real com dados mock
  };

  return (
    <Card className="verdash-glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {validation.isValid ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            <div>
              <CardTitle className="text-white font-grotesk">Validação da Fórmula</CardTitle>
              <CardDescription className="text-white/60">
                {isValidating ? "Validando..." : "Verificação em tempo real"}
              </CardDescription>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={testFormula}
            disabled={!validation.isValid}
            className="bg-verdash-input-bg/50 border-verdash-divider hover:bg-verdash-cyan/10"
          >
            <Play className="w-4 h-4 mr-2" />
            Testar
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Status Geral */}
        <div className={`p-3 rounded-lg border ${
          validation.isValid 
            ? 'border-green-500/30 bg-green-500/10' 
            : 'border-red-500/30 bg-red-500/10'
        }`}>
          <div className="flex items-center gap-2">
            {validation.isValid ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400" />
            )}
            <span className={`text-sm font-medium ${
              validation.isValid ? 'text-green-400' : 'text-red-400'
            }`}>
              {validation.isValid ? 'Fórmula válida' : 'Fórmula inválida'}
            </span>
          </div>
        </div>

        {/* Erros */}
        {validation.errors.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-red-400">Erros ({validation.errors.length})</span>
            </div>
            <div className="space-y-1">
              {validation.errors.map((error, index) => (
                <div key={index} className="text-sm text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20">
                  {error}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Avisos */}
        {validation.warnings.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">Avisos ({validation.warnings.length})</span>
            </div>
            <div className="space-y-1">
              {validation.warnings.map((warning, index) => (
                <div key={index} className="text-sm text-yellow-400 bg-yellow-500/10 p-2 rounded border border-yellow-500/20">
                  {warning}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sugestões */}
        {validation.suggestions.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-verdash-cyan" />
              <span className="text-sm font-medium text-verdash-cyan">Sugestões ({validation.suggestions.length})</span>
            </div>
            <div className="space-y-1">
              {validation.suggestions.map((suggestion, index) => (
                <div key={index} className="text-sm text-verdash-cyan bg-verdash-cyan/10 p-2 rounded border border-verdash-cyan/20">
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
