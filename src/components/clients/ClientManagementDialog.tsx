
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, BarChart3, Database, Settings, Plus, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Client {
  id: number;
  name: string;
  industry: string;
  dashboards: number;
  users: number;
  status: string;
  lastAccess: string;
}

interface ClientManagementDialogProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mock data para dashboards do cliente
const getClientDashboards = (clientId: number) => [
  { id: 1, name: "Dashboard Vendas", status: "ativo", lastUpdate: "2 horas atrás" },
  { id: 2, name: "Dashboard Marketing", status: "ativo", lastUpdate: "1 dia atrás" },
  { id: 3, name: "Dashboard Financeiro", status: "inativo", lastUpdate: "3 dias atrás" },
];

// Mock data para fontes de dados do cliente
const getClientDataSources = (clientId: number) => [
  { id: 1, name: "Google Analytics", type: "Analytics", status: "conectado" },
  { id: 2, name: "Salesforce CRM", type: "CRM", status: "conectado" },
  { id: 3, name: "MySQL Database", type: "Database", status: "desconectado" },
];

export default function ClientManagementDialog({ client, isOpen, onClose }: ClientManagementDialogProps) {
  const [activeTab, setActiveTab] = useState<'dashboards' | 'datasources'>('dashboards');

  if (!client) return null;

  const dashboards = getClientDashboards(client.id);
  const dataSources = getClientDataSources(client.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="verdash-glass border-verdash-cyan max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white font-grotesk uppercase flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl verdash-gradient flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            Gestão de Cliente - {client.name}
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Gerencie dashboards e fontes de dados do cliente {client.industry}
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => setActiveTab('dashboards')}
            variant={activeTab === 'dashboards' ? 'default' : 'outline'}
            className={activeTab === 'dashboards' ? 'verdash-btn-primary' : 'verdash-btn-secondary'}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Dashboards
          </Button>
          <Button
            onClick={() => setActiveTab('datasources')}
            variant={activeTab === 'datasources' ? 'default' : 'outline'}
            className={activeTab === 'datasources' ? 'verdash-btn-primary' : 'verdash-btn-secondary'}
          >
            <Database className="w-4 h-4 mr-2" />
            Fontes de Dados
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'dashboards' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white font-grotesk uppercase">
                  Dashboards ({dashboards.length})
                </h3>
                <Button size="sm" className="verdash-btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Dashboard
                </Button>
              </div>
              <div className="space-y-3">
                {dashboards.map((dashboard) => (
                  <Card key={dashboard.id} className="verdash-glass">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <BarChart3 className="w-5 h-5 text-verdash-cyan" />
                          <div>
                            <h4 className="text-white font-medium">{dashboard.name}</h4>
                            <p className="text-white/60 text-sm">Atualizado {dashboard.lastUpdate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              dashboard.status === 'ativo'
                                ? 'bg-verdash-success/20 text-verdash-success'
                                : 'bg-verdash-error/20 text-verdash-error'
                            }
                          >
                            {dashboard.status}
                          </Badge>
                          <Button size="sm" variant="outline" className="verdash-btn-secondary">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="verdash-btn-secondary">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'datasources' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white font-grotesk uppercase">
                  Fontes de Dados ({dataSources.length})
                </h3>
                <Button size="sm" className="verdash-btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Fonte
                </Button>
              </div>
              <div className="space-y-3">
                {dataSources.map((source) => (
                  <Card key={source.id} className="verdash-glass">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Database className="w-5 h-5 text-verdash-info" />
                          <div>
                            <h4 className="text-white font-medium">{source.name}</h4>
                            <p className="text-white/60 text-sm">{source.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              source.status === 'conectado'
                                ? 'bg-verdash-success/20 text-verdash-success'
                                : 'bg-verdash-error/20 text-verdash-error'
                            }
                          >
                            {source.status}
                          </Badge>
                          <Button size="sm" variant="outline" className="verdash-btn-secondary">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 pt-4 border-t border-verdash-divider">
          <Button onClick={onClose} variant="outline" className="verdash-btn-secondary flex-1">
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
