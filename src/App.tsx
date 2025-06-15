
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Dashboards from "./pages/Dashboards";
import Metrics from "./pages/Metrics";
import VerdashAI from "./pages/VerdashAI";
import Integrations from "./pages/Integrations";
import Clients from "./pages/Clients";
import Support from "./pages/Support";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/layout/AppLayout";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Set dark mode as default
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <SidebarProvider>
                  <AppLayout>
                    <Routes>
                      <Route index element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/dashboards" element={<Dashboards />} />
                      <Route path="/metrics" element={<Metrics />} />
                      <Route path="/verdash-ai" element={<VerdashAI />} />
                      <Route path="/integrations" element={<Integrations />} />
                      <Route path="/clients" element={<Clients />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/billing" element={<Billing />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AppLayout>
                </SidebarProvider>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
