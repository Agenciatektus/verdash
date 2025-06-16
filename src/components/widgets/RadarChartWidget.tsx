import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts";
import { Widget } from "@/types/widgets";

interface RadarChartWidgetProps {
  widget: Widget;
  data: any[];
  isEditing?: boolean;
}

export const RadarChartWidget = ({ widget, data, isEditing = false }: RadarChartWidgetProps) => {
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
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="rgba(255,255,255,0.2)" />
              <PolarAngleAxis 
                dataKey="subject" 
                className="text-xs"
                tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                domain={[0, config.fullMark || 100]}
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                tickCount={4}
              />
              <Radar
                name={widget.title}
                dataKey="value"
                stroke={config.colors?.[0] || "#00FFB0"}
                fill={config.colors?.[0] || "#00FFB0"}
                fillOpacity={0.3}
                strokeWidth={2}
              />
              {config.showLegend && <Legend />}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
