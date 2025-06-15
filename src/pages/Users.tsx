
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Mail,
  Shield,
  User,
  Edit,
  Trash2,
  UserPlus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth, type UserRole } from "@/contexts/AuthContext";

const mockUsers = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana@verdash.com',
    role: 'admin' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612d367?w=32&h=32&fit=crop&crop=face',
    status: 'active',
    lastLogin: '2024-01-15',
    projects: ['E-commerce Principal', 'Marketing Digital']
  },
  {
    id: '2', 
    name: 'Carlos Santos',
    email: 'carlos@empresa.com',
    role: 'team' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    status: 'active',
    lastLogin: '2024-01-14',
    projects: ['E-commerce Principal']
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    email: 'maria@cliente.com',
    role: 'client' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    status: 'active',
    lastLogin: '2024-01-13',
    projects: ['Vendas B2B']
  },
  {
    id: '4',
    name: 'João Pereira',
    email: 'joao@empresa.com',
    role: 'team' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    status: 'inactive',
    lastLogin: '2024-01-05',
    projects: ['Marketing Digital', 'Suporte']
  }
];

const roleConfig = {
  admin: { label: 'Admin', color: 'bg-red-500/10 text-red-500', icon: Shield },
  team: { label: 'Time', color: 'bg-blue-500/10 text-blue-500', icon: User },
  client: { label: 'Cliente', color: 'bg-green-500/10 text-green-500', icon: UserPlus }
};

const Users = () => {
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: UserRole) => {
    const IconComponent = roleConfig[role].icon;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Usuários</h1>
          <p className="text-muted-foreground">Gerencie usuários, permissões e acesso aos projetos</p>
        </div>
        {currentUser?.role === 'admin' && (
          <Button className="verdash-gradient">
            <Plus className="w-4 h-4 mr-2" />
            Novo Usuário
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="verdash-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Usuários</p>
                <p className="text-2xl font-bold text-foreground">{mockUsers.length}</p>
              </div>
              <User className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="verdash-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Administradores</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockUsers.filter(u => u.role === 'admin').length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="verdash-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Usuários do Time</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockUsers.filter(u => u.role === 'team').length}
                </p>
              </div>
              <User className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="verdash-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clientes</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockUsers.filter(u => u.role === 'client').length}
                </p>
              </div>
              <UserPlus className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Pesquisar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={roleFilter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setRoleFilter("all")}
          >
            Todos
          </Button>
          <Button 
            variant={roleFilter === "admin" ? "default" : "outline"} 
            size="sm"
            onClick={() => setRoleFilter("admin")}
          >
            Admin
          </Button>
          <Button 
            variant={roleFilter === "team" ? "default" : "outline"} 
            size="sm"
            onClick={() => setRoleFilter("team")}
          >
            Time
          </Button>
          <Button 
            variant={roleFilter === "client" ? "default" : "outline"} 
            size="sm"
            onClick={() => setRoleFilter("client")}
          >
            Clientes
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <Card className="verdash-card">
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os usuários da plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Projetos</TableHead>
                <TableHead>Último Login</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={roleConfig[user.role].color}>
                      {getRoleIcon(user.role)}
                      <span className="ml-1">{roleConfig[user.role].label}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.status === 'active' ? 'default' : 'secondary'}
                      className={user.status === 'active' ? 'bg-green-500/10 text-green-500' : ''}
                    >
                      {user.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {user.projects.map((project, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {project}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {new Date(user.lastLogin).toLocaleDateString('pt-BR')}
                    </span>
                  </TableCell>
                  <TableCell>
                    {currentUser?.role === 'admin' && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover border border-border">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Enviar Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Nenhum usuário encontrado</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Tente ajustar sua pesquisa" : "Comece adicionando usuários à plataforma"}
          </p>
          {currentUser?.role === 'admin' && (
            <Button className="verdash-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Usuário
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
