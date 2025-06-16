import { Bell, Search, HelpCircle, User, LogOut, BookOpen, MessageCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Dados mockados de notificações
const notifications = [
  { id: 1, title: "Nova venda", message: "Venda de R$ 5.000 realizada", time: "5 min atrás" },
  { id: 2, title: "Meta atingida", message: "Meta de leads atingida", time: "1 hora atrás" },
  { id: 3, title: "Alerta de churn", message: "Cliente em risco de churn", time: "2 horas atrás" }
];

// Links de suporte rápido
const supportLinks = [
  { id: 1, title: "Documentação", icon: BookOpen, href: "/docs" },
  { id: 2, title: "Contato", icon: MessageCircle, href: "/support" },
  { id: 3, title: "FAQ", icon: FileText, href: "/faq" }
];

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 border-b border-white/5 bg-[#0A0E1E]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Pesquisar dashboards, métricas..."
            className="pl-10 w-64 md:w-96 bg-background/50 transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-white/5 transition-all duration-300">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-card/30 backdrop-blur-md border-white/5">
            <div className="p-2">
              <h3 className="text-sm font-semibold mb-2">Notificações</h3>
              {notifications.map((notification) => (
                <div key={notification.id} className="p-2 hover:bg-white/5 rounded-md transition-all duration-300">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-white/5 transition-all duration-300">
              <HelpCircle className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card/30 backdrop-blur-md border-white/5">
            <div className="p-2">
              <h3 className="text-sm font-semibold mb-2">Suporte Rápido</h3>
              {supportLinks.map((link) => (
                <a key={link.id} href={link.href} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-md transition-all duration-300">
                  <link.icon className="w-4 h-4" />
                  <span className="text-sm">{link.title}</span>
                </a>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-white/5 transition-all duration-300">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-gradient-to-br from-verdash-blue to-verdash-cyan text-white">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card/30 backdrop-blur-md border-white/5">
            <DropdownMenuItem className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-red-500" onClick={logout}>
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
