
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Plus, BookOpen, Zap } from "lucide-react";

interface EmptyMetricsStateProps {
  onCreateMetric: () => void;
  hasFilters?: boolean;
  onClearFilters?: () => void;
}

export const EmptyMetricsState = ({ 
  onCreateMetric, 
  hasFilters = false, 
  onClearFilters 
}: EmptyMetricsStateProps) => {
  if (hasFilters) {
    return (
      <Card className="verdash-glass">
        <CardContent className="py-12">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-verdash-input-bg/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calculator className="w-8 h-8 text-white/60" />
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2 font-grotesk">
              Nenhuma métrica encontrada
            </h3>
            <p className="text-white/60 mb-6">
              Nenhuma métrica corresponde aos filtros aplicados. Tente ajustar os critérios de busca.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {onClearFilters && (
                <Button
                  variant="outline"
                  onClick={onClearFilters}
                  className="bg-verdash-input-bg/50 border-verdash-divider hover:bg-verdash-input-bg text-white"
                >
                  Limpar Filtros
                </Button>
              )}
              <Button
                onClick={onCreateMetric}
                className="bg-verdash-cyan hover:bg-verdash-cyan/80 text-verdash-background"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Métrica
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="verdash-glass">
      <CardContent className="py-16">
        <div className="text-center max-w-lg mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-verdash-cyan/20 to-verdash-coral/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Calculator className="w-10 h-10 text-verdash-cyan" />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3 font-grotesk">
            Crie sua primeira métrica
          </h3>
          <p className="text-white/60 mb-8 leading-relaxed">
            Transforme seus dados em insights poderosos. Crie métricas personalizadas 
            combinando diferentes fontes de dados com fórmulas inteligentes.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-verdash-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6 text-verdash-cyan" />
              </div>
              <h4 className="font-medium text-white mb-1">Fácil Criação</h4>
              <p className="text-sm text-white/60">Interface intuitiva para construir fórmulas</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-verdash-coral/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-verdash-coral" />
              </div>
              <h4 className="font-medium text-white mb-1">Tempo Real</h4>
              <p className="text-sm text-white/60">Resultados atualizados automaticamente</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-medium text-white mb-1">Templates</h4>
              <p className="text-sm text-white/60">Métricas prontas para usar</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={onCreateMetric}
              className="bg-verdash-cyan hover:bg-verdash-cyan/80 text-verdash-background px-6 py-3 text-base"
            >
              <Plus className="w-5 h-5 mr-2" />
              Criar Primeira Métrica
            </Button>
            <Button
              variant="outline"
              className="bg-verdash-input-bg/50 border-verdash-divider hover:bg-verdash-input-bg text-white px-6 py-3"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Ver Templates
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
