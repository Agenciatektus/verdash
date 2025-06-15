
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";

const funnelData = [
  { step: "Impressões", value: 125000, percentage: 100, conversion: 0, trend: "neutral" },
  { step: "Cliques", value: 8750, percentage: 7.0, conversion: 7.0, trend: "up" },
  { step: "Visualizações LP", value: 6125, percentage: 4.9, conversion: 70.0, trend: "up" },
  { step: "Submissões Formulário", value: 1838, percentage: 1.47, conversion: 30.0, trend: "down" },
  { step: "Leads Qualificados", value: 919, percentage: 0.74, conversion: 50.0, trend: "up" },
  { step: "Conversões", value: 184, percentage: 0.15, conversion: 20.0, trend: "up" }
];

export const FunnelSteps = () => {
  return (
    <Card className="verdash-card">
      <CardHeader>
        <CardTitle>Etapas do Funil</CardTitle>
        <CardDescription>Conversão entre etapas e performance geral</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {funnelData.map((item, index) => (
            <div key={index} className="p-4 rounded-lg border border-border/30 bg-card/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-foreground">{item.step}</span>
                  {item.trend !== "neutral" && (
                    item.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-verdash-success" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-verdash-error" />
                    )
                  )}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">
                    {item.value.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.percentage.toFixed(2)}%
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={item.percentage} className="flex-1 h-2" />
                {index > 0 && (
                  <span className={`text-sm font-medium ${
                    item.conversion >= 50 ? 'text-verdash-success' : 
                    item.conversion >= 25 ? 'text-yellow-500' : 'text-verdash-error'
                  }`}>
                    {item.conversion.toFixed(1)}% conv.
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
