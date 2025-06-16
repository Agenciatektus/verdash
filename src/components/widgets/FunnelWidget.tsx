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
    color: "#1042F6",
    metric: "leads"
  },
  { 
    step: "Visita Agendada", 
    value: 350, 
    percentage: 35, 
    conversion: 35, 
    icon: "Calendar",
    color: "#00FFB0",
    metric: "visitas_agendadas"
  },
  { 
    step: "Em Orçamento", 
    value: 210, 
    percentage: 21, 
    conversion: 60, 
    icon: "Calculator",
    color: "#FF6F1B",
    metric: "orcamentos"
  },
  { 
    step: "Aguardando Pagamento", 
    value: 105, 
    percentage: 10.5, 
    conversion: 50, 
    icon: "Clock",
    color: "#9c88ff",
    metric: "aguardando_pagamento"
  },
  { 
    step: "Vendas", 
    value: 84, 
    percentage: 8.4, 
    conversion: 80, 
    icon: "DollarSign",
    color: "#FF4757",
    metric: "vendas"
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
    <Card className={`verdash-glass h-full p-6 ${isEditing ? 'ring-2 ring-verdash-cyan' : ''}`}>
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
      <CardContent className="relative p-4" style={{height: '90%'}}>
        <div className="w-full flex justify-center items-center relative" style={{height: '100%'}}>
          {/* Métricas */}
          {widget.config?.stages && (
            <div className="w-full h-full flex flex-col items-center justify-between py-8">
              {widget.config.stages.map((stage, index) => {
                const colors = ['#0095FF', '#0031D3', '#8D00F9', '#DA28DD', '#DD5500'];
                const widths = [500, 450, 400, 350, 300];
                const heights = 120;
                const fontSizes = [25, 23, 21, 19, 17];
                const subFontSizes = [17, 16, 15, 15, 14];
                const previousValue = Math.round(stage.value * (0.8 + Math.random() * 0.4));
                const difference = stage.value - previousValue;
                const percentageChange = ((difference / previousValue) * 100).toFixed(1);
                const isPositive = difference >= 0;
                // Trapézio arredondado
                const w = widths[index];
                const h = heights;
                const rTop = 20; // raio do arredondamento superior
                const rBot = 10; // raio do arredondamento inferior
                // Path SVG para trapézio com cantos arredondados (20px em cima, 10px embaixo)
                const path = `M${rTop},0 Q0,0 0,${rTop} L40,${h - rBot} Q40,${h} ${40 + rBot},${h} L${w - 40 - rBot},${h} Q${w - 40},${h} ${w - 40},${h - rBot} L${w},${rTop} Q${w},0 ${w - rTop},0 Q${w - rTop},0 ${rTop},0 Z`;
                return (
                  <svg
                    key={index}
                    width={w}
                    height={h}
                    viewBox={`0 0 ${w} ${h}`}
                    style={{ marginBottom: index < widget.config.stages.length - 1 ? 12 : 0 }}
                  >
                    <path d={path} fill={colors[index]} />
                    <foreignObject x="0" y="0" width={w} height={h}>
                      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: `${h}px`, width: `${w}px`}}>
                        <span style={{color: 'white', fontWeight: 'bold', fontSize: fontSizes[index], textShadow: '0 1px 4px #0008'}}>{stage.value}</span>
                        <span style={{color: 'white', fontSize: subFontSizes[index], opacity: 0.8}}>{stage.step} ({stage.percentage}%)</span>
                        <span style={{color: 'white', fontSize: subFontSizes[index], opacity: 0.8, marginTop: 4}}>{isPositive ? '↑' : '↓'} {Math.abs(Number(percentageChange))}% <span style={{fontSize: 13}}>vs. anterior</span></span>
                      </div>
                    </foreignObject>
                  </svg>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
