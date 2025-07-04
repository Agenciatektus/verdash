import { Card, CardContent } from "@/components/ui/card";
import { Target } from "lucide-react";

interface MetricCardProps {
  metric: {
    name: string;
    value: string;
  };
}

export const MetricCard = ({ metric }: MetricCardProps) => {
  return (
    <Card className="verdash-card verdash-card-hover verdash-animate">
      <CardContent>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-verdash-blue to-verdash-cyan flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{metric.name}</p>
            <p className="text-xl font-bold text-foreground">{metric.value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
