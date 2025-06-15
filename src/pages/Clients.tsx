
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, Building, BarChart3, Settings } from "lucide-react";

const clients = [
  {
    id: 1,
    name: "TechCorp Solutions",
    industry: "Tecnologia",
    dashboards: 5,
    users: 12,
    plan: "Enterprise",
    status: "active",
    lastAccess: "2 horas atrás"
  },
  {
    id: 2,
    name: "Marketing Pro Agency",
    industry: "Marketing",
    dashboards: 8,
    users: 25,
    plan: "Professional",
    status: "active",
    lastAccess: "30 minutos atrás"
  },
  {
    id: 3,
    name: "E-commerce Plus",
    industry: "Varejo",
    dashboards: 3,
    users: 8,
    plan: "Starter",
    status: "inactive",
    lastAccess: "3 dias atrás"
  }
];

export default function Clients() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white font-grotesk uppercase tracking-wide verdash-glow-text">
            Clientes
          </h1>
          <p className="text-white/70 mt-2 font-inter">
            Gerencie todos os seus clientes e seus respectivos dashboards
          </p>
        </div>
        <Button className="verdash-btn-primary verdash-hover-scale">
          <Plus className="w-5 h-5 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="verdash-kpi">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/80 font-grotesk uppercase">
              Total de Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">{clients.length}</div>
            <p className="text-verdash-success text-sm">+1 este mês</p>
          </CardContent>
        </Card>

        <Card className="verdash-kpi">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/80 font-grotesk uppercase">
              Clientes Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">
              {clients.filter(c => c.status === 'active').length}
            </div>
            <p className="text-verdash-success text-sm">
              {Math.round((clients.filter(c => c.status === 'active').length / clients.length) * 100)}% atividade
            </p>
          </CardContent>
        </Card>

        <Card className="verdash-kpi">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/80 font-grotesk uppercase">
              Total de Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">
              {clients.reduce((sum, client) => sum + client.users, 0)}
            </div>
            <p className="text-verdash-info text-sm">Across all clients</p>
          </CardContent>
        </Card>

        <Card className="verdash-kpi">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/80 font-grotesk uppercase">
              Total Dashboards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">
              {clients.reduce((sum, client) => sum + client.dashboards, 0)}
            </div>
            <p className="text-verdash-info text-sm">Dashboards criados</p>
          </CardContent>
        </Card>
      </div>

      {/* Clients List */}
      <div className="space-y-4">
        {clients.map((client) => (
          <Card key={client.id} className="verdash-glass verdash-glass-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl verdash-gradient flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white font-grotesk flex items-center gap-2">
                      {client.name}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        client.status === 'active' 
                          ? 'bg-verdash-success/20 text-verdash-success' 
                          : 'bg-verdash-error/20 text-verdash-error'
                      }`}>
                        {client.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      {client.industry} • Plano {client.plan}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="verdash-btn-primary">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Dashboards
                  </Button>
                  <Button size="sm" variant="outline" className="verdash-btn-secondary">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Dashboards:</span>
                  <span className="text-white font-medium">{client.dashboards}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Usuários:</span>
                  <span className="text-white font-medium">{client.users}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Último acesso:</span>
                  <span className="text-white font-medium">{client.lastAccess}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Plano:</span>
                  <span className="text-verdash-cyan font-medium">{client.plan}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
