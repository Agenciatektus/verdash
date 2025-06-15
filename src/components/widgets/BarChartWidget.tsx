
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Widget } from "@/types/widgets";

interface BarChartWidgetProps {
  widget: Widget;
  data: any[];
  isEditing?: boolean;
}

export const BarChartWidget = ({ widget, data, isEditing = false }: BarChartWidgetProps) => {
  const { config } = widget;

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
      <CardContent className="pt-0">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              {config.showGrid && (
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              )}
              <XAxis 
                dataKey={config.xAxisKey || 'name'} 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(30, 30, 30, 0.95)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Bar 
                dataKey={config.yAxisKey || 'value'} 
                fill={config.colors?.[0] || "#1042F6"}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
