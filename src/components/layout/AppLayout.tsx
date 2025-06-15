
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarInset, SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import React from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

// Main layout that makes the content follow sidebar width correctly
const ContentWithSidebar = ({ children }: { children: React.ReactNode }) => {
  const { state, isMobile } = useSidebar();

  // left margin when sidebar is collapsed x expanded (desktop)
  // "sidebar" width = 64 (16rem) when expanded, 12 (3rem) when collapsed
  // In mobile, sidebar is overlaid (sheet)
  const sidebarWidth = isMobile
    ? 0
    : state === "collapsed"
      ? "3rem"
      : "16rem";

  return (
    <div className="min-h-screen w-full flex bg-background">
      <AppSidebar />
      {/* transition-all for smooth margin change */}
      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-300"
        style={{
          marginLeft: isMobile ? 0 : sidebarWidth,
        }}
      >
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full verdash-gradient animate-pulse"></div>
          <Skeleton className="h-4 w-32 mx-auto" />
          <Skeleton className="h-3 w-24 mx-auto" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <ContentWithSidebar>
        {children}
      </ContentWithSidebar>
    </SidebarProvider>
  );
};

