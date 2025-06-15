
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, ExternalLink, Plug } from "lucide-react";
import { NewIntegrationDialog } from "@/components/integrations/NewIntegrationDialog";
import { useToast } from "@/hooks/use-toast";

const initialIntegrations = [
  {
    id: 1,
    name: "Google Analytics",
    description: "Conecte suas métricas do GA4 diretamente aos dashboards",
    status: "connected",
    icon: "📊",
    lastSync: "2 minutos atrás"
  },
  {
    id: 2,
    name: "Meta Ads",
    description: "Importe dados de campanhas do Facebook e Instagram",
    status: "connected",
    icon: "📱",
    lastSync: "15 minutos atrás"
  },
  {
    id: 3,
    name: "Google Sheets",
    description: "Sincronize dados de planilhas automaticamente",
    status: "disconnected",
    icon: "📋",
    lastSync: "Nunca conectado"
  },
  {
    id: 4,
    name: "Webhooks",
    description: "Receba dados em tempo real via endpoints personalizados",
    status: "connected",
    icon: "🔗",
    lastSync: "Tempo real"
  }
];

export default function Integrations() {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const { toast } = useToast();

  const handleIntegrationAdded = (newIntegration: any) => {
    setIntegrations(prev => [...prev, newIntegration]);
  };

  const handleConnect = (integrationId: number, integrationName: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { 
              ...integration, 
              status: "connected", 
              lastSync: "Agora mesmo" 
            }
          : integration
      )
    );

    toast({
      title: "Sucesso",
      description: `${integrationName} conectado com sucesso!`,
    });
  };

  const handleDisconnect = (integrationId: number, integrationName: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { 
              ...integration, 
              status: "disconnected", 
              lastSync: "Desconectado" 
            }
          : integration
      )
    );

    toast({
      title: "Desconectado",
      description: `${integrationName} foi desconectado.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white font-grotesk uppercase tracking-wide">
            Integrações
          </h1>
          <p className="text-white/70 mt-2 font-inter">
            Conecte suas fontes de dados e automatize a coleta de informações
          </p>
        </div>
        <NewIntegrationDialog onIntegrationAdded={handleIntegrationAdded} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="verdash-kpi">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/80 font-grotesk uppercase">
              Integrações Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">
              {integrations.filter(i => i.status === 'connected').length}
            </div>
            <p className="text-verdash-success text-sm">
              de {integrations.length} configuradas
            </p>
          </CardContent>
        </Card>

        <Card className="verdash-kpi">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/80 font-grotesk uppercase">
              Dados Sincronizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">98.5%</div>
            <p className="text-verdash-success text-sm">Taxa de sucesso</p>
          </CardContent>
        </Card>

        <Card className="verdash-kpi">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/80 font-grotesk uppercase">
              Última Atualização
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-white mb-2">Agora</div>
            <p className="text-verdash-info text-sm">Tempo real ativo</p>
          </CardContent>
        </Card>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="verdash-glass verdash-glass-hover">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{integration.icon}</div>
                  <div>
                    <CardTitle className="text-white font-grotesk flex items-center gap-2">
                      {integration.name}
                      {integration.status === 'connected' ? (
                        <CheckCircle className="w-5 h-5 text-verdash-success" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-verdash-error" />
                      )}
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      {integration.description}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Status:</span>
                  <span className={`font-medium ${
                    integration.status === 'connected' 
                      ? 'text-verdash-success' 
                      : 'text-verdash-error'
                  }`}>
                    {integration.status === 'connected' ? 'Conectado' : 'Desconectado'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Última sincronização:</span>
                  <span className="text-white">{integration.lastSync}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  {integration.status === 'connected' ? (
                    <>
                      <Button size="sm" className="flex-1 verdash-btn-secondary">
                        Configurar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="verdash-btn-secondary"
                        onClick={() => handleDisconnect(integration.id, integration.name)}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <Button 
                      size="sm" 
                      className="flex-1 verdash-btn-primary"
                      onClick={() => handleConnect(integration.id, integration.name)}
                    >
                      <Plug className="w-4 h-4 mr-2" />
                      Conectar
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
