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

// Função utilitária para encontrar a próxima posição livre no grid
function findNextFreePosition(widgets: Widget[], gridCols = 4, gridRows = 8) {
  const occupied: boolean[][] = Array.from({ length: gridRows }, () => Array(gridCols).fill(false));
  widgets.forEach(widget => {
    for (let dx = 0; dx < widget.position.width; dx++) {
      for (let dy = 0; dy < widget.position.height; dy++) {
        const x = widget.position.x + dx;
        const y = widget.position.y + dy;
        if (x < gridCols && y < gridRows) {
          occupied[y][x] = true;
        }
      }
    }
  });
  for (let y = 0; y < gridRows; y++) {
    for (let x = 0; x < gridCols; x++) {
      if (!occupied[y][x]) {
        return { x, y };
      }
    }
  }
  // Se não houver espaço, adiciona na última posição
  return { x: 0, y: gridRows };
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
    // Encontrar próxima posição livre
    const nextPos = findNextFreePosition(widgets);
    const newWidget: Widget = {
      ...widgetData,
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      position: { ...widgetData.position, ...nextPos },
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
