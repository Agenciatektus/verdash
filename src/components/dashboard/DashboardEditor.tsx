
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Widget } from '@/types/widgets';
import { EditableGrid } from './EditableGrid';
import { WidgetPalette } from './WidgetPalette';
import { 
  Settings, 
  Plus, 
  Save, 
  Eye, 
  EyeOff,
  Palette
} from 'lucide-react';

interface DashboardEditorProps {
  initialWidgets: Widget[];
  onSave: (widgets: Widget[]) => void;
}

export const DashboardEditor = ({ initialWidgets, onSave }: DashboardEditorProps) => {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const [isEditing, setIsEditing] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  const handleWidgetUpdate = (updatedWidget: Widget) => {
    setWidgets(prev => 
      prev.map(widget => 
        widget.id === updatedWidget.id ? updatedWidget : widget
      )
    );
  };

  const handleWidgetDelete = (widgetId: string) => {
    setWidgets(prev => prev.filter(widget => widget.id !== widgetId));
  };

  const handleWidgetAdd = (widgetData: Omit<Widget, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newWidget: Widget = {
      ...widgetData,
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setWidgets(prev => [...prev, newWidget]);
  };

  const handleSave = () => {
    onSave(widgets);
    setIsEditing(false);
    setShowPalette(false);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setShowPalette(true);
    } else {
      setShowPalette(false);
    }
  };

  return (
    <div className="h-full flex bg-background/50">
      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Editor de Dashboard</h2>
            <p className="text-sm text-muted-foreground">
              {isEditing ? 'Arraste widgets para reorganizar' : 'Visualização do dashboard'}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPalette(!showPalette)}
              disabled={!isEditing}
              className="verdash-btn-secondary"
            >
              <Palette className="w-4 h-4 mr-2" />
              {showPalette ? 'Ocultar' : 'Widgets'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={toggleEditing}
              className="verdash-btn-secondary"
            >
              {isEditing ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Sair da Edição
                </>
              ) : (
                <>
                  <Settings className="w-4 h-4 mr-2" />
                  Editar
                </>
              )}
            </Button>
            
            {isEditing && (
              <Button
                size="sm"
                onClick={handleSave}
                className="verdash-btn-primary"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            )}
          </div>
        </div>

        {/* Grid Editor */}
        <div className="flex-1 overflow-auto p-6">
          <EditableGrid
            widgets={widgets}
            onWidgetUpdate={handleWidgetUpdate}
            onWidgetDelete={handleWidgetDelete}
            onWidgetAdd={handleWidgetAdd}
            isEditing={isEditing}
          />
        </div>

        {/* Status Bar */}
        {isEditing && (
          <div className="p-4 bg-card/30 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {widgets.length} widgets • Modo de edição ativo
              </span>
              <span className="text-verdash-cyan">
                Arraste e solte para reorganizar • Clique nos botões para editar/excluir
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Widget Palette */}
      <WidgetPalette
        onWidgetAdd={handleWidgetAdd}
        isVisible={showPalette && isEditing}
      />
    </div>
  );
};
