
import { useState, useCallback } from 'react';
import { Widget } from '@/types/widgets';

export interface DragState {
  isDragging: boolean;
  draggedWidget: Widget | null;
  dragStartPosition: { x: number; y: number } | null;
  dropPosition: { x: number; y: number } | null;
}

export const useDragAndDrop = () => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedWidget: null,
    dragStartPosition: null,
    dropPosition: null,
  });

  const startDrag = useCallback((widget: Widget, position: { x: number; y: number }) => {
    setDragState({
      isDragging: true,
      draggedWidget: widget,
      dragStartPosition: position,
      dropPosition: null,
    });
  }, []);

  const updateDragPosition = useCallback((position: { x: number; y: number }) => {
    setDragState(prev => ({
      ...prev,
      dropPosition: position,
    }));
  }, []);

  const endDrag = useCallback(() => {
    setDragState({
      isDragging: false,
      draggedWidget: null,
      dragStartPosition: null,
      dropPosition: null,
    });
  }, []);

  return {
    dragState,
    startDrag,
    updateDragPosition,
    endDrag,
  };
};
