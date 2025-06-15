
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface DashboardConfig {
  name: string;
  description: string;
  project: string;
  client: string;
  dataSource: string;
}

interface DashboardSettingsProps {
  currentConfig: DashboardConfig;
  onSave: (config: DashboardConfig) => void;
}

const mockProjects = [
  { id: 'ecommerce', name: 'E-commerce Principal' },
  { id: 'marketing', name: 'Marketing Digital' },
  { id: 'b2b', name: 'Vendas B2B' },
];

const mockClients = [
  { id: 'client1', name: 'Cliente A' },
  { id: 'client2', name: 'Cliente B' },
  { id: 'client3', name: 'Cliente C' },
];

const mockDataSources = [
  { id: 'google-ads', name: 'Google Ads' },
  { id: 'meta-ads', name: 'Meta Ads' },
  { id: 'analytics', name: 'Google Analytics' },
  { id: 'crm', name: 'CRM Principal' },
];

export const DashboardSettings = ({ currentConfig, onSave }: DashboardSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<DashboardConfig>(currentConfig);

  const handleSave = () => {
    onSave(config);
    setIsOpen(false);
    toast.success('Configurações do dashboard atualizadas!');
  };

  const resetForm = () => {
    setConfig(currentConfig);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="verdash-btn-secondary"
        >
          <Settings className="w-4 h-4 mr-2" />
          Configurações
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] bg-verdash-background border-verdash-divider">
        <DialogHeader>
          <DialogTitle className="text-white font-grotesk text-xl">
            Configurações do Dashboard
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Informações Básicas */}
          <Card className="verdash-glass">
            <CardHeader>
              <CardTitle className="text-white font-grotesk text-lg">
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dashboard-name" className="text-white font-medium">
                  Nome do Dashboard *
                </Label>
                <Input
                  id="dashboard-name"
                  placeholder="Ex: Performance de Vendas Q4"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  className="bg-verdash-input-bg border-verdash-divider text-white placeholder:text-white/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dashboard-description" className="text-white font-medium">
                  Descrição
                </Label>
                <Textarea
                  id="dashboard-description"
                  placeholder="Descreva o objetivo e contexto deste dashboard..."
                  value={config.description}
                  onChange={(e) => setConfig({ ...config, description: e.target.value })}
                  rows={3}
                  className="resize-none bg-verdash-input-bg border-verdash-divider text-white placeholder:text-white/40"
                />
              </div>
            </CardContent>
          </Card>

          {/* Configurações de Projeto */}
          <Card className="verdash-glass">
            <CardHeader>
              <CardTitle className="text-white font-grotesk text-lg">
                Projeto e Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dashboard-project" className="text-white font-medium">
                    Projeto *
                  </Label>
                  <Select value={config.project} onValueChange={(value) => setConfig({ ...config, project: value })}>
                    <SelectTrigger className="bg-verdash-input-bg border-verdash-divider text-white">
                      <SelectValue placeholder="Selecione um projeto" />
                    </SelectTrigger>
                    <SelectContent className="bg-verdash-background border-verdash-divider">
                      {mockProjects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dashboard-client" className="text-white font-medium">
                    Cliente
                  </Label>
                  <Select value={config.client} onValueChange={(value) => setConfig({ ...config, client: value })}>
                    <SelectTrigger className="bg-verdash-input-bg border-verdash-divider text-white">
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent className="bg-verdash-background border-verdash-divider">
                      {mockClients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fonte de Dados */}
          <Card className="verdash-glass">
            <CardHeader>
              <CardTitle className="text-white font-grotesk text-lg">
                Fonte de Dados Principal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dashboard-datasource" className="text-white font-medium">
                  Fonte de Dados *
                </Label>
                <Select value={config.dataSource} onValueChange={(value) => setConfig({ ...config, dataSource: value })}>
                  <SelectTrigger className="bg-verdash-input-bg border-verdash-divider text-white">
                    <SelectValue placeholder="Selecione uma fonte de dados" />
                  </SelectTrigger>
                  <SelectContent className="bg-verdash-background border-verdash-divider">
                    {mockDataSources.map((source) => (
                      <SelectItem key={source.id} value={source.id}>
                        {source.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-verdash-divider">
          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              setIsOpen(false);
            }}
            className="verdash-btn-secondary"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={!config.name || !config.project || !config.dataSource}
            className="verdash-btn-primary"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
