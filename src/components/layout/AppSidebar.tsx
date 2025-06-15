
import { useState } from "react";
import { 
  LayoutDashboard, 
  FolderOpen, 
  BarChart3, 
  Users, 
  Settings, 
  ChevronDown,
  Plus,
  Activity
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAuth } from "@/contexts/AuthContext";

const mainNavigation = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Projetos", url: "/projects", icon: FolderOpen },
  { title: "Métricas", url: "/metrics", icon: BarChart3 },
  { title: "Usuários", url: "/users", icon: Users },
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
  const { user } = useAuth();
  const [projectsOpen, setProjectsOpen] = useState(true);
  
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === "collapsed";

  const getNavClass = (active: boolean) => 
    active 
      ? "bg-gradient-to-r from-verdash-blue/20 to-verdash-cyan/20 text-white font-semibold border-r-2 border-verdash-cyan shadow-lg" 
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-white verdash-animate";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-72"} collapsible="icon">
      <SidebarContent className="bg-verdash-dark border-r border-sidebar-border/30">
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border/30">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl verdash-gradient flex items-center justify-center shadow-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-2xl text-white font-jakarta">Verdash</h1>
                <p className="text-xs text-muted-foreground">Analytics Hub</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="px-4 py-6">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => `${getNavClass(isActive)} flex items-center gap-3 px-4 py-3 rounded-xl`}
                    >
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects Section */}
        {!isCollapsed && (
          <SidebarGroup className="px-4">
            <Collapsible open={projectsOpen} onOpenChange={setProjectsOpen}>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-sidebar-accent/30 rounded-xl verdash-animate">
                  <span className="text-sm font-semibold text-white">Projetos</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="w-7 h-7 p-0 hover:bg-verdash-cyan/20">
                      <Plus className="w-4 h-4 text-verdash-cyan" />
                    </Button>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${projectsOpen ? 'rotate-180' : ''}`} />
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
                            className="flex items-center justify-between text-sm p-3 rounded-lg hover:bg-sidebar-accent/30 verdash-animate"
                          >
                            <span className="truncate text-sidebar-foreground/80">{project.name}</span>
                            <span className="text-xs text-muted-foreground bg-gradient-to-r from-verdash-blue/20 to-verdash-cyan/20 px-2 py-1 rounded-full border border-verdash-blue/30">
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
        )}

        {/* User Info */}
        <div className="mt-auto p-6 border-t border-sidebar-border/30">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-verdash-blue to-verdash-cyan flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
