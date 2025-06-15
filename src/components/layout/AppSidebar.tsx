
import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { SidebarProjects } from "./sidebar/SidebarProjects";
import { SidebarBottomNav } from "./sidebar/SidebarBottomNav";

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-verdash-divider/30" collapsible="icon" variant="inset">
      <SidebarContent className="bg-verdash-dark">
        <SidebarHeader />
        <SidebarNavigation />
        <SidebarProjects />
        <SidebarBottomNav />
      </SidebarContent>
    </Sidebar>
  );
}
