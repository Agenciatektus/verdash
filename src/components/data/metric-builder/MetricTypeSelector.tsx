
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target } from "lucide-react";

const metricTypes = [
  {
    id: 'currency',
    name: 'Moeda (R$)',
    description: 'Valores monetários como receita, custos, ROI',
    icon: '💰',
    examples: ['R$ 1.250,00', 'R$ 45,30', 'R$ 15.890,75']
  },
  {
    id: 'percentage',
    name: 'Porcentagem (%)',
    description: 'Taxas, conversões e proporções',
    icon: '📊',
    examples: ['15.4%', '2.8%', '89.1%']
  },
  {
    id: 'number',
    name: 'Número',
    description: 'Contadores, quantidades e métricas simples',
    icon: '🔢',
    examples: ['1,234', '45', '15,890']
  },
  {
    id: 'ratio',
    name: 'Proporção',
    description: 'Relações entre valores (1:5, 3.2:1)',
    icon: '⚖️',
    examples: ['3.2:1', '1:5', '15:1']
  },
  {
    id: 'text',
    name: 'Texto',
    description: 'Classificações e status baseados em condições',
    icon: '📝',
    examples: ['Alto', 'Médio', 'Baixo']
  },
  {
    id: 'boolean',
    name: 'Verdadeiro/Falso',
    description: 'Valores binários e condições booleanas',
    icon: '✅',
    examples: ['Sim/Não', 'Ativo/Inativo', 'Aprovado/Rejeitado']
  }
];

interface MetricTypeSelectorProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export const MetricTypeSelector = ({ selectedType, onTypeChange }: MetricTypeSelectorProps) => {
  return (
    <Card className="verdash-glass">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Target className="w-5 h-5 text-verdash-cyan" />
          <div>
            <CardTitle className="text-white font-grotesk">Tipo da Métrica</CardTitle>
            <CardDescription className="text-white/60">
              Escolha como o resultado será formatado e exibido
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {metricTypes.map((type) => (
            <div
              key={type.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedType === type.id
                  ? 'border-verdash-cyan bg-verdash-cyan/10'
                  : 'border-verdash-divider/50 hover:border-verdash-divider hover:bg-verdash-input-bg/20'
              }`}
              onClick={() => onTypeChange(type.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{type.icon}</span>
                  <span className="font-medium text-white">{type.name}</span>
                </div>
                {selectedType === type.id && (
                  <CheckCircle className="w-4 h-4 text-verdash-cyan" />
                )}
              </div>
              
              <p className="text-sm text-white/60 mb-3">{type.description}</p>
              
              <div className="space-y-1">
                <p className="text-xs text-white/40 uppercase tracking-wide">Exemplos:</p>
                <div className="flex flex-wrap gap-1">
                  {type.examples.map((example, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-verdash-divider/20 border-verdash-divider/30 text-white/70"
                    >
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
