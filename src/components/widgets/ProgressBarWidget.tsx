import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Widget } from "@/types/widgets";

interface ProgressBarWidgetProps {
  widget: Widget;
  isEditing?: boolean;
}

export const ProgressBarWidget = ({ widget, isEditing = false }: ProgressBarWidgetProps) => {
  const { config } = widget;
  const value = config.value || 0;
  const maxValue = config.maxValue || 100;
  const target = config.target;
  
  const percentage = (value / maxValue) * 100;
  const normalizedPercentage = Math.max(0, Math.min(100, percentage));
  
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">{value}</span>
            {target && (
              <span className="text-xs text-white/60">Meta: {target}</span>
            )}
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-300"
              style={{
                width: `${normalizedPercentage}%`,
                background: getColor(),
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/60">
            <span>0</span>
            <span>{maxValue}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
