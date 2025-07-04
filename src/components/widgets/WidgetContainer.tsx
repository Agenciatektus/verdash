import { Widget, WidgetData } from "@/types/widgets";
import { KPIWidget } from "./KPIWidget";
import { LineChartWidget } from "./LineChartWidget";
import { TableWidget } from "./TableWidget";
import { AreaChartWidget } from "./AreaChartWidget";
import { BarChartWidget } from "./BarChartWidget";
import { PieChartWidget } from "./PieChartWidget";
import { DonutChartWidget } from "./DonutChartWidget";
import { GaugeWidget } from "./GaugeWidget";
import { ProgressBarWidget } from "./ProgressBarWidget";
import { RadarChartWidget } from "./RadarChartWidget";
import { FunnelWidget } from "./FunnelWidget";

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
      case 'area-chart':
        return <AreaChartWidget widget={widget} data={data} isEditing={isEditing} />;
      case 'bar-chart':
        return <BarChartWidget widget={widget} data={data} isEditing={isEditing} />;
      case 'pie-chart':
        return <PieChartWidget widget={widget} data={data} isEditing={isEditing} />;
      case 'donut-chart':
        return <DonutChartWidget widget={widget} data={data} isEditing={isEditing} />;
      case 'gauge-chart':
        return <GaugeWidget widget={widget} isEditing={isEditing} />;
      case 'progress-bar':
        return <ProgressBarWidget widget={widget} isEditing={isEditing} />;
      case 'radar-chart':
        return <RadarChartWidget widget={widget} data={data} isEditing={isEditing} />;
      case 'funnel':
        return <FunnelWidget widget={widget} isEditing={isEditing} onUpdate={onEdit} />;
      case 'table':
        return <TableWidget widget={widget} data={data} isEditing={isEditing} />;
      case 'stacked-area-chart':
      case 'horizontal-bar-chart':
      case 'stacked-bar-chart':
      case 'grouped-bar-chart':
      case 'waterfall-chart':
      case 'scatter-chart':
      case 'bubble-chart':
      case 'heatmap':
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
      className="widget-container h-full w-full min-h-full"
      style={{
        gridColumn: `span ${widget.position.width}`,
        gridRow: `span ${widget.position.height}`,
      }}
    >
      {renderWidget()}
    </div>
  );
};
