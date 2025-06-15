
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEditor as DashboardEditorComponent } from "@/components/dashboard/DashboardEditor";
import { mockWidgets } from "@/data/mockWidgetData";
import { Widget } from "@/types/widgets";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { toast } from "sonner";

const DashboardEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [widgets, setWidgets] = useState<Widget[]>(mockWidgets);

  // Mock dashboard data based on ID
  const dashboardData = {
    1: { name: "Performance de Vendas", project: "E-commerce Principal" },
    2: { name: "Marketing ROI", project: "Marketing Digital" },
    3: { name: "Funil de Conversão", project: "Vendas B2B" },
  };

  const dashboardId = id ? parseInt(id) : 1;
  const dashboard = dashboardData[dashboardId as keyof typeof dashboardData] || dashboardData[1];

  const handleSaveWidgets = (updatedWidgets: Widget[]) => {
    setWidgets(updatedWidgets);
    toast.success("Dashboard salvo com sucesso!");
    console.log('Widgets salvos:', updatedWidgets);
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
            <h1 className="text-2xl font-bold text-foreground">Editando: {dashboard.name}</h1>
            <p className="text-sm text-muted-foreground">{dashboard.project}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
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
