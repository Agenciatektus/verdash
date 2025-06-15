
import { useState, useRef } from 'react';
import { Widget } from '@/types/widgets';
import { WidgetContainer } from '@/components/widgets/WidgetContainer';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { Button } from '@/components/ui/button';
import { Trash2, Edit3 } from 'lucide-react';

interface EditableGridProps {
  widgets: Widget[];
  onWidgetUpdate: (widget: Widget) => void;
  onWidgetDelete: (widgetId: string) => void;
  onWidgetAdd: (widget: Omit<Widget, 'id' | 'createdAt' | 'updatedAt'>) => void;
  isEditing: boolean;
}

export const EditableGrid = ({ 
  widgets, 
  onWidgetUpdate, 
  onWidgetDelete, 
  isEditing 
}: EditableGridProps) => {
  const { dragState, startDrag, updateDragPosition, endDrag } = useDragAndDrop();
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredWidget, setHoveredWidget] = useState<string | null>(null);

  const handleMouseDown = (e: React.MouseEvent, widget: Widget) => {
    if (!isEditing) return;
    
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    startDrag(widget, { 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState.isDragging || !gridRef.current) return;
    
    const rect = gridRef.current.getBoundingClientRect();
    const gridX = Math.floor((e.clientX - rect.left) / 200); // 200px per grid cell
    const gridY = Math.floor((e.clientY - rect.top) / 200);
    
    updateDragPosition({ x: gridX, y: gridY });
  };

  const handleMouseUp = () => {
    if (!dragState.isDragging || !dragState.draggedWidget || !dragState.dropPosition) {
      endDrag();
      return;
    }

    const updatedWidget = {
      ...dragState.draggedWidget,
      position: {
        ...dragState.draggedWidget.position,
        x: Math.max(0, dragState.dropPosition.x),
        y: Math.max(0, dragState.dropPosition.y),
      },
      updatedAt: new Date().toISOString(),
    };

    onWidgetUpdate(updatedWidget);
    endDrag();
  };

  const getGridPosition = (widget: Widget) => {
    if (dragState.isDragging && dragState.draggedWidget?.id === widget.id && dragState.dropPosition) {
      return {
        gridColumn: `${dragState.dropPosition.x + 1} / span ${widget.position.width}`,
        gridRow: `${dragState.dropPosition.y + 1} / span ${widget.position.height}`,
      };
    }
    
    return {
      gridColumn: `${widget.position.x + 1} / span ${widget.position.width}`,
      gridRow: `${widget.position.y + 1} / span ${widget.position.height}`,
    };
  };

  return (
    <div 
      ref={gridRef}
      className="relative min-h-[600px] grid grid-cols-4 gap-4 p-4"
      style={{ gridAutoRows: '200px' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {widgets.map((widget) => (
        <div
          key={widget.id}
          className={`relative transition-all duration-200 ${
            isEditing ? 'cursor-move hover:scale-105' : ''
          } ${dragState.isDragging && dragState.draggedWidget?.id === widget.id ? 'opacity-50 z-10' : ''}`}
          style={getGridPosition(widget)}
          onMouseDown={(e) => handleMouseDown(e, widget)}
          onMouseEnter={() => setHoveredWidget(widget.id)}
          onMouseLeave={() => setHoveredWidget(null)}
        >
          <WidgetContainer
            widget={widget}
            isEditing={isEditing}
            onEdit={(w) => console.log('Edit widget:', w)}
            onDelete={onWidgetDelete}
          />
          
          {isEditing && hoveredWidget === widget.id && (
            <div className="absolute top-2 right-2 flex gap-1 opacity-90">
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 bg-white/10 hover:bg-white/20 border-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Edit widget:', widget);
                }}
              >
                <Edit3 className="w-3 h-3 text-white" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 bg-red-500/20 hover:bg-red-500/30 border-red-500/30"
                onClick={(e) => {
                  e.stopPropagation();
                  onWidgetDelete(widget.id);
                }}
              >
                <Trash2 className="w-3 h-3 text-red-400" />
              </Button>
            </div>
          )}
        </div>
      ))}
      
      {/* Drop zone indicator */}
      {dragState.isDragging && dragState.dropPosition && (
        <div
          className="absolute border-2 border-dashed border-verdash-cyan bg-verdash-cyan/10 rounded-lg pointer-events-none"
          style={{
            gridColumn: `${dragState.dropPosition.x + 1} / span ${dragState.draggedWidget?.position.width || 1}`,
            gridRow: `${dragState.dropPosition.y + 1} / span ${dragState.draggedWidget?.position.height || 1}`,
            left: `${dragState.dropPosition.x * 200}px`,
            top: `${dragState.dropPosition.y * 200}px`,
            width: `${(dragState.draggedWidget?.position.width || 1) * 200 - 16}px`,
            height: `${(dragState.draggedWidget?.position.height || 1) * 200 - 16}px`,
          }}
        />
      )}
    </div>
  );
};
