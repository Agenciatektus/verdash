
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Usage, Plan } from "@/types/billing";
import { AlertTriangle } from "lucide-react";

interface UsageCardProps {
  usage: Usage;
  plan: Plan;
}

export const UsageCard = ({ usage, plan }: UsageCardProps) => {
  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === -1) return 0; // Unlimited
    return Math.min((used / limit) * 100, 100);
  };

  const isNearLimit = (used: number, limit: number) => {
    if (limit === -1) return false;
    return (used / limit) >= 0.8;
  };

  const isOverLimit = (used: number, limit: number) => {
    if (limit === -1) return false;
    return used >= limit;
  };

  const usageItems = [
    {
      label: 'Dashboards',
      used: usage.dashboards,
      limit: plan.features.dashboards,
      icon: '📊'
    },
    {
      label: 'Fontes de Dados',
      used: usage.dataSources,
      limit: plan.features.dataSources,
      icon: '🔌'
    },
    {
      label: 'Usuários da Equipe',
      used: usage.teamUsers,
      limit: plan.features.teamUsers,
      icon: '👥'
    },
    {
      label: 'Clientes',
      used: usage.clients,
      limit: plan.features.clients,
      icon: '🏢'
    }
  ];

  return (
    <Card className="verdash-glass">
      <CardHeader>
        <CardTitle className="text-white font-grotesk uppercase">Uso do Plano</CardTitle>
        <CardDescription className="text-white/70">
          Acompanhe o consumo dos recursos do seu plano atual
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {usageItems.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <span className="text-white/90 font-medium">{item.label}</span>
                {isOverLimit(item.used, item.limit) && (
                  <AlertTriangle className="w-4 h-4 text-verdash-error" />
                )}
              </div>
              <div className="text-white/70 text-sm">
                {item.used}/{item.limit === -1 ? '∞' : item.limit}
              </div>
            </div>
            
            {item.limit !== -1 && (
              <Progress 
                value={getUsagePercentage(item.used, item.limit)}
                className={`h-2 ${
                  isOverLimit(item.used, item.limit) 
                    ? 'progress-error' 
                    : isNearLimit(item.used, item.limit) 
                    ? 'progress-warning' 
                    : 'progress-success'
                }`}
              />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
