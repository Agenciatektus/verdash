import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const AppLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        logo={
          <img src="/lovable-uploads/Favicon-branco.svg" alt="Verdash" className="h-8" />
        }
      />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
