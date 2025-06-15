

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
            <SidebarMenu className="space-y-2">
              {mockProjects.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={`/projects/${project.id}`}
                      className="flex items-center justify-between text-sm p-4 rounded-lg hover:bg-verdash-input-bg/50 hover:border-verdash-cyan/20 border border-transparent verdash-animate text-white/80 hover:text-white transition-all duration-200"
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
  );
}

