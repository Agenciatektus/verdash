
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface WidgetConfig {
  id: string;
  name: string;
  enabled: boolean;
}

interface WidgetVisibilityFilterProps {
  onWidgetVisibilityChange?: (widgets: WidgetConfig[]) => void;
}

const defaultWidgets: WidgetConfig[] = [
  { id: 'kpis-impact', name: 'KPIs de Impacto', enabled: true },
  { id: 'kpis-financial', name: 'KPIs Financeiros', enabled: true },
  { id: 'performance-charts', name: 'Performance ao Longo do Tempo', enabled: true },
  { id: 'revenue-evolution', name: 'Evolução de Receita', enabled: true },
  { id: 'investment-by-channel', name: 'Investimento por Canal', enabled: true },
  { id: 'revenue-participation', name: 'Participação na Receita', enabled: true },
  { id: 'sales-funnel', name: 'Pipeline de Vendas', enabled: true },
  { id: 'conversion-by-channel', name: 'Conversão por Canal', enabled: true },
  { id: 'additional-kpis', name: 'KPIs Adicionais', enabled: true },
];

export const WidgetVisibilityFilter = ({ onWidgetVisibilityChange }: WidgetVisibilityFilterProps) => {
  const [widgets, setWidgets] = useState<WidgetConfig[]>(defaultWidgets);
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = (widgetId: string) => {
    const updatedWidgets = widgets.map(widget =>
      widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget
    );
    setWidgets(updatedWidgets);
    onWidgetVisibilityChange?.(updatedWidgets);
  };

  const toggleAll = (enabled: boolean) => {
    const updatedWidgets = widgets.map(widget => ({ ...widget, enabled }));
    setWidgets(updatedWidgets);
    onWidgetVisibilityChange?.(updatedWidgets);
  };

  const enabledCount = widgets.filter(w => w.enabled).length;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Eye className="w-4 h-4" />
          Widgets ({enabledCount}/{widgets.length})
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Visibilidade dos Widgets</h4>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => toggleAll(true)}
                className="text-xs"
              >
                Mostrar Todos
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => toggleAll(false)}
                className="text-xs"
              >
                Ocultar Todos
              </Button>
            </div>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {widgets.map((widget) => (
              <div key={widget.id} className="flex items-center justify-between space-x-2">
                <Label 
                  htmlFor={widget.id} 
                  className="text-sm flex-1 cursor-pointer"
                >
                  {widget.name}
                </Label>
                <Switch
                  id={widget.id}
                  checked={widget.enabled}
                  onCheckedChange={() => toggleWidget(widget.id)}
                />
              </div>
            ))}
          </div>
          
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              {enabledCount} de {widgets.length} widgets visíveis
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
