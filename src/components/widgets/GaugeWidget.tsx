
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Widget } from "@/types/widgets";

interface GaugeWidgetProps {
  widget: Widget;
  isEditing?: boolean;
}

export const GaugeWidget = ({ widget, isEditing = false }: GaugeWidgetProps) => {
  const { config } = widget;
  const value = config.value || 0;
  const min = config.min || 0;
  const max = config.max || 100;
  const unit = config.unit || '';
  
  const percentage = ((value - min) / (max - min)) * 100;
  const angle = (percentage / 100) * 180 - 90;

  return (
    <Card className={`verdash-glass h-full ${isEditing ? 'ring-2 ring-verdash-cyan' : ''}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-base truncate">
          {widget.title}
        </CardTitle>
        {widget.description && (
          <p className="text-xs text-white/60">{widget.description}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0 flex flex-col items-center justify-center h-full">
        <div className="relative w-32 h-16 mb-4">
          <svg viewBox="0 0 120 60" className="w-full h-full">
            {/* Background arc */}
            <path
              d="M 10 55 A 50 50 0 0 1 110 55"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Progress arc */}
            <path
              d="M 10 55 A 50 50 0 0 1 110 55"
              fill="none"
              stroke={config.colors?.[0] || "#00FFB0"}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 157} 157`}
            />
            {/* Needle */}
            <line
              x1="60"
              y1="55"
              x2={60 + 35 * Math.cos((angle * Math.PI) / 180)}
              y2={55 + 35 * Math.sin((angle * Math.PI) / 180)}
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Center dot */}
            <circle cx="60" cy="55" r="3" fill="#fff" />
          </svg>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {value}{unit}
          </div>
          <div className="text-xs text-white/60">
            {min}{unit} - {max}{unit}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
