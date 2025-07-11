import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProjectProvider } from "@/mcp/projects/provider";
import Login from "./pages/Login";
import VerdashPrecos from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import DashboardView from "./pages/DashboardView";
import DashboardEditor from "./pages/DashboardEditor";
import Projects from "./pages/Projects";
import ProjectView from "./pages/ProjectView";
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
import AppLayout from "./components/layout/AppLayout";
import { AuthProvider } from "./contexts/AuthContext";
import DataAdmin from "./pages/DataAdmin";
import WidgetsDemo from "@/pages/WidgetsDemo";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    // Set dark mode as default
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProjectProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<VerdashPrecos />} />
                <Route path="/login" element={<Login />} />
                <Route path="/app" element={
                  <ProtectedRoute>
                    <SidebarProvider>
                      <AppLayout />
                    </SidebarProvider>
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="dashboard-view/:id" element={<DashboardView />} />
                  <Route path="dashboard-editor/:id" element={<DashboardEditor />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="projects/:id" element={<ProjectView />} />
                  <Route path="dashboards" element={<Dashboards />} />
                  <Route path="metrics" element={<Metrics />} />
                  <Route path="data-admin" element={<DataAdmin />} />
                  <Route path="verdash-ai" element={<VerdashAI />} />
                  <Route path="integrations" element={<Integrations />} />
                  <Route path="clients" element={<Clients />} />
                  <Route path="support" element={<Support />} />
                  <Route path="users" element={<Users />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="billing" element={<Billing />} />
                  <Route path="widgets-demo" element={<WidgetsDemo />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ProjectProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
