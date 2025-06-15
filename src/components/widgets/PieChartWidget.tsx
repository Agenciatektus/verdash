
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Widget } from "@/types/widgets";

interface PieChartWidgetProps {
  widget: Widget;
  data: any[];
  isEditing?: boolean;
}

export const PieChartWidget = ({ widget, data, isEditing = false }: PieChartWidgetProps) => {
  const { config } = widget;
  const colors = config.colors || ['#1042F6', '#00FFB0', '#FF6F1B', '#FF4757', '#9c88ff', '#feca57'];

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
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey={config.dataKey || 'value'}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(30, 30, 30, 0.95)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              {config.showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
