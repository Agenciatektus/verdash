
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Widget } from "@/types/widgets";

interface ProgressBarWidgetProps {
  widget: Widget;
  isEditing?: boolean;
}

export const ProgressBarWidget = ({ widget, isEditing = false }: ProgressBarWidgetProps) => {
  const { config } = widget;
  const percentage = config.percentage || 0;
  const value = config.value || 0;
  const target = config.target || 100;

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
      <CardContent className="pt-0 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/80">Progresso</span>
            <span className="text-white font-medium">{percentage.toFixed(1)}%</span>
          </div>
          <Progress 
            value={percentage} 
            className="h-3"
          />
        </div>
        
        <div className="flex justify-between text-xs text-white/60">
          <span>Atual: {value.toLocaleString()}</span>
          <span>Meta: {target.toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};
