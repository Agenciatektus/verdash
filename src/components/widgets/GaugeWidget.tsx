import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Widget } from "@/types/widgets";

interface GaugeWidgetProps {
  widget: Widget;
  isEditing?: boolean;
}

export const GaugeWidget = ({ widget, isEditing = false }: GaugeWidgetProps) => {
  const { config } = widget;
  const value = config.value || 0;
  const minValue = config.minValue || 0;
  const maxValue = config.maxValue || 100;
  const target = config.target;
  
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  const normalizedPercentage = Math.max(0, Math.min(100, percentage));
  
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (normalizedPercentage / 100) * circumference;
  
  const getColor = () => {
    if (normalizedPercentage >= 80) return '#00FFB0';
    if (normalizedPercentage >= 60) return '#FF6F1B';
    return '#FF4757';
  };

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
      <CardContent>
        <div className="h-64 flex items-center justify-center">
          <div className="relative">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={getColor()}
                strokeWidth="10"
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-white">{value}%</span>
              {target && (
                <span className="text-xs text-white/60">Meta: {target}%</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
