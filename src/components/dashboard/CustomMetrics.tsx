
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricDialog } from "./MetricDialog";
import { MetricCard } from "./MetricCard";
import { customMetrics } from "@/constants/metricsData";

interface CustomMetricsProps {
  onNewMetric?: () => void;
}

export const CustomMetrics = ({ onNewMetric }: CustomMetricsProps) => {
  return (
    <Card className="verdash-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Métricas De Custo</CardTitle>
            <CardDescription>Métricas personalizadas de custo por ação</CardDescription>
          </div>
          <MetricDialog onNewMetric={onNewMetric} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customMetrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
