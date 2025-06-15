
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { UserManagementSettings } from "@/components/admin/UserManagementSettings";
import { 
  Settings as SettingsIcon, 
  Users, 
  Bell, 
  Shield, 
  Palette,
  Database,
  Mail,
  Save
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    reports: true
  });

  const handleSaveSettings = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">Gerencie suas preferências e configurações do sistema</p>
        </div>
        <Button onClick={handleSaveSettings} className="verdash-btn-primary">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users">
            <Users className="w-4 h-4 mr-2" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="general">
            <SettingsIcon className="w-4 h-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Database className="w-4 h-4 mr-2" />
            Integrações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UserManagementSettings />
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Card className="verdash-card">
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Personalize a aparência e comportamento da aplicação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="company-name">Nome da Empresa</Label>
                  <Input id="company-name" defaultValue="Verdash Analytics" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Input id="timezone" defaultValue="America/Sao_Paulo" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="currency">Moeda Padrão</Label>
                  <Input id="currency" defaultValue="BRL" className="mt-1" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Tema e Aparência</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Modo Escuro</Label>
                    <p className="text-sm text-muted-foreground">Usar tema escuro da aplicação</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Animações</Label>
                    <p className="text-sm text-muted-foreground">Habilitar animações da interface</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="verdash-card">
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>Configure como e quando você deseja ser notificado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">Receber notificações importantes por email</p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notificações Push</Label>
                    <p className="text-sm text-muted-foreground">Receber notificações push no navegador</p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Relatórios Automáticos</Label>
                    <p className="text-sm text-muted-foreground">Receber relatórios semanais por email</p>
                  </div>
                  <Switch 
                    checked={notifications.reports}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, reports: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="verdash-card">
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>Gerencie suas configurações de segurança e privacidade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Senha Atual</Label>
                  <Input id="current-password" type="password" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input id="new-password" type="password" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  <Input id="confirm-password" type="password" className="mt-1" />
                </div>

                <Button className="verdash-btn-primary">
                  Alterar Senha
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Autenticação de Dois Fatores</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>2FA Habilitado</Label>
                    <p className="text-sm text-muted-foreground">Adicionar uma camada extra de segurança</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="verdash-card">
            <CardHeader>
              <CardTitle>Integrações</CardTitle>
              <CardDescription>Configure suas integrações com serviços externos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-border/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">G</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Google Ads</h4>
                      <p className="text-sm text-muted-foreground">Conectado</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Gerenciar</Button>
                </div>

                <div className="p-4 border border-border/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded bg-blue-800 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">F</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Meta Ads</h4>
                      <p className="text-sm text-muted-foreground">Conectado</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Gerenciar</Button>
                </div>

                <div className="p-4 border border-border/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded bg-green-600 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">S</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Google Sheets</h4>
                      <p className="text-sm text-muted-foreground">Conectado</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Gerenciar</Button>
                </div>

                <div className="p-4 border border-border/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded bg-orange-600 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">C</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">CRM</h4>
                      <p className="text-sm text-muted-foreground">Não conectado</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Conectar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
