
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Facebook, Globe, ShoppingCart, BarChart3, FileSpreadsheet } from "lucide-react";

const dataSources = [
  { id: 'meta', name: 'Meta Ads', icon: Facebook, color: 'bg-blue-600' },
  { id: 'google', name: 'Google Ads', icon: Globe, color: 'bg-green-600' },
  { id: 'crm', name: 'CRM', icon: Database, color: 'bg-purple-600' },
  { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart, color: 'bg-orange-600' },
  { id: 'analytics', name: 'Analytics', icon: BarChart3, color: 'bg-cyan-600' },
  { id: 'sheets', name: 'Planilhas', icon: FileSpreadsheet, color: 'bg-emerald-600' },
];

interface DataSourceSelectorProps {
  selectedSources: string[];
  onSourceToggle: (sourceId: string) => void;
}

export const DataSourceSelector = ({ selectedSources, onSourceToggle }: DataSourceSelectorProps) => {
  return (
    <Card className="verdash-glass">
      <CardHeader>
        <CardTitle className="text-white font-grotesk">Fontes de Dados</CardTitle>
        <CardDescription className="text-white/60">
          Selecione as fontes que serão usadas na métrica
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {dataSources.map((source) => {
            const Icon = source.icon;
            const isSelected = selectedSources.includes(source.id);
            
            return (
              <Button
                key={source.id}
                variant={isSelected ? "default" : "outline"}
                onClick={() => onSourceToggle(source.id)}
                className={`h-auto p-4 justify-start ${
                  isSelected 
                    ? 'bg-verdash-cyan/20 border-verdash-cyan text-white hover:bg-verdash-cyan/30' 
                    : 'bg-verdash-input-bg/50 border-verdash-divider hover:bg-verdash-cyan/10 hover:border-verdash-cyan/50'
                }`}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${source.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{source.name}</span>
                </div>
              </Button>
            );
          })}
        </div>

        {selectedSources.length > 0 && (
          <div className="pt-4 border-t border-verdash-divider/30">
            <p className="text-sm text-white/60 mb-2">Fontes selecionadas:</p>
            <div className="flex flex-wrap gap-2">
              {selectedSources.map((sourceId) => {
                const source = dataSources.find(s => s.id === sourceId);
                return source ? (
                  <Badge key={sourceId} variant="secondary" className="bg-verdash-cyan/20 text-verdash-cyan border-verdash-cyan/30">
                    {source.name}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
