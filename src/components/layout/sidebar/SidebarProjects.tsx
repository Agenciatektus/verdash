
import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const mockProjects = [
  { id: '1', name: 'E-commerce Principal', dashboards: 3 },
  { id: '2', name: 'Marketing Digital', dashboards: 5 },
  { id: '3', name: 'Vendas B2B', dashboards: 2 },
];

export function SidebarProjects() {
  const [projectsOpen, setProjectsOpen] = useState(true);

  return (
    <SidebarGroup className="px-7 group-data-[collapsible=icon]:hidden">
      <Collapsible open={projectsOpen} onOpenChange={setProjectsOpen}>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="w-full p-0 pb-1 rounded-none verdash-animate flex items-center">
            <div className="flex items-center w-full justify-between px-0 pt-3 pb-2">
              <span className="text-xs font-bold text-white font-grotesk uppercase tracking-wide whitespace-nowrap">
                Projetos Ativos
              </span>
              <div className="flex items-center gap-1 ml-3">
                <Button variant="ghost" size="icon" className="w-6 h-6 p-0 hover:bg-verdash-cyan/20 verdash-hover-scale">
                  <Plus className="w-4 h-4 text-verdash-cyan" />
                </Button>
                <ChevronDown className={`w-4 h-4 text-verdash-disabled transition-transform verdash-animate ${projectsOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="space-y-2">
              {mockProjects.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={`/projects/${project.id}`}
                      className="flex items-center justify-between text-sm p-3 rounded-lg hover:bg-verdash-input-bg/50 hover:border-verdash-cyan/20 border border-transparent verdash-animate text-white/80 hover:text-white transition-all duration-200"
                    >
                      <span className="truncate font-inter">{project.name}</span>
                      <span className="text-xs text-verdash-disabled bg-verdash-input-bg px-2 py-1 rounded-full border border-verdash-divider min-w-7 text-center">
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
  );
}
