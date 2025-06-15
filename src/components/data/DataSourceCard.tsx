
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataSource } from "@/types/data";
import { 
  Sheet, 
  TrendingUp, 
  Api, 
  Webhook, 
  Database,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Clock,
  Settings,
  Eye,
  Download
} from "lucide-react";

interface DataSourceCardProps {
  source: DataSource;
}

export const DataSourceCard = ({ source }: DataSourceCardProps) => {
  const getStatusIcon = () => {
    switch (source.status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-verdash-success" />;
      case 'syncing':
        return <RefreshCw className="w-4 h-4 text-verdash-info animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-verdash-error" />;
      default:
        return <Clock className="w-4 h-4 text-verdash-disabled" />;
    }
  };

  const getSourceIcon = () => {
    switch (source.type) {
      case 'google_sheets':
        return <Sheet className="w-8 h-8 text-green-500" />;
      case 'meta_ads':
        return <TrendingUp className="w-8 h-8 text-blue-500" />;
      case 'api':
        return <Api className="w-8 h-8 text-purple-500" />;
      case 'webhook':
        return <Webhook className="w-8 h-8 text-orange-500" />;
      default:
        return <Database className="w-8 h-8 text-verdash-cyan" />;
    }
  };

  const getStatusColor = () => {
    switch (source.status) {
      case 'connected':
        return 'bg-verdash-success/10 text-verdash-success border-verdash-success/30';
      case 'syncing':
        return 'bg-verdash-info/10 text-verdash-info border-verdash-info/30';
      case 'error':
        return 'bg-verdash-error/10 text-verdash-error border-verdash-error/30';
      default:
        return 'bg-verdash-disabled/10 text-verdash-disabled border-verdash-disabled/30';
    }
  };

  const formatLastSync = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      'google_sheets': 'Google Sheets',
      'meta_ads': 'Meta Ads',
      'crm': 'CRM',
      'tintim': 'Tintim',
      'csv': 'CSV',
      'webhook': 'Webhook',
      'api': 'API'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <Card className="verdash-glass verdash-glass-hover">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getSourceIcon()}
            <div>
              <CardTitle className="text-white font-grotesk text-base">
                {source.name}
              </CardTitle>
              <CardDescription className="text-white/60 text-sm">
                {getTypeLabel(source.type)}
              </CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor()}>
            {getStatusIcon()}
            <span className="ml-1 capitalize">{source.status}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-verdash-input-bg/30 border border-verdash-divider/30">
            <p className="text-xs text-white/60 uppercase font-grotesk">Registros</p>
            <p className="text-lg font-bold text-white">{source.recordCount.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-verdash-input-bg/30 border border-verdash-divider/30">
            <p className="text-xs text-white/60 uppercase font-grotesk">Campos</p>
            <p className="text-lg font-bold text-white">{source.fields.length}</p>
          </div>
        </div>

        {/* Last Sync */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Última sincronização:</span>
          <span className="text-white">{formatLastSync(source.lastSync)}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1 verdash-btn-primary">
            <Eye className="w-4 h-4 mr-2" />
            Visualizar
          </Button>
          <Button size="sm" variant="outline" className="verdash-btn-secondary">
            <Settings className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" className="verdash-btn-secondary">
            <Download className="w-4 h-4" />
          </Button>
        </div>

        {/* Error Message */}
        {source.status === 'error' && (
          <div className="p-3 rounded-lg bg-verdash-error/10 border border-verdash-error/30">
            <p className="text-xs text-verdash-error">
              Erro na sincronização. Verifique as configurações da fonte.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
