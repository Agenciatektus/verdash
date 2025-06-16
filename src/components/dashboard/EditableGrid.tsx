import { useState, useRef, useEffect, MouseEvent } from 'react';
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

// Função para verificar se uma posição está livre
function isPositionFree(widgets: Widget[], draggedId: string, pos: {x: number, y: number}, size: {width: number, height: number}) {
  for (const widget of widgets) {
    if (widget.id === draggedId) continue;
    for (let dx = 0; dx < size.width; dx++) {
      for (let dy = 0; dy < size.height; dy++) {
        const wx = widget.position.x;
        const wy = widget.position.y;
        for (let wdx = 0; wdx < widget.position.width; wdx++) {
          for (let wdy = 0; wdy < widget.position.height; wdy++) {
            if ((pos.x + dx) === (wx + wdx) && (pos.y + dy) === (wy + wdy)) {
              return false;
            }
          }
        }
      }
    }
  }
  return true;
}

export const EditableGrid = ({ 
  widgets, 
  onWidgetUpdate, 
  onWidgetDelete, 
  onWidgetAdd, 
  isEditing 
}: EditableGridProps) => {
  const { dragState, startDrag, updateDragPosition, endDrag } = useDragAndDrop();
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredWidget, setHoveredWidget] = useState<string | null>(null);
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editWidth, setEditWidth] = useState(1);
  const [editHeight, setEditHeight] = useState(1);
  const [cellSize, setCellSize] = useState(120);
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  // Estado para resize
  const [resizing, setResizing] = useState<{id: string, dir: 'right' | 'bottom' | 'corner' | null, startX: number, startY: number, startW: number, startH: number} | null>(null);
  const [resizeInvalid, setResizeInvalid] = useState(false);

  useEffect(() => {
    function updateCellSize() {
      if (gridWrapperRef.current) {
        const width = gridWrapperRef.current.offsetWidth;
        const size = Math.floor((width - 24 * 4) / 5); // 5 colunas, 24px gap
        setCellSize(size);
      }
    }
    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, []);

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
    const gridX = Math.floor((e.clientX - rect.left) / 300); // Aumentei para 300px por célula
    const gridY = Math.floor((e.clientY - rect.top) / 250); // 250px de altura por linha
    
    updateDragPosition({ x: gridX, y: gridY });
  };

  const handleMouseUp = () => {
    if (!dragState.isDragging || !dragState.draggedWidget || !dragState.dropPosition) {
      endDrag();
      return;
    }

    // Só atualiza se a posição estiver livre
    const canDrop = isPositionFree(widgets, dragState.draggedWidget.id, dragState.dropPosition, dragState.draggedWidget.position);
    if (!canDrop) {
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

  const handleExternalDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isEditing) return;
    const data = e.dataTransfer.getData('application/widget-template');
    if (data) {
      const template = JSON.parse(data);
      // Encontrar próxima posição livre
      const nextPos = findNextFreePosition(widgets);
      onWidgetAdd({ ...template, position: { ...template.position, ...nextPos } });
    }
  };

  const openEditWidget = (widget: Widget) => {
    setEditingWidget(widget);
    setEditTitle(widget.title || '');
    setEditWidth(widget.position.width);
    setEditHeight(widget.position.height);
  };

  const handleSaveEdit = () => {
    if (editingWidget) {
      onWidgetUpdate({
        ...editingWidget,
        title: editTitle,
        position: {
          ...editingWidget.position,
          width: editWidth,
          height: editHeight,
        },
        updatedAt: new Date().toISOString(),
      });
      setEditingWidget(null);
    }
  };

  // Função para verificar se o novo tamanho é válido
  function canResize(widget: Widget, newW: number, newH: number) {
    if (widget.position.x + newW > 5 || newW < 1 || newH < 1) return false;
    // Verifica colisão
    for (const w of widgets) {
      if (w.id === widget.id) continue;
      for (let dx = 0; dx < newW; dx++) {
        for (let dy = 0; dy < newH; dy++) {
          for (let wx = 0; wx < w.position.width; wx++) {
            for (let wy = 0; wy < w.position.height; wy++) {
              if ((widget.position.x + dx) === (w.position.x + wx) && (widget.position.y + dy) === (w.position.y + wy)) {
                return false;
              }
            }
          }
        }
      }
    }
    return true;
  }

  // Handlers de resize
  const handleResizeStart = (e: MouseEvent, widget: Widget, dir: 'right' | 'bottom' | 'corner') => {
    e.stopPropagation();
    setResizing({
      id: widget.id,
      dir,
      startX: e.clientX,
      startY: e.clientY,
      startW: widget.position.width,
      startH: widget.position.height
    });
  };

  useEffect(() => {
    if (!resizing) return;
    function onMove(e: MouseEvent) {
      const widget = widgets.find(w => w.id === resizing.id);
      if (!widget) return;
      let newW = resizing.startW;
      let newH = resizing.startH;
      if (resizing.dir === 'right' || resizing.dir === 'corner') {
        const dx = Math.round((e.clientX - resizing.startX) / cellSize);
        newW = Math.max(1, resizing.startW + dx);
      }
      if (resizing.dir === 'bottom' || resizing.dir === 'corner') {
        const dy = Math.round((e.clientY - resizing.startY) / cellSize);
        newH = Math.max(1, resizing.startH + dy);
      }
      if (canResize(widget, newW, newH)) {
        setResizeInvalid(false);
        onWidgetUpdate({
          ...widget,
          position: {
            ...widget.position,
            width: newW,
            height: newH
          },
          updatedAt: new Date().toISOString(),
        });
      } else {
        setResizeInvalid(true);
      }
    }
    function onUp() {
      setResizing(null);
      setResizeInvalid(false);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [resizing, widgets, cellSize]);

  return (
    <div className="w-full h-full flex justify-center items-start bg-[#161817] p-8" ref={gridWrapperRef}>
      <div 
        ref={gridRef}
        className="grid grid-cols-5 gap-6 relative"
        style={{ gridAutoRows: `${cellSize}px`, width: '100%', maxWidth: 5 * cellSize + 24 * 4, minHeight: cellSize * 6, background: 'transparent', position: 'relative' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDragOver={e => { if (isEditing) e.preventDefault(); }}
        onDrop={handleExternalDrop}
      >
        {/* Linhas de grade horizontais e verticais */}
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${(i / 5) * 100}%`,
            top: 0,
            bottom: 0,
            width: i === 0 ? 0 : '1px',
            background: i === 0 ? 'none' : 'rgba(255,255,255,0.06)',
            pointerEvents: 'none',
            zIndex: 1
          }} />
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${(i / 20) * 100}%`,
            left: 0,
            right: 0,
            height: i === 0 ? 0 : '1px',
            background: i === 0 ? 'none' : 'rgba(255,255,255,0.06)',
            pointerEvents: 'none',
            zIndex: 1
          }} />
        ))}
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className={`relative transition-all duration-200 ${
              isEditing ? 'cursor-move' : ''
            } ${dragState.isDragging && dragState.draggedWidget?.id === widget.id ? 'opacity-50 z-10' : ''}`}
            style={{
              ...getGridPosition(widget),
              height: `calc(${widget.position.height} * ${cellSize}px)`,
              minHeight: 'unset',
              border: resizing && resizing.id === widget.id && resizeInvalid ? '2px solid #ff3b3b' : 'none',
              zIndex: resizing && resizing.id === widget.id ? 20 : undefined
            }}
            onMouseDown={(e) => handleMouseDown(e, widget)}
            onMouseEnter={() => setHoveredWidget(widget.id)}
            onMouseLeave={() => setHoveredWidget(null)}
          >
            <WidgetContainer
              widget={widget}
              isEditing={isEditing}
              onEdit={openEditWidget}
              onDelete={onWidgetDelete}
            />
            
            {isEditing && hoveredWidget === widget.id && (
              <div className="absolute top-3 right-3 flex gap-2 opacity-90 z-20">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0 bg-background/90 hover:bg-background border-border"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditWidget(widget);
                  }}
                >
                  <Edit3 className="w-4 h-4" />
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
                  <Trash2 className="w-4 h-4 text-red-400" />
                </Button>
              </div>
            )}
            {/* Handles de resize */}
            {isEditing && (
              <>
                {/* Handle canto inferior direito */}
                <div
                  className="absolute right-0 bottom-0 w-4 h-4 bg-verdash-cyan rounded-full cursor-nwse-resize z-30"
                  style={{ transform: 'translate(50%, 50%)' }}
                  onMouseDown={e => handleResizeStart(e, widget, 'corner')}
                />
                {/* Handle lateral direita */}
                <div
                  className="absolute right-0 top-1/2 w-3 h-6 bg-verdash-cyan/70 rounded cursor-ew-resize z-30"
                  style={{ transform: 'translate(50%, -50%)' }}
                  onMouseDown={e => handleResizeStart(e, widget, 'right')}
                />
                {/* Handle inferior */}
                <div
                  className="absolute left-1/2 bottom-0 w-6 h-3 bg-verdash-cyan/70 rounded cursor-ns-resize z-30"
                  style={{ transform: 'translate(-50%, 50%)' }}
                  onMouseDown={e => handleResizeStart(e, widget, 'bottom')}
                />
              </>
            )}
          </div>
        ))}
        
        {/* Drop zone indicator */}
        {dragState.isDragging && dragState.dropPosition && (
          <div
            className="absolute border-2 border-dashed border-verdash-cyan bg-verdash-cyan/10 rounded-lg pointer-events-none z-30"
            style={{
              gridColumn: `${dragState.dropPosition.x + 1} / span ${dragState.draggedWidget?.position.width || 1}`,
              gridRow: `${dragState.dropPosition.y + 1} / span ${dragState.draggedWidget?.position.height || 1}`,
              left: `${dragState.dropPosition.x * 300}px`,
              top: `${dragState.dropPosition.y * 250}px`,
              width: `${(dragState.draggedWidget?.position.width || 1) * 300 - 24}px`,
              height: `${(dragState.draggedWidget?.position.height || 1) * 250 - 24}px`,
            }}
          />
        )}
      </div>

      {/* Painel de edição do widget */}
      {editingWidget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg min-w-[320px] max-w-[90vw]">
            <h3 className="text-lg font-semibold mb-4">Editar Widget</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <input
                  className="w-full border rounded px-2 py-1 bg-background"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Largura</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={editWidth}
                    onChange={e => setEditWidth(Number(e.target.value))}
                    className="w-16 border rounded px-2 py-1 bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Altura</label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={editHeight}
                    onChange={e => setEditHeight(Number(e.target.value))}
                    className="w-16 border rounded px-2 py-1 bg-background"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setEditingWidget(null)}>Cancelar</Button>
              <Button onClick={handleSaveEdit} className="verdash-btn-primary">Salvar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
