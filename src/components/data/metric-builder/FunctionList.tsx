
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, FunctionSquare } from "lucide-react";

const functions = [
  {
    category: "Matemáticas",
    items: [
      { name: "SUM", description: "Soma valores", example: "SUM(revenue, costs)" },
      { name: "AVG", description: "Média dos valores", example: "AVG(conversion_rate)" },
      { name: "MAX", description: "Valor máximo", example: "MAX(daily_sales)" },
      { name: "MIN", description: "Valor mínimo", example: "MIN(cost_per_click)" },
      { name: "COUNT", description: "Conta registros", example: "COUNT(leads)" },
    ]
  },
  {
    category: "Lógicas",
    items: [
      { name: "IF", description: "Condição lógica", example: "IF(revenue > 1000, 'Alto', 'Baixo')" },
    ]
  },
  {
    category: "Operadores",
    items: [
      { name: "+", description: "Adição", example: "revenue + bonus" },
      { name: "-", description: "Subtração", example: "revenue - costs" },
      { name: "*", description: "Multiplicação", example: "price * quantity" },
      { name: "/", description: "Divisão", example: "revenue / leads" },
      { name: ">", description: "Maior que", example: "revenue > 1000" },
      { name: "<", description: "Menor que", example: "cost < 500" },
      { name: ">=", description: "Maior ou igual", example: "conversion >= 0.05" },
      { name: "<=", description: "Menor ou igual", example: "cpc <= 2.0" },
      { name: "==", description: "Igual", example: "status == 'ativo'" },
      { name: "!=", description: "Diferente", example: "type != 'teste'" },
    ]
  }
];

interface FunctionListProps {
  onFunctionSelect: (func: string) => void;
}

export const FunctionList = ({ onFunctionSelect }: FunctionListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="verdash-glass">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-verdash-input-bg/20 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FunctionSquare className="w-5 h-5 text-verdash-cyan" />
                <div>
                  <CardTitle className="text-sm text-white font-grotesk">Funções Disponíveis</CardTitle>
                  <CardDescription className="text-xs text-white/60">
                    Clique para inserir na fórmula
                  </CardDescription>
                </div>
              </div>
              {isOpen ? (
                <ChevronUp className="w-4 h-4 text-white/60" />
              ) : (
                <ChevronDown className="w-4 h-4 text-white/60" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-4">
            {functions.map((category) => (
              <div key={category.category} className="space-y-2">
                <h4 className="text-sm font-semibold text-verdash-cyan uppercase tracking-wide">
                  {category.category}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {category.items.map((func) => (
                    <Button
                      key={func.name}
                      variant="outline"
                      size="sm"
                      onClick={() => onFunctionSelect(func.name)}
                      className="justify-start text-left h-auto p-3 bg-verdash-input-bg/50 border-verdash-divider hover:bg-verdash-cyan/10 hover:border-verdash-cyan/50"
                      title={`${func.description}\nExemplo: ${func.example}`}
                    >
                      <div>
                        <div className="font-mono text-verdash-cyan font-medium">{func.name}</div>
                        <div className="text-xs text-white/60 mt-1">{func.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
