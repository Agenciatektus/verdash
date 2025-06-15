
import { Widget } from "@/types/widgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TrendingDown, Users, Calendar, Calculator, Clock, DollarSign, Settings } from "lucide-react";
import { FunnelConfigForm } from "./FunnelConfigForm";

interface FunnelWidgetProps {
  widget: Widget;
  isEditing?: boolean;
  onUpdate?: (widget: Widget) => void;
}

const defaultFunnelData = [
  { 
    step: "Novos Leads", 
    value: 1000, 
    percentage: 100, 
    conversion: 0, 
    icon: "Users",
    color: "#1042F6" 
  },
  { 
    step: "Visita Agendada", 
    value: 350, 
    percentage: 35, 
    conversion: 35, 
    icon: "Calendar",
    color: "#00FFB0" 
  },
  { 
    step: "Em Orçamento", 
    value: 210, 
    percentage: 21, 
    conversion: 60, 
    icon: "Calculator",
    color: "#FF6F1B" 
  },
  { 
    step: "Aguardando Pagamento", 
    value: 105, 
    percentage: 10.5, 
    conversion: 50, 
    icon: "Clock",
    color: "#9c88ff" 
  },
  { 
    step: "Vendas", 
    value: 84, 
    percentage: 8.4, 
    conversion: 80, 
    icon: "DollarSign",
    color: "#FF4757" 
  }
];

const iconMap = {
  Users,
  Calendar,
  Calculator,
  Clock,
  DollarSign,
  TrendingDown
};

export const FunnelWidget = ({ widget, isEditing = false, onUpdate }: FunnelWidgetProps) => {
  const funnelData = widget.config.stages || defaultFunnelData;

  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Users;
  };

  return (
    <Card className="verdash-glass h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white font-grotesk">
            <TrendingDown className="w-5 h-5 text-verdash-cyan" />
            {widget.title}
          </CardTitle>
          {isEditing && onUpdate && (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                  <Settings className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <FunnelConfigForm 
                  widget={widget} 
                  onUpdate={onUpdate}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
        {widget.description && (
          <p className="text-sm text-white/60">{widget.description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {funnelData.map((item, index) => {
          const IconComponent = getIcon(item.icon);
          
          return (
            <div key={index} className="relative">
              {/* Stage Card */}
              <div className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: item.color }}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="font-medium text-white">{item.step}</span>
                      {item.metric && (
                        <div className="text-xs text-white/40 mt-1">
                          Métrica: {item.metric}
                        </div>
                      )}
                      {index > 0 && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs font-medium px-2 py-1 rounded ${
                            item.conversion >= 60 ? 'bg-verdash-success/20 text-verdash-success' : 
                            item.conversion >= 40 ? 'bg-yellow-500/20 text-yellow-400' : 
                            'bg-verdash-error/20 text-verdash-error'
                          }`}>
                            {item.conversion.toFixed(1)}% conversão
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">
                      {item.value.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-sm text-white/60">
                      {item.percentage.toFixed(1)}% do total
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="space-y-2">
                  <Progress 
                    value={item.percentage} 
                    className="h-2"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                    }}
                  />
                  <div className="flex justify-between text-xs text-white/40">
                    <span>0</span>
                    <span>{Math.max(...funnelData.map(d => d.value)).toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              </div>

              {/* Conversion Arrow (except for last item) */}
              {index < funnelData.length - 1 && (
                <div className="flex items-center justify-center py-2">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <TrendingDown className="w-4 h-4 text-white/60" />
                    <span className="text-xs text-white/60">
                      -{(100 - funnelData[index + 1].conversion).toFixed(0)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Summary */}
        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-verdash-blue/20 to-verdash-cyan/20 border border-verdash-cyan/30">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white">Taxa de Conversão Geral</span>
            <span className="text-lg font-bold text-verdash-cyan">
              {((funnelData[funnelData.length - 1].value / funnelData[0].value) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="text-xs text-white/60 mt-1">
            {funnelData[0].value.toLocaleString('pt-BR')} leads → {funnelData[funnelData.length - 1].value.toLocaleString('pt-BR')} vendas
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
