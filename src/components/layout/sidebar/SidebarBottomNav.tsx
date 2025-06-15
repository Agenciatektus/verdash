

import { 
  Settings, 
  MessageCircle,
  LogOut,
  CreditCard,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";

const bottomNavigation = [
  { title: "Planos & Billing", url: "/billing", icon: CreditCard },
  { title: "Suporte", url: "/support", icon: MessageCircle },
  { title: "Configurações", url: "/settings", icon: Settings },
];

export function SidebarBottomNav() {
  const { state } = useSidebar();
  const { user, logout } = useAuth();
  const isCollapsed = state === "collapsed";

  const getNavClass = (active: boolean) => 
    active 
      ? "verdash-sidebar-item active" 
      : "verdash-sidebar-item";

  return (
    <div className="mt-auto">
      <SidebarGroup className="px-7 py-4">
        <SidebarGroupContent>
          <SidebarMenu className="space-y-3">
            {bottomNavigation.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={isCollapsed ? item.title : undefined} size="lg">
                  <NavLink 
                    to={item.url} 
                    className={({ isActive }) => `${getNavClass(isActive)} hover:bg-verdash-input-bg/50 hover:border-verdash-cyan/30 transition-all duration-200`}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="font-medium font-grotesk uppercase text-sm tracking-wide group-data-[collapsible=icon]:hidden">{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            
            {/* Logout Button */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={isCollapsed ? "Sair" : undefined} size="lg">
                <button 
                  onClick={logout}
                  className="verdash-sidebar-item w-full text-left hover:bg-verdash-input-bg/50 hover:border-verdash-cyan/30 transition-all duration-200"
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
      <div className="px-7 py-4 border-t border-verdash-divider/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg shrink-0 bg-gradient-to-r from-verdash-primary to-verdash-cyan">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-semibold text-white truncate font-grotesk">{user?.name}</p>
            <p className="text-xs text-verdash-disabled capitalize font-inter">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

