
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PlanCard } from "@/components/billing/PlanCard";
import { UsageCard } from "@/components/billing/UsageCard";
import { BillingHistory } from "@/components/billing/BillingHistory";
import { Plan, UserSubscription, Usage, BillingHistory as BillingHistoryType } from "@/types/billing";
import { toast } from "sonner";
import { 
  CreditCard, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Settings,
  Crown
} from "lucide-react";

// Mock data - Em produção, isso viria de uma API
const mockPlans: Plan[] = [
  {
    id: 'starter',
    name: 'Started',
    price: 97,
    currency: 'BRL',
    interval: 'monthly',
    features: {
      dashboards: 3,
      dataSources: 4,
      teamUsers: 3,
      clients: 2,
      aiFeatures: false,
      whiteLabel: false,
      interactiveLinks: false,
      prioritySupport: false,
      customMetrics: true,
      reportAutomation: true,
      onboarding: 'Reunião + suporte guiado',
      apiConfiguration: 'Self-service',
      support: 'Chat + Help Center'
    }
  },
  {
    id: 'engage',
    name: 'Engage',
    price: 247,
    currency: 'BRL',
    interval: 'monthly',
    features: {
      dashboards: 10,
      dataSources: 8,
      teamUsers: 5,
      clients: 10,
      aiFeatures: true,
      whiteLabel: false,
      interactiveLinks: true,
      prioritySupport: false,
      customMetrics: true,
      reportAutomation: true,
      onboarding: 'Onboarding + ajuda na configuração',
      apiConfiguration: 'Suporte na configuração',
      support: 'Chat + Help + Suporte estendido'
    },
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 0,
    currency: 'BRL',
    interval: 'monthly',
    features: {
      dashboards: -1,
      dataSources: -1,
      teamUsers: -1,
      clients: -1,
      aiFeatures: true,
      whiteLabel: true,
      interactiveLinks: true,
      prioritySupport: true,
      customMetrics: true,
      reportAutomation: true,
      onboarding: 'Implementação completa feita pela Verdash',
      apiConfiguration: 'Verdash faz toda a integração',
      support: 'Suporte Premium + WhatsApp + Gerente de Contas'
    }
  }
];

const mockSubscription: UserSubscription = {
  id: 'sub_1',
  planId: 'engage',
  status: 'active',
  currentPeriodStart: '2024-01-01T00:00:00Z',
  currentPeriodEnd: '2024-02-01T00:00:00Z',
  cancelAtPeriodEnd: false
};

const mockUsage: Usage = {
  dashboards: 8,
  dataSources: 6,
  teamUsers: 4,
  clients: 8
};

const mockHistory: BillingHistoryType[] = [
  {
    id: '1',
    amount: 247,
    currency: 'BRL',
    status: 'paid',
    date: '2024-01-01T00:00:00Z',
    invoiceUrl: '#',
    description: 'Plano Engage - Janeiro 2024'
  },
  {
    id: '2',
    amount: 247,
    currency: 'BRL',
    status: 'paid',
    date: '2023-12-01T00:00:00Z',
    invoiceUrl: '#',
    description: 'Plano Engage - Dezembro 2023'
  }
];

const Billing = () => {
  const [subscription, setSubscription] = useState<UserSubscription>(mockSubscription);
  const [usage, setUsage] = useState<Usage>(mockUsage);
  const [loading, setLoading] = useState(false);

  const currentPlan = mockPlans.find(plan => plan.id === subscription.planId);

  const handleSelectPlan = async (planId: string) => {
    if (planId === 'enterprise') {
      toast.info('Redirecionando para contato comercial...');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubscription(prev => ({ ...prev, planId }));
      toast.success('Plano alterado com sucesso!');
    } catch (error) {
      toast.error('Erro ao alterar plano. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubscription(prev => ({ ...prev, cancelAtPeriodEnd: true }));
      toast.success('Assinatura cancelada. Seus recursos permanecerão ativos até o final do período.');
    } catch (error) {
      toast.error('Erro ao cancelar assinatura.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (subscription.cancelAtPeriodEnd) {
      return <Badge variant="destructive">Cancelando</Badge>;
    }
    switch (subscription.status) {
      case 'active':
        return <Badge className="bg-[#0A0E1E] text-white">Ativo</Badge>;
      case 'past_due':
        return <Badge variant="destructive">Vencido</Badge>;
      case 'trialing':
        return <Badge className="bg-verdash-info text-white">Teste Grátis</Badge>;
      default:
        return <Badge variant="secondary">Inativo</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white font-grotesk uppercase tracking-wide">
          Planos & Faturamento
        </h1>
        <p className="text-white/70 mt-2 font-inter">
          Gerencie sua assinatura, pagamentos e limites de uso
        </p>
      </div>

      {/* Current Plan Overview */}
      <Card className="verdash-glass border-verdash-cyan shadow-verdash-glow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-verdash-cyan" />
              <div>
                <CardTitle className="text-white font-grotesk uppercase">
                  Plano Atual: {currentPlan?.name}
                </CardTitle>
                <CardDescription className="text-white/70">
                  Status da sua assinatura e próxima cobrança
                </CardDescription>
              </div>
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-white/60 uppercase tracking-wide">Valor Mensal</div>
              <div className="text-2xl font-bold text-white">
                {currentPlan?.price === 0 ? 'Sob consulta' : `R$ ${currentPlan?.price}`}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-white/60 uppercase tracking-wide">Próxima Cobrança</div>
              <div className="text-lg text-white">
                {new Date(subscription.currentPeriodEnd).toLocaleDateString('pt-BR')}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-white/60 uppercase tracking-wide">Ações</div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="verdash-btn-secondary">
                  <Settings className="w-4 h-4 mr-2" />
                  Gerenciar
                </Button>
                {subscription.status === 'active' && !subscription.cancelAtPeriodEnd && (
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={handleCancelSubscription}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Usage Card */}
        <div className="lg:col-span-1">
          <UsageCard usage={usage} plan={currentPlan!} />
        </div>

        {/* Plans Grid */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white font-grotesk uppercase mb-2">
                Planos Disponíveis
              </h2>
              <p className="text-white/70">
                Escolha o plano ideal para suas necessidades
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  currentPlan={plan.id === subscription.planId}
                  onSelectPlan={handleSelectPlan}
                  loading={loading}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <BillingHistory history={mockHistory} />

      {/* Usage Warnings */}
      {currentPlan && (
        <Card className="verdash-glass border-verdash-warning">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white font-grotesk uppercase">
              <AlertTriangle className="w-5 h-5 text-verdash-warning" />
              Limites de Uso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {usage.dashboards >= currentPlan.features.dashboards && currentPlan.features.dashboards !== -1 && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-verdash-warning/10 border border-verdash-warning/30">
                  <AlertTriangle className="w-5 h-5 text-verdash-warning" />
                  <span className="text-white">
                    Você atingiu o limite de dashboards do seu plano. Faça upgrade para criar mais.
                  </span>
                </div>
              )}
              
              {usage.dataSources >= currentPlan.features.dataSources && currentPlan.features.dataSources !== -1 && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-verdash-warning/10 border border-verdash-warning/30">
                  <AlertTriangle className="w-5 h-5 text-verdash-warning" />
                  <span className="text-white">
                    Você atingiu o limite de fontes de dados. Considere fazer upgrade.
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Billing;
