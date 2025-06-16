import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target } from "lucide-react";
import { Widget } from "@/types/widgets";

interface KPIWidgetProps {
  widget: Widget;
  isEditing?: boolean;
}

export const KPIWidget = ({ widget, isEditing = false }: KPIWidgetProps) => {
  const { config } = widget;
  const value = config.value || 0;
  const previousValue = config.previousValue || 0;
  const target = config.target;
  const format = config.format || 'number';
  
  const changePercent = previousValue ? ((value - previousValue) / previousValue) * 100 : 0;
  const trend = changePercent > 0 ? 'up' : changePercent < 0 ? 'down' : 'neutral';
  
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('pt-BR', { 
          style: 'currency', 
          currency: 'BRL' 
        }).format(val);
      case 'percentage':
        return `${val.toFixed(1)}%`;
      default:
        return val.toLocaleString('pt-BR');
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-verdash-success" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-verdash-error" />;
    return null;
  };

  return (
    <Card className={`verdash-glass h-full w-full ${isEditing ? 'ring-2 ring-verdash-cyan' : ''}`}>
      <CardHeader className="p-4 h-auto w-full">
        <div className="flex items-center justify-between w-full">
          <CardTitle className="text-sm font-medium text-white/80 truncate">
            {widget.title}
          </CardTitle>
          {target && (
            <Target className="w-4 h-4 text-verdash-cyan" />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 w-full">
        <div className="space-y-3 w-full flex flex-col">
          <div>
            <div className="text-3xl font-bold text-white break-words leading-tight">
              {formatValue(value)}
            </div>
            {target && (
              <div className="text-xs text-white/60">
                Meta: {formatValue(target)}
              </div>
            )}
          </div>
          {previousValue > 0 && (
            <div className="flex items-center gap-2">
              {getTrendIcon()}
              <span className={`text-sm font-medium ${
                trend === 'up' ? 'text-verdash-success' : 
                trend === 'down' ? 'text-verdash-error' : 
                'text-white/60'
              }`}>
                {changePercent > 0 ? '+' : ''}{changePercent.toFixed(1)}%
              </span>
              <span className="text-xs text-white/60">vs. período anterior</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
