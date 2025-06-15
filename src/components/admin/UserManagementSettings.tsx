
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Mail, 
  Users, 
  Shield,
  User,
  UserPlus
} from "lucide-react";
import { toast } from "sonner";

const users = [
  {
    id: '1',
    name: 'Administrador',
    username: 'admin',
    email: 'admin@admin.com',
    role: 'admin',
    status: 'active',
    lastLogin: 'Invalid Date'
  },
  {
    id: '2',
    name: 'Tektus',
    username: 'Tektus',
    email: 'agenciatektus@gmail.com',
    role: 'admin',
    status: 'active',
    lastLogin: 'Invalid Date'
  }
];

export const UserManagementSettings = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'team'
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Nome e email são obrigatórios");
      return;
    }

    toast.success("Usuário adicionado com sucesso!");
    setIsAddUserOpen(false);
    setNewUser({ name: '', email: '', role: 'team' });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4" />;
      case 'team':
        return <User className="w-4 h-4" />;
      case 'client':
        return <UserPlus className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'team':
        return 'Time';
      case 'client':
        return 'Cliente';
      default:
        return 'Usuário';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      case 'team':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
      case 'client':
        return 'bg-green-500/10 text-green-500 border-green-500/30';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <Card className="verdash-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gerenciamento de Usuários</CardTitle>
            <CardDescription>
              Adicione, edite e gerencie usuários do sistema
            </CardDescription>
          </div>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="verdash-btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Usuário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                <DialogDescription>
                  Preencha as informações do novo usuário
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="user-name">Nome Completo</Label>
                  <Input
                    id="user-name"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Digite o nome completo"
                  />
                </div>
                
                <div>
                  <Label htmlFor="user-email">E-mail</Label>
                  <Input
                    id="user-email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="usuario@exemplo.com"
                  />
                </div>

                <div>
                  <Label htmlFor="user-role">Função</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma função" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="team">Membro do Time</SelectItem>
                      <SelectItem value="client">Cliente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleAddUser} className="flex-1 verdash-btn-primary">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Adicionar Usuário
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nome</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Usuário</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">E-mail</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Função</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Último acesso</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border/10 hover:bg-muted/20">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{user.username}</td>
                    <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge className={getRoleColor(user.role)}>
                        {getRoleIcon(user.role)}
                        <span className="ml-1">{getRoleLabel(user.role)}</span>
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {user.lastLogin === 'Invalid Date' ? 'Nunca' : user.lastLogin}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
