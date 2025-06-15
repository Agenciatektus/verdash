
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Building } from "lucide-react";
import { Plan } from "@/types/billing";

interface PlanCardProps {
  plan: Plan;
  currentPlan?: boolean;
  onSelectPlan: (planId: string) => void;
  loading?: boolean;
}

export const PlanCard = ({ plan, currentPlan, onSelectPlan, loading }: PlanCardProps) => {
  const getIcon = () => {
    switch (plan.id) {
      case 'starter': return <Zap className="w-6 h-6" />;
      case 'engage': return <Crown className="w-6 h-6" />;
      case 'enterprise': return <Building className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  const getButtonText = () => {
    if (currentPlan) return 'Plano Atual';
    if (plan.id === 'enterprise') return 'Entrar em Contato';
    return 'Selecionar Plano';
  };

  return (
    <Card className={`verdash-glass relative ${currentPlan ? 'border-verdash-cyan shadow-verdash-glow' : ''} ${plan.popular ? 'border-verdash-coral' : ''}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-verdash-coral to-verdash-error text-white px-4 py-1">
            Mais Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-xl verdash-gradient">
            {getIcon()}
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-white font-grotesk uppercase">
          {plan.name}
        </CardTitle>
        <CardDescription className="text-white/70">
          <span className="text-4xl font-bold text-white">
            {plan.price === 0 ? 'Sob consulta' : `R$ ${plan.price}`}
          </span>
          {plan.price > 0 && (
            <span className="text-sm">/{plan.interval === 'monthly' ? 'mês' : 'ano'}</span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-verdash-success" />
            <span className="text-white/90">
              {plan.features.dashboards === -1 ? 'Dashboards ilimitados' : `${plan.features.dashboards} dashboards`}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-verdash-success" />
            <span className="text-white/90">
              {plan.features.dataSources === -1 ? 'Fontes de dados ilimitadas' : `${plan.features.dataSources} fontes de dados`}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-verdash-success" />
            <span className="text-white/90">
              {plan.features.teamUsers === -1 ? 'Usuários ilimitados' : `${plan.features.teamUsers} usuários`}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-verdash-success" />
            <span className="text-white/90">
              {plan.features.clients === -1 ? 'Clientes ilimitados' : `${plan.features.clients} clientes`}
            </span>
          </div>

          {plan.features.customMetrics && (
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-verdash-cyan" />
              <span className="text-white/90">KPIs e Métricas personalizadas</span>
            </div>
          )}

          {plan.features.aiFeatures && (
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-verdash-cyan" />
              <span className="text-white/90">Verdash IA</span>
            </div>
          )}

          {plan.features.interactiveLinks && (
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-verdash-cyan" />
              <span className="text-white/90">Links Interativos</span>
            </div>
          )}

          {plan.features.whiteLabel && (
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-verdash-cyan" />
              <span className="text-white/90">White Label</span>
            </div>
          )}

          {plan.features.reportAutomation && (
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-verdash-cyan" />
              <span className="text-white/90">Automação de relatórios</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-verdash-info" />
            <span className="text-white/90 text-sm">{plan.features.onboarding}</span>
          </div>

          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-verdash-info" />
            <span className="text-white/90 text-sm">{plan.features.support}</span>
          </div>
        </div>

        <Button 
          className={`w-full ${currentPlan ? 'verdash-btn-secondary' : 'verdash-btn-primary'}`}
          onClick={() => onSelectPlan(plan.id)}
          disabled={loading || currentPlan}
        >
          {getButtonText()}
        </Button>
      </CardContent>
    </Card>
  );
};
