
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, TrendingUp, Calculator } from "lucide-react";

interface MetricPreviewProps {
  name: string;
  type: string;
  formula: string;
  category: string;
  selectedSources: string[];
  isValid: boolean;
}

const formatPreviewValue = (type: string) => {
  switch (type) {
    case 'currency':
      return 'R$ 1.234,56';
    case 'percentage':
      return '15.4%';
    case 'number':
      return '1,234';
    case 'ratio':
      return '3.2:1';
    case 'text':
      return 'Alto';
    case 'boolean':
      return 'Sim';
    default:
      return '--';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'currency':
      return '💰';
    case 'percentage':
      return '📊';
    case 'number':
      return '🔢';
    case 'ratio':
      return '⚖️';
    case 'text':
      return '📝';
    case 'boolean':
      return '✅';
    default:
      return '📊';
  }
};

export const MetricPreview = ({ 
  name, 
  type, 
  formula, 
  category, 
  selectedSources, 
  isValid 
}: MetricPreviewProps) => {
  const previewValue = formatPreviewValue(type);
  const typeIcon = getTypeIcon(type);

  return (
    <Card className="verdash-glass">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Eye className="w-5 h-5 text-verdash-cyan" />
          <div>
            <CardTitle className="text-white font-grotesk">Preview da Métrica</CardTitle>
            <CardDescription className="text-white/60">
              Visualize como sua métrica aparecerá no dashboard
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Card Preview */}
        <div className="p-4 bg-verdash-input-bg/30 rounded-lg border border-verdash-divider/50">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-verdash-cyan/20 rounded-lg flex items-center justify-center">
                <span className="text-lg">{typeIcon}</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  {name || "Nome da Métrica"}
                </h3>
                <Badge variant="outline" className="text-xs bg-verdash-divider/20 border-verdash-divider/30 text-white/70">
                  {category || "Categoria"}
                </Badge>
              </div>
            </div>
            <TrendingUp className="w-4 h-4 text-verdash-cyan" />
          </div>
          
          {/* Valor */}
          <div className="text-center py-4">
            <div className={`text-3xl font-bold ${isValid ? 'text-white' : 'text-white/40'}`}>
              {isValid ? previewValue : '--'}
            </div>
            <p className="text-sm text-white/60 mt-1">Valor Atual</p>
          </div>

          {/* Fórmula */}
          {formula && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-3 h-3 text-verdash-cyan" />
                <span className="text-xs font-medium text-white/80">Fórmula:</span>
              </div>
              <code className="text-xs bg-verdash-background/50 p-2 rounded block font-mono text-white/70 break-all">
                {formula}
              </code>
            </div>
          )}

          {/* Fontes */}
          {selectedSources.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-white/80 mb-2">Fontes de Dados:</p>
              <div className="flex flex-wrap gap-1">
                {selectedSources.slice(0, 3).map((source, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-verdash-divider/20 border-verdash-divider/30 text-white/60">
                    {source}
                  </Badge>
                ))}
                {selectedSources.length > 3 && (
                  <Badge variant="outline" className="text-xs bg-verdash-divider/20 border-verdash-divider/30 text-white/60">
                    +{selectedSources.length - 3} mais
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Informações Adicionais */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-white/60">Tipo:</p>
            <p className="text-white font-medium">{type || "Não definido"}</p>
          </div>
          <div>
            <p className="text-white/60">Status:</p>
            <p className={`font-medium ${isValid ? 'text-green-400' : 'text-red-400'}`}>
              {isValid ? "Válida" : "Inválida"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
