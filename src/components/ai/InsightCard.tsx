
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Insight } from "@/types/ai";
import { TrendingUp, TrendingDown, AlertTriangle, Info, Lightbulb } from "lucide-react";

interface InsightCardProps {
  insight: Insight;
  onActionClick?: (insight: Insight) => void;
}

export const InsightCard = ({ insight, onActionClick }: InsightCardProps) => {
  const getIcon = () => {
    switch (insight.type) {
      case 'positive':
        return <TrendingUp className="w-5 h-5 text-verdash-success" />;
      case 'negative':
        return <TrendingDown className="w-5 h-5 text-verdash-error" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-verdash-coral" />;
      default:
        return <Info className="w-5 h-5 text-verdash-cyan" />;
    }
  };

  const getBadgeVariant = () => {
    switch (insight.severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="verdash-glass">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getIcon()}
            <div>
              <CardTitle className="text-white text-base font-grotesk">
                {insight.title}
              </CardTitle>
              <CardDescription className="text-white/60 text-xs">
                {insight.source} • {formatTimestamp(insight.timestamp)}
              </CardDescription>
            </div>
          </div>
          <Badge variant={getBadgeVariant()} className="text-xs">
            {insight.severity === 'high' ? 'Alto' : insight.severity === 'medium' ? 'Médio' : 'Baixo'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-white/80 text-sm mb-4 font-inter leading-relaxed">
          {insight.description}
        </p>

        {insight.metrics && (
          <div className="flex items-center gap-4 mb-4 p-3 rounded-lg bg-verdash-input-bg/30 border border-verdash-divider/30">
            <div className="text-center">
              <p className="text-xs text-white/60 uppercase font-grotesk">Atual</p>
              <p className="text-lg font-bold text-white">{insight.metrics.current}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-white/60 uppercase font-grotesk">Anterior</p>
              <p className="text-lg font-bold text-white/70">{insight.metrics.previous}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-white/60 uppercase font-grotesk">Mudança</p>
              <p className={`text-lg font-bold ${
                insight.metrics.changeType === 'increase' 
                  ? insight.type === 'positive' ? 'text-verdash-success' : 'text-verdash-error'
                  : insight.type === 'negative' ? 'text-verdash-success' : 'text-verdash-error'
              }`}>
                {insight.metrics.changeType === 'increase' ? '+' : ''}{insight.metrics.change}%
              </p>
            </div>
          </div>
        )}

        {insight.action && (
          <Button 
            size="sm" 
            className="w-full verdash-btn-primary verdash-hover-scale"
            onClick={() => onActionClick?.(insight)}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            {insight.action}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
