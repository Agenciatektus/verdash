import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  Ruler,
  Plug,
  Database,
  Brain
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNavigation = [
  { title: "Dashboard", url: "/app/dashboard", icon: LayoutDashboard },
  { title: "Projetos", url: "/app/projects", icon: FolderOpen },
  { title: "Dashboards", url: "/app/dashboards", icon: Brain },
  { title: "Métricas & KPIs", url: "/app/metrics", icon: Ruler },
  { title: "Admin de Dados", url: "/app/data-admin", icon: Database },
  { title: "Verdash IA", url: "/app/verdash-ai", icon: Brain },
  { title: "Integrações", url: "/app/integrations", icon: Plug },
  { title: "Clientes", url: "/app/clients", icon: Users },
];

export function SidebarNavigation() {
  const { state } = useSidebar();
  const location = useLocation();
  
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const getNavClass = (active: boolean) => 
    active 
      ? "verdash-sidebar-item active" 
      : "verdash-sidebar-item";

  return (
    <SidebarGroup className="px-7 py-6">
      <SidebarGroupContent>
        <SidebarMenu>
          {mainNavigation.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={isCollapsed ? item.title : undefined} size="lg">
                <NavLink 
                  to={item.url} 
                  className={({ isActive: navIsActive }) => {
                    const active = item.url === "/app/dashboard" ? (currentPath === "/app" || currentPath === "/app/dashboard") : navIsActive;
                    return `${getNavClass(active)} hover:bg-verdash-input-bg/50 hover:border-verdash-cyan/30 transition-all duration-200`;
                  }}
                  end={item.url === "/app/dashboard"}
                >
                  <item.icon className={`w-5 h-5 shrink-0 transition-all ${isCollapsed ? "ml-[-1px]" : ""}`} />
                  <span className="font-medium font-grotesk uppercase text-sm tracking-wide group-data-[collapsible=icon]:hidden">{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

