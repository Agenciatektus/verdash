
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert } from "@/types/ai";
import { AlertTriangle, TrendingDown, TrendingUp, Eye, X } from "lucide-react";

interface AlertsPanelProps {
  alerts: Alert[];
  onDismiss?: (alertId: string) => void;
  onView?: (alertId: string) => void;
}

export const AlertsPanel = ({ alerts, onDismiss, onView }: AlertsPanelProps) => {
  const getIcon = (type: Alert['type']) => {
    switch (type) {
      case 'anomaly':
        return <AlertTriangle className="w-4 h-4 text-verdash-error" />;
      case 'threshold':
        return <TrendingUp className="w-4 h-4 text-verdash-coral" />;
      case 'trend':
        return <TrendingDown className="w-4 h-4 text-verdash-cyan" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-verdash-info" />;
    }
  };

  const getBadgeVariant = (severity: Alert['severity']) => {
    switch (severity) {
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

  const activeAlerts = alerts.filter(alert => alert.status === 'active');

  return (
    <Card className="verdash-glass">
      <CardHeader>
        <CardTitle className="text-white font-grotesk uppercase flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-verdash-coral" />
          Alertas Inteligentes
        </CardTitle>
        <CardDescription className="text-white/70">
          {activeAlerts.length} alerta{activeAlerts.length !== 1 ? 's' : ''} ativo{activeAlerts.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-verdash-success/20 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-verdash-success" />
            </div>
            <p className="text-white/70 font-inter">Nenhum alerta ativo no momento</p>
            <p className="text-white/50 text-sm mt-1">Seus dados estão dentro dos parâmetros normais</p>
          </div>
        ) : (
          activeAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className="p-4 rounded-lg border border-verdash-divider/30 bg-verdash-input-bg/20 hover:bg-verdash-input-bg/40 verdash-animate"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getIcon(alert.type)}
                  <div>
                    <h4 className="text-white font-medium font-grotesk">{alert.title}</h4>
                    <p className="text-white/60 text-xs">
                      {alert.source} • {formatTimestamp(alert.timestamp)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getBadgeVariant(alert.severity)} className="text-xs">
                    {alert.severity === 'high' ? 'Alto' : alert.severity === 'medium' ? 'Médio' : 'Baixo'}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-6 h-6 p-0 text-white/50 hover:text-white"
                    onClick={() => onDismiss?.(alert.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-white/80 text-sm mb-3 font-inter leading-relaxed">
                {alert.message}
              </p>

              {alert.threshold && (
                <div className="mb-3 p-2 rounded bg-verdash-divider/20 border border-verdash-divider/30">
                  <p className="text-xs text-white/70">
                    <span className="font-medium">Limite:</span> {alert.threshold.metric} {alert.threshold.operator === 'above' ? 'acima de' : 'abaixo de'} {alert.threshold.value}
                  </p>
                </div>
              )}

              <Button
                size="sm"
                variant="outline"
                className="w-full verdash-btn-secondary"
                onClick={() => onView?.(alert.id)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Detalhes
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
