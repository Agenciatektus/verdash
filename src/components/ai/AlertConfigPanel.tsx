
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, Trash2, Settings } from "lucide-react";
import { NewAlertDialog } from "./NewAlertDialog";

interface AlertFilter {
  client: string;
  status: 'all' | 'active' | 'inactive';
  alertType: string;
}

interface CustomAlert {
  id: string;
  name: string;
  client: string;
  metric: string;
  status: 'active' | 'inactive';
  conditions: string;
}

export const AlertConfigPanel = () => {
  const [newAlertOpen, setNewAlertOpen] = useState(false);
  const [filters, setFilters] = useState<AlertFilter>({
    client: 'all',
    status: 'all',
    alertType: 'all'
  });

  // Mock data para demonstração
  const [customAlerts, setCustomAlerts] = useState<CustomAlert[]>([
    {
      id: '1',
      name: 'CPC Alto - Google Ads',
      client: 'Cliente A',
      metric: 'Custo por Click',
      status: 'active',
      conditions: 'CPC > R$ 2.00'
    },
    {
      id: '2',
      name: 'Taxa de Conversão Baixa',
      client: 'Cliente B',
      metric: 'Taxa de Conversão',
      status: 'inactive',
      conditions: 'Conversão < 2%'
    }
  ]);

  const clients = ['Todos', 'Cliente A', 'Cliente B', 'Cliente C'];
  const alertTypes = ['Todos', 'Anomalia', 'Limite', 'Tendência'];

  const handleDeleteAlert = (alertId: string) => {
    setCustomAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const handleCreateAlert = (newAlert: Omit<CustomAlert, 'id'>) => {
    const alert: CustomAlert = {
      ...newAlert,
      id: Date.now().toString()
    };
    setCustomAlerts(prev => [...prev, alert]);
  };

  const filteredAlerts = customAlerts.filter(alert => {
    if (filters.client !== 'all' && alert.client !== filters.client) return false;
    if (filters.status !== 'all' && alert.status !== filters.status) return false;
    return true;
  });

  return (
    <>
      <Card className="verdash-glass">
        <CardHeader>
          <CardTitle className="text-white font-grotesk uppercase flex items-center gap-3">
            <Settings className="w-5 h-5 text-verdash-cyan" />
            Configuração de Alertas
          </CardTitle>
          <CardDescription className="text-white/70">
            Gerencie alertas personalizados e filtros
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Botão Novo Alerta */}
          <Button 
            className="w-full verdash-btn-primary"
            onClick={() => setNewAlertOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Alerta
          </Button>

          {/* Filtros Hierárquicos */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-verdash-cyan" />
              <h3 className="text-white font-medium font-grotesk">Filtros</h3>
            </div>

            {/* Cliente/Projeto */}
            <div className="space-y-2">
              <label className="text-sm text-white/70 font-inter">Cliente/Projeto</label>
              <select 
                value={filters.client}
                onChange={(e) => setFilters(prev => ({ ...prev, client: e.target.value }))}
                className="w-full bg-verdash-input-bg border border-verdash-divider/30 rounded-lg px-3 py-2 text-white text-sm focus:border-verdash-cyan focus:outline-none"
              >
                <option value="all">Todos os Clientes</option>
                {clients.slice(1).map(client => (
                  <option key={client} value={client}>{client}</option>
                ))}
              </select>
            </div>

            {/* Status do Alerta */}
            <div className="space-y-2">
              <label className="text-sm text-white/70 font-inter">Status do Alerta</label>
              <select 
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full bg-verdash-input-bg border border-verdash-divider/30 rounded-lg px-3 py-2 text-white text-sm focus:border-verdash-cyan focus:outline-none"
              >
                <option value="all">Todos os Status</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>

            {/* Tipo de Alerta */}
            <div className="space-y-2">
              <label className="text-sm text-white/70 font-inter">Tipo de Alerta</label>
              <select 
                value={filters.alertType}
                onChange={(e) => setFilters(prev => ({ ...prev, alertType: e.target.value }))}
                className="w-full bg-verdash-input-bg border border-verdash-divider/30 rounded-lg px-3 py-2 text-white text-sm focus:border-verdash-cyan focus:outline-none"
              >
                <option value="all">Todos os Tipos</option>
                {alertTypes.slice(1).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Lista de Alertas Personalizados */}
          <div className="space-y-4">
            <h3 className="text-white font-medium font-grotesk">Meus Alertas ({filteredAlerts.length})</h3>
            
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-white/60 text-sm">Nenhum alerta encontrado</p>
                <p className="text-white/40 text-xs mt-1">Ajuste os filtros ou crie um novo alerta</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredAlerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className="p-3 rounded-lg border border-verdash-divider/30 bg-verdash-input-bg/20 hover:bg-verdash-input-bg/40 verdash-animate"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-white text-sm font-medium">{alert.name}</h4>
                        <p className="text-white/60 text-xs">{alert.client} • {alert.metric}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={alert.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {alert.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-6 h-6 p-0 text-white/50 hover:text-verdash-error"
                          onClick={() => handleDeleteAlert(alert.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-white/70 text-xs bg-verdash-divider/20 rounded px-2 py-1">
                      {alert.conditions}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <NewAlertDialog
        open={newAlertOpen}
        onOpenChange={setNewAlertOpen}
        onCreateAlert={handleCreateAlert}
        clients={clients.slice(1)}
      />
    </>
  );
};
