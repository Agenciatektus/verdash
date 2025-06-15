
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BillingHistory as BillingHistoryType } from "@/types/billing";
import { Download, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BillingHistoryProps {
  history: BillingHistoryType[];
}

export const BillingHistory = ({ history }: BillingHistoryProps) => {
  const getStatusBadge = (status: string) => {
    const variants = {
      paid: 'bg-verdash-success text-white',
      pending: 'bg-verdash-warning text-white',
      failed: 'bg-verdash-error text-white'
    };

    const labels = {
      paid: 'Pago',
      pending: 'Pendente',
      failed: 'Falhou'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <Card className="verdash-glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white font-grotesk uppercase">
          <CreditCard className="w-5 h-5" />
          Histórico de Pagamentos
        </CardTitle>
        <CardDescription className="text-white/70">
          Visualize todas as suas transações e faturas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum histórico de pagamento encontrado</p>
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-verdash-input-bg/30 border border-verdash-divider/30">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-white">{item.description}</span>
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="text-sm text-white/60">
                    {format(new Date(item.date), 'dd/MM/yyyy', { locale: ptBR })}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">
                      R$ {item.amount.toFixed(2)}
                    </div>
                    <div className="text-sm text-white/60 uppercase">
                      {item.currency}
                    </div>
                  </div>
                  
                  {item.invoiceUrl && item.status === 'paid' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="verdash-btn-secondary"
                      onClick={() => window.open(item.invoiceUrl, '_blank')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Fatura
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
