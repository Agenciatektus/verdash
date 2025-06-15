
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert } from "@/types/ai";
import { AlertTriangle, TrendingDown, TrendingUp, Clock, Target, Lightbulb, CheckCircle } from "lucide-react";

interface AlertDetailsDialogProps {
  alert: Alert | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDismiss?: (alertId: string) => void;
}

export const AlertDetailsDialog = ({ alert, open, onOpenChange, onDismiss }: AlertDetailsDialogProps) => {
  if (!alert) return null;

  const getIcon = (type: Alert['type']) => {
    switch (type) {
      case 'anomaly':
        return <AlertTriangle className="w-6 h-6 text-verdash-error" />;
      case 'threshold':
        return <TrendingUp className="w-6 h-6 text-verdash-coral" />;
      case 'trend':
        return <TrendingDown className="w-6 h-6 text-verdash-cyan" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-verdash-info" />;
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDetailedAnalysis = () => {
    switch (alert.id) {
      case '1':
        return {
          whatHappened: "Detectamos um aumento anormal no custo por clique (CPC) do Google Ads. Em apenas 2 horas, o valor subiu de R$ 1,80 para R$ 2,50 - um aumento de 40%.",
          whyItMatters: "Isso significa que você está pagando mais para conseguir o mesmo número de cliques. Se não for resolvido, pode impactar significativamente seu orçamento de marketing.",
          possibleCauses: [
            "Aumento súbito da concorrência nas suas palavras-chave principais",
            "Mudança no algoritmo do Google Ads",
            "Problema na configuração dos lances automáticos",
            "Palavras-chave muito genéricas disputando com grandes anunciantes"
          ],
          recommendations: [
            "Revisar e ajustar os lances das palavras-chave mais caras",
            "Pausar temporariamente campanhas com performance ruim",
            "Adicionar palavras-chave negativas para evitar cliques irrelevantes",
            "Considerar mudar para lances manuais temporariamente"
          ],
          urgency: "Este problema deve ser resolvido nas próximas 2 horas para evitar desperdício de orçamento."
        };
      case '2':
        return {
          whatHappened: "A taxa de conversão do seu funil de vendas caiu de 4,2% para 2,8% nas últimas 4 horas, ficando abaixo do limite mínimo de 3%.",
          whyItMatters: "Menos visitantes estão se convertendo em leads ou vendas, o que pode indicar problemas técnicos ou de experiência do usuário no seu site.",
          possibleCauses: [
            "Problemas técnicos no site (lentidão, formulários não funcionando)",
            "Mudanças recentes no layout ou conteúdo das páginas",
            "Tráfego de baixa qualidade direcionado ao site",
            "Problemas no processo de checkout ou formulários de contato"
          ],
          recommendations: [
            "Testar todos os formulários e botões de conversão do site",
            "Verificar a velocidade de carregamento das páginas principais",
            "Analisar as fontes de tráfego para identificar tráfego de baixa qualidade",
            "Revisar mudanças recentes feitas no site ou campanhas"
          ],
          urgency: "Recomendamos investigar imediatamente para evitar perda de leads e vendas."
        };
      default:
        return {
          whatHappened: alert.message,
          whyItMatters: "Este alerta foi gerado para ajudar você a manter a performance das suas campanhas.",
          possibleCauses: ["Análise específica não disponível para este alerta."],
          recommendations: ["Entre em contato com o suporte para análise detalhada."],
          urgency: "Revise quando possível."
        };
    }
  };

  const analysis = getDetailedAnalysis();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl verdash-glass border-verdash-divider">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            {getIcon(alert.type)}
            <div className="flex-1">
              <DialogTitle className="text-white font-grotesk text-xl">
                {alert.title}
              </DialogTitle>
              <DialogDescription className="text-white/70">
                Análise detalhada do alerta • {alert.source}
              </DialogDescription>
            </div>
            <Badge variant={getBadgeVariant(alert.severity)} className="text-xs">
              {alert.severity === 'high' ? 'Alto' : alert.severity === 'medium' ? 'Médio' : 'Baixo'}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 max-h-96 overflow-y-auto">
          {/* O que aconteceu */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-verdash-cyan" />
              <h3 className="font-semibold text-white font-grotesk">O que aconteceu?</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed font-inter pl-6">
              {analysis.whatHappened}
            </p>
            <div className="pl-6 text-xs text-white/60">
              Detectado em: {formatTimestamp(alert.timestamp)}
            </div>
          </div>

          {/* Por que é importante */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-verdash-coral" />
              <h3 className="font-semibold text-white font-grotesk">Por que isso é importante?</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed font-inter pl-6">
              {analysis.whyItMatters}
            </p>
          </div>

          {/* Possíveis causas */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-verdash-warning" />
              <h3 className="font-semibold text-white font-grotesk">Possíveis causas</h3>
            </div>
            <ul className="space-y-2 pl-6">
              {analysis.possibleCauses.map((cause, index) => (
                <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-verdash-warning mt-2 shrink-0"></div>
                  <span className="font-inter">{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recomendações */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-verdash-success" />
              <h3 className="font-semibold text-white font-grotesk">O que fazer agora</h3>
            </div>
            <ul className="space-y-2 pl-6">
              {analysis.recommendations.map((rec, index) => (
                <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-verdash-success mt-0.5 shrink-0" />
                  <span className="font-inter">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Limite (se aplicável) */}
          {alert.threshold && (
            <div className="p-4 rounded-lg bg-verdash-input-bg/30 border border-verdash-divider/30">
              <h4 className="text-sm font-medium text-white mb-2">Configuração do Alerta</h4>
              <p className="text-xs text-white/70">
                <span className="font-medium">Métrica:</span> {alert.threshold.metric} • 
                <span className="font-medium"> Limite:</span> {alert.threshold.operator === 'above' ? 'Acima de' : 'Abaixo de'} {alert.threshold.value}
              </p>
            </div>
          )}

          {/* Urgência */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-verdash-coral/20 to-verdash-error/20 border border-verdash-coral/30">
            <p className="text-sm text-white font-medium">
              <span className="text-verdash-coral">Urgência:</span> {analysis.urgency}
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-verdash-divider/30">
          <Button
            variant="outline"
            className="flex-1 verdash-btn-secondary"
            onClick={() => onOpenChange(false)}
          >
            Fechar
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => {
              onDismiss?.(alert.id);
              onOpenChange(false);
            }}
          >
            Marcar como Resolvido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
