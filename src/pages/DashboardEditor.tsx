
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

  const dashboard = dashboardData[id as keyof typeof dashboardData] || dashboardData[1];

  const handleSaveWidgets = (updatedWidgets: Widget[]) => {
    setWidgets(updatedWidgets);
    toast.success("Dashboard salvo com sucesso!");
    console.log('Widgets salvos:', updatedWidgets);
  };

  const handlePreview = () => {
    navigate(`/dashboard-view/${id}`);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background">
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
            <h1 className="text-xl font-bold text-white">Editando: {dashboard.name}</h1>
            <p className="text-sm text-white/60">{dashboard.project}</p>
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

      {/* Editor */}
      <div className="flex-1">
        <DashboardEditorComponent
          initialWidgets={widgets}
          onSave={handleSaveWidgets}
        />
      </div>
    </div>
  );
};

export default DashboardEditor;
