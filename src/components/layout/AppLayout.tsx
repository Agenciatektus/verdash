import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children?: React.ReactNode;
}

const SIDEBAR_WIDTH_EXPANDED = "14rem"; // 224px
const SIDEBAR_WIDTH_COLLAPSED = "5rem"; // 80px

const AppLayoutContent: React.FC = () => {
  const { state } = useSidebar();
  
  return (
    <div className="flex w-full min-h-screen">
      <AppSidebar />
      <div
        className={cn(
          "flex-1 flex flex-col bg-background transition-all duration-200",
          state === "expanded"
            ? `ml-[${SIDEBAR_WIDTH_EXPANDED}]`
            : `ml-[${SIDEBAR_WIDTH_COLLAPSED}]`
        )}
      >
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
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
      <AppLayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
