
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEditor as DashboardEditorComponent } from "@/components/dashboard/DashboardEditor";
import { DashboardSettings } from "@/components/dashboard/DashboardSettings";
import { mockWidgets } from "@/data/mockWidgetData";
import { Widget } from "@/types/widgets";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { toast } from "sonner";

interface DashboardConfig {
  name: string;
  description: string;
  project: string;
  client: string;
  dataSource: string;
}

const DashboardEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [widgets, setWidgets] = useState<Widget[]>(mockWidgets);

  // Mock dashboard data based on ID
  const dashboardData = {
    1: { 
      name: "Performance de Vendas", 
      project: "E-commerce Principal",
      description: "Dashboard focado em métricas de vendas e conversão",
      client: "Client A",
      dataSource: "google-ads"
    },
    2: { 
      name: "Marketing ROI", 
      project: "Marketing Digital",
      description: "Análise de retorno sobre investimento em marketing",
      client: "Client B",
      dataSource: "meta-ads"
    },
    3: { 
      name: "Funil de Conversão", 
      project: "Vendas B2B",
      description: "Acompanhamento do funil de vendas B2B",
      client: "Client C",
      dataSource: "crm"
    },
  };

  const dashboardId = id ? parseInt(id) : 1;
  const initialDashboard = dashboardData[dashboardId as keyof typeof dashboardData] || dashboardData[1];
  
  const [dashboardConfig, setDashboardConfig] = useState<DashboardConfig>(initialDashboard);

  const handleSaveWidgets = (updatedWidgets: Widget[]) => {
    setWidgets(updatedWidgets);
    toast.success("Dashboard salvo com sucesso!");
    console.log('Widgets salvos:', updatedWidgets);
  };

  const handleSaveConfig = (newConfig: DashboardConfig) => {
    setDashboardConfig(newConfig);
    console.log('Configurações salvas:', newConfig);
  };

  const handlePreview = () => {
    navigate(`/dashboard-view/${id}`);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboards')}
            className="verdash-btn-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Editando: {dashboardConfig.name}</h1>
            <p className="text-sm text-muted-foreground">{dashboardConfig.project}</p>
            {dashboardConfig.description && (
              <p className="text-xs text-muted-foreground mt-1">{dashboardConfig.description}</p>
            )}
          </div>
        </div>
        
        <div className="flex gap-3">
          <DashboardSettings
            currentConfig={dashboardConfig}
            onSave={handleSaveConfig}
          />
          <Button
            variant="outline"
            onClick={handlePreview}
            className="verdash-btn-secondary"
          >
            <Eye className="w-4 h-4 mr-2" />
            Visualizar
          </Button>
          <Button
            onClick={() => {
              handleSaveWidgets(widgets);
              navigate('/dashboards');
            }}
            className="verdash-btn-primary"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar e Sair
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden">
        <DashboardEditorComponent
          initialWidgets={widgets}
          onSave={handleSaveWidgets}
        />
      </div>
    </div>
  );
};

export default DashboardEditor;
