
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const monthlyData = [
  { month: "Mai", facebook: 45000, google: 32000, instagram: 18000, email: 8000 },
  { month: "Jun", facebook: 48000, google: 35000, instagram: 22000, email: 9000 },
  { month: "Jul", facebook: 52000, google: 38000, instagram: 25000, email: 12000 },
  { month: "Ago", facebook: 55000, google: 42000, instagram: 28000, email: 15000 },
  { month: "Set", facebook: 62000, google: 45000, instagram: 32000, email: 18000 },
  { month: "Out", facebook: 68000, google: 48000, instagram: 35000, email: 22000 }
];

export const MonthlySpendChart = () => {
  return (
    <Card className="verdash-card">
      <CardHeader>
        <CardTitle>Gasto Mensal por Campanha</CardTitle>
        <CardDescription>Últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="month" 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(30, 30, 30, 0.95)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'white'
                }}
                formatter={(value: any) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, '']}
              />
              <Legend />
              <Bar dataKey="facebook" stackId="a" fill="#1877F2" name="Facebook Ads" />
              <Bar dataKey="google" stackId="a" fill="#4285F4" name="Google Ads" />
              <Bar dataKey="instagram" stackId="a" fill="#E4405F" name="Instagram Ads" />
              <Bar dataKey="email" stackId="a" fill="#FF6B35" name="Email Marketing" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
