
import { useState } from "react";
import { 
  LayoutDashboard, 
  FolderOpen, 
  BarChart3, 
  Users, 
  Settings, 
  ChevronDown,
  Plus,
  Activity,
  Brain,
  Ruler,
  Plug,
  MessageCircle,
  LogOut,
  CreditCard,
  Database
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAuth } from "@/contexts/AuthContext";

const mainNavigation = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Projetos", url: "/projects", icon: FolderOpen },
  { title: "Dashboards", url: "/dashboards", icon: Brain },
  { title: "Métricas & KPIs", url: "/metrics", icon: Ruler },
  { title: "Admin de Dados", url: "/data-admin", icon: Database },
  { title: "Verdash IA", url: "/verdash-ai", icon: Brain },
  { title: "Integrações", url: "/integrations", icon: Plug },
  { title: "Clientes", url: "/clients", icon: Users },
];

const bottomNavigation = [
  { title: "Planos & Billing", url: "/billing", icon: CreditCard },
  { title: "Suporte", url: "/support", icon: MessageCircle },
  { title: "Configurações", url: "/settings", icon: Settings },
];

const mockProjects = [
  { id: '1', name: 'E-commerce Principal', dashboards: 3 },
  { id: '2', name: 'Marketing Digital', dashboards: 5 },
  { id: '3', name: 'Vendas B2B', dashboards: 2 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [projectsOpen, setProjectsOpen] = useState(true);
  
  const currentPath = location.pathname;
  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path === "/" && currentPath === "/dashboard") return true;
    return currentPath === path;
  };
  const isCollapsed = state === "collapsed";

  const getNavClass = (active: boolean) => 
    active 
      ? "verdash-sidebar-item active" 
      : "verdash-sidebar-item";

  return (
    <Sidebar className="border-r border-verdash-divider/30" collapsible="icon">
      <SidebarContent className="bg-verdash-dark">
        {/* Header */}
        <div className="p-6 border-b border-verdash-divider/30">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl verdash-gradient flex items-center justify-center shadow-lg verdash-glow">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <h1 className="font-bold text-2xl text-white font-grotesk verdash-glow-text">VERDASH</h1>
              <p className="text-xs text-verdash-disabled uppercase tracking-wider">Analytics Hub</p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="px-4 py-6">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={isCollapsed ? item.title : undefined}>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive: navIsActive }) => {
                        const active = item.url === "/" ? (currentPath === "/" || currentPath === "/dashboard") : navIsActive;
                        return getNavClass(active);
                      }}
                      end={item.url === "/"}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      <span className="font-medium font-grotesk uppercase text-sm tracking-wide group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects Section */}
        <SidebarGroup className="px-4 group-data-[collapsible=icon]:hidden">
          <Collapsible open={projectsOpen} onOpenChange={setProjectsOpen}>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-verdash-input-bg/50 rounded-xl verdash-animate">
                <span className="text-sm font-semibold text-white font-grotesk uppercase tracking-wide">Projetos Ativos</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="w-7 h-7 p-0 hover:bg-verdash-cyan/20 verdash-hover-scale">
                    <Plus className="w-4 h-4 text-verdash-cyan" />
                  </Button>
                  <ChevronDown className={`w-4 h-4 text-verdash-disabled transition-transform verdash-animate ${projectsOpen ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="mt-2">
                <SidebarMenu className="space-y-1">
                  {mockProjects.map((project) => (
                    <SidebarMenuItem key={project.id}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={`/projects/${project.id}`}
                          className="flex items-center justify-between text-sm p-3 rounded-lg hover:bg-verdash-input-bg/50 verdash-animate text-white/80 hover:text-white"
                        >
                          <span className="truncate font-inter">{project.name}</span>
                          <span className="text-xs text-verdash-disabled bg-verdash-input-bg px-2 py-1 rounded-full border border-verdash-divider">
                            {project.dashboards}
                          </span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Bottom Navigation */}
        <div className="mt-auto">
          <SidebarGroup className="px-4 py-4">
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {bottomNavigation.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={isCollapsed ? item.title : undefined}>
                      <NavLink 
                        to={item.url} 
                        className={({ isActive }) => getNavClass(isActive)}
                      >
                        <item.icon className="w-5 h-5 shrink-0" />
                        <span className="font-medium font-grotesk uppercase text-sm tracking-wide group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                
                {/* Logout Button */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={isCollapsed ? "Sair" : undefined}>
                    <button 
                      onClick={logout}
                      className="verdash-sidebar-item w-full text-left"
                    >
                      <LogOut className="w-5 h-5 shrink-0" />
                      <span className="font-medium font-grotesk uppercase text-sm tracking-wide group-data-[collapsible=icon]:hidden">Sair</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* User Info */}
          <div className="p-6 border-t border-verdash-divider/30">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full verdash-gradient flex items-center justify-center text-white font-bold shadow-lg shrink-0">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                <p className="text-sm font-semibold text-white truncate font-grotesk">{user?.name}</p>
                <p className="text-xs text-verdash-disabled capitalize font-inter">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
