
import { Widget, WidgetData } from "@/types/widgets";
import { KPIWidget } from "./KPIWidget";
import { LineChartWidget } from "./LineChartWidget";
import { TableWidget } from "./TableWidget";

interface WidgetContainerProps {
  widget: Widget;
  data?: any[];
  isEditing?: boolean;
  onEdit?: (widget: Widget) => void;
  onDelete?: (widgetId: string) => void;
}

export const WidgetContainer = ({ 
  widget, 
  data = [], 
  isEditing = false,
  onEdit,
  onDelete 
}: WidgetContainerProps) => {
  const renderWidget = () => {
    switch (widget.type) {
      case 'kpi':
        return <KPIWidget widget={widget} isEditing={isEditing} />;
      case 'line-chart':
        return <LineChartWidget widget={widget} data={data} isEditing={isEditing} />;
      case 'table':
        return <TableWidget widget={widget} data={data} isEditing={isEditing} />;
      case 'bar-chart':
      case 'pie-chart':
      case 'funnel':
        return (
          <div className="verdash-glass h-full flex items-center justify-center">
            <div className="text-center text-white/60">
              <p className="text-sm">Widget {widget.type}</p>
              <p className="text-xs">Em desenvolvimento</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="verdash-glass h-full flex items-center justify-center">
            <p className="text-white/60">Widget não suportado</p>
          </div>
        );
    }
  };

  return (
    <div 
      className="widget-container"
      style={{
        gridColumn: `span ${widget.position.width}`,
        gridRow: `span ${widget.position.height}`,
      }}
    >
      {renderWidget()}
    </div>
  );
};
