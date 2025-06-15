
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Target } from "lucide-react";

const customMetrics = [
  { name: "Custo/lead Meta", value: "R$999,99" },
  { name: "Custo por lead Real - CRM", value: "R$999,99" },
  { name: "Custo por Lead qualificado", value: "R$999,99" },
  { name: "Custo por visita agendada", value: "R$999,99" },
  { name: "Custo por Briefing", value: "R$999,99" },
  { name: "Custo por Desenho de planta", value: "R$999,99" },
  { name: "Custo por Negociação", value: "R$999,99" },
  { name: "Custo por Ap. agendada", value: "R$999,99" }
];

interface CustomMetricsProps {
  onNewMetric?: () => void;
}

export const CustomMetrics = ({ onNewMetric }: CustomMetricsProps) => {
  return (
    <Card className="verdash-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Métricas De Custo</CardTitle>
            <CardDescription>Métricas personalizadas de custo por ação</CardDescription>
          </div>
          <Button onClick={onNewMetric} className="verdash-btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Nova Métrica
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customMetrics.map((metric, index) => (
            <div key={index} className="p-4 rounded-lg border border-border/30 hover:border-border/50 bg-card/20 hover:bg-card/40 verdash-animate">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-verdash-blue to-verdash-cyan flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{metric.name}</p>
                  <p className="text-xl font-bold text-foreground">{metric.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
