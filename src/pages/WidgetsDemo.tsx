
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings, LayoutGrid, Edit } from "lucide-react";
import { DashboardEditor } from "@/components/dashboard/DashboardEditor";
import { WidgetContainer } from "@/components/widgets/WidgetContainer";
import { mockWidgets, mockWidgetData } from "@/data/mockWidgetData";
import { Widget } from "@/types/widgets";

const WidgetsDemo = () => {
  const [widgets, setWidgets] = useState<Widget[]>(mockWidgets);
  const [showEditor, setShowEditor] = useState(false);

  const handleSaveWidgets = (updatedWidgets: Widget[]) => {
    setWidgets(updatedWidgets);
    console.log('Widgets salvos:', updatedWidgets);
  };

  if (showEditor) {
    return (
      <div className="h-screen">
        <DashboardEditor 
          initialWidgets={widgets}
          onSave={handleSaveWidgets}
        />
        <Button
          className="absolute top-4 right-4 z-10"
          variant="outline"
          onClick={() => setShowEditor(false)}
        >
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white font-grotesk uppercase tracking-wide verdash-glow-text">
            Widgets Funcionais
          </h1>
          <p className="text-white/70 mt-2 font-inter">
            Demonstração dos widgets interativos com editor drag-and-drop
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => setShowEditor(true)}
            className="verdash-btn-secondary"
          >
            <Edit className="w-4 h-4 mr-2" />
            Editor de Dashboard
          </Button>
          <Button className="verdash-btn-primary verdash-hover-scale">
            <Plus className="w-5 h-5 mr-2" />
            Novo Widget
          </Button>
        </div>
      </div>

      {/* Widget Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="verdash-kpi">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">Total de Widgets</p>
                <p className="text-2xl font-bold text-white">{widgets.length}</p>
              </div>
              <LayoutGrid className="w-8 h-8 text-verdash-cyan" />
            </div>
          </CardContent>
        </Card>

        <Card className="verdash-kpi">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">KPIs Ativos</p>
                <p className="text-2xl font-bold text-white">
                  {widgets.filter(w => w.type === 'kpi').length}
                </p>
              </div>
              <LayoutGrid className="w-8 h-8 text-verdash-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="verdash-kpi">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">Gráficos</p>
                <p className="text-2xl font-bold text-white">
                  {widgets.filter(w => w.type.includes('chart')).length}
                </p>
              </div>
              <LayoutGrid className="w-8 h-8 text-verdash-info" />
            </div>
          </CardContent>
        </Card>

        <Card className="verdash-kpi">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">Tabelas</p>
                <p className="text-2xl font-bold text-white">
                  {widgets.filter(w => w.type === 'table').length}
                </p>
              </div>
              <LayoutGrid className="w-8 h-8 text-verdash-coral" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Widgets Grid - Static View */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-grotesk">
            Dashboard Principal
          </h2>
          <p className="text-sm text-verdash-cyan">
            Clique em "Editor de Dashboard" para personalizar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {widgets.map((widget) => (
            <div 
              key={widget.id}
              style={{
                gridColumn: `span ${widget.position.width}`,
              }}
              className="min-h-[200px]"
            >
              <WidgetContainer
                widget={widget}
                data={mockWidgetData[widget.id] || []}
                isEditing={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <Card className="verdash-glass">
        <CardHeader>
          <CardTitle className="text-white">Como usar o Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-verdash-cyan mb-2">🎯 Arrastar e Soltar</h4>
              <p className="text-white/70">
                No modo de edição, arraste widgets para reorganizar o layout. 
                Veja indicadores visuais de onde soltar.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-verdash-cyan mb-2">➕ Adicionar Widgets</h4>
              <p className="text-white/70">
                Use o painel lateral para adicionar novos widgets. 
                Escolha entre KPIs, gráficos, tabelas e mais.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-verdash-cyan mb-2">⚙️ Personalizar</h4>
              <p className="text-white/70">
                Edite configurações, exclua widgets e salve layouts personalizados. 
                Tudo em tempo real.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WidgetsDemo;
