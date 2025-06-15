
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const performanceData = [
  {
    source: "Facebook Ads",
    icon: "📱",
    spend: 21450.32,
    leads: 532,
    cpl: 40.32,
    convRate: 7.32,
    trend: "up"
  },
  {
    source: "Google Ads",
    icon: "🔍",
    spend: 18934.67,
    leads: 487,
    cpl: 38.88,
    convRate: 8.95,
    trend: "up"
  },
  {
    source: "Instagram Ads",
    icon: "📷",
    spend: 12385.44,
    leads: 329,
    cpl: 37.65,
    convRate: 5.84,
    trend: "down"
  },
  {
    source: "Email Marketing",
    icon: "📧",
    spend: 5668.78,
    leads: 235,
    cpl: 24.12,
    convRate: 12.41,
    trend: "up"
  }
];

export const PerformanceBySource = () => {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <Card className="verdash-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Performance by Source</CardTitle>
            <CardDescription>Últimos 30 dias</CardDescription>
          </div>
          <Badge variant="outline" className="text-xs">
            Últimos 30 dias
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Source</th>
                <th className="text-right py-2 px-3 text-sm font-medium text-muted-foreground">Spend</th>
                <th className="text-right py-2 px-3 text-sm font-medium text-muted-foreground">Leads</th>
                <th className="text-right py-2 px-3 text-sm font-medium text-muted-foreground">CPL</th>
                <th className="text-right py-2 px-3 text-sm font-medium text-muted-foreground">Conv. Rate</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((item, index) => (
                <tr key={index} className="border-b border-border/10 hover:bg-muted/20">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium text-foreground">{item.source}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-3 font-medium">
                    {formatCurrency(item.spend)}
                  </td>
                  <td className="text-right py-3 px-3">{item.leads}</td>
                  <td className="text-right py-3 px-3">{formatCurrency(item.cpl)}</td>
                  <td className="text-right py-3 px-3">
                    <div className="flex items-center justify-end gap-1">
                      <span className={item.trend === 'up' ? 'text-verdash-success' : 'text-verdash-error'}>
                        {item.convRate}%
                      </span>
                      {item.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-verdash-success" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-verdash-error" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
