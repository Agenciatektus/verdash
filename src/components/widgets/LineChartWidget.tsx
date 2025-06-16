import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Widget } from "@/types/widgets";

interface LineChartWidgetProps {
  widget: Widget;
  data: any[];
  isEditing?: boolean;
}

export const LineChartWidget = ({ widget, data, isEditing = false }: LineChartWidgetProps) => {
  const { config } = widget;

  return (
    <Card className={`verdash-glass h-full p-6 ${isEditing ? 'ring-2 ring-verdash-cyan' : ''}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-base truncate">
          {widget.title}
        </CardTitle>
        {widget.description && (
          <p className="text-xs text-white/60">{widget.description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
              <Line 
                type="monotone" 
                dataKey={config.yAxisKey || 'value'} 
                stroke={config.colors?.[0] || "#00FFB0"}
                strokeWidth={2}
                dot={{ fill: config.colors?.[0] || "#00FFB0", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: config.colors?.[0] || "#00FFB0", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
