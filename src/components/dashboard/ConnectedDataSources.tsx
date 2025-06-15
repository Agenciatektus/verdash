
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";

const dataSources = [
  {
    name: "Google Sheets",
    icon: "📊",
    status: "connected",
    lastUpdate: "2 horas atrás",
    connectedSheets: ["Sales Data", "Marketing Budget", "Campaign Results"]
  },
  {
    name: "Meta Ads",
    icon: "📱",
    status: "connected",
    lastUpdate: "1 hora atrás",
    connectedSheets: ["Campaign Performance", "Ad Spend"]
  },
  {
    name: "Google Ads",
    icon: "🔍",
    status: "disconnected",
    lastUpdate: "3 dias atrás",
    connectedSheets: []
  }
];

export const ConnectedDataSources = () => {
  return (
    <Card className="verdash-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Fontes de Dados Conectadas</CardTitle>
            <CardDescription>Gerencie suas integrações e fontes de dados</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nova Fonte
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dataSources.map((source, index) => (
            <div key={index} className="p-4 rounded-lg border border-border/30 hover:border-border/50 bg-card/20 hover:bg-card/40 verdash-animate">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{source.icon}</span>
                  <div>
                    <h4 className="font-semibold text-foreground">{source.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Atualizado: {source.lastUpdate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={source.status === 'connected' ? 'default' : 'secondary'}
                    className={source.status === 'connected' 
                      ? 'bg-verdash-success/20 text-verdash-success border-verdash-success/30' 
                      : 'bg-gray-500/20 text-gray-500 border-gray-500/30'
                    }
                  >
                    {source.status === 'connected' ? 'Conectado' : 'Desconectado'}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {source.connectedSheets.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Planilhas conectadas:</p>
                  <div className="flex flex-wrap gap-1">
                    {source.connectedSheets.map((sheet, sheetIndex) => (
                      <Badge key={sheetIndex} variant="outline" className="text-xs">
                        {sheet}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
