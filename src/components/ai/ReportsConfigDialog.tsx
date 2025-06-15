
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Settings, FileText, Mail, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ReportConfig {
  dashboardId: string;
  frequency: string;
  format: string;
  deliveryMethod: string;
  recipients: string[];
  customMessage: string;
}

const mockDashboards = [
  { id: "1", name: "Performance de Vendas" },
  { id: "2", name: "Marketing ROI" },
  { id: "3", name: "Funil de Conversão" },
  { id: "4", name: "Dashboard Principal" }
];

export function ReportsConfigDialog() {
  const [open, setOpen] = useState(false);
  const [recipients, setRecipients] = useState<string[]>([]);
  const [newRecipient, setNewRecipient] = useState("");

  const form = useForm<ReportConfig>({
    defaultValues: {
      dashboardId: "",
      frequency: "",
      format: "",
      deliveryMethod: "",
      recipients: [],
      customMessage: ""
    }
  });

  const addRecipient = () => {
    if (newRecipient && !recipients.includes(newRecipient)) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(newRecipient)) {
        setRecipients([...recipients, newRecipient]);
        setNewRecipient("");
      } else {
        toast.error("Por favor, insira um e-mail válido");
      }
    }
  };

  const removeRecipient = (email: string) => {
    setRecipients(recipients.filter(r => r !== email));
  };

  const onSubmit = (data: ReportConfig) => {
    if (recipients.length === 0) {
      toast.error("Adicione pelo menos um destinatário");
      return;
    }

    const configData = {
      ...data,
      recipients
    };

    console.log("Configuração de relatório:", configData);
    
    toast.success("Relatório automático configurado com sucesso!");
    setOpen(false);
    form.reset();
    setRecipients([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="verdash-btn-primary">
          <Settings className="w-4 h-4 mr-2" />
          Configurar Relatórios
        </Button>
      </DialogTrigger>
      <DialogContent className="verdash-glass max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white font-grotesk text-xl flex items-center gap-2">
            <FileText className="w-5 h-5 text-verdash-cyan" />
            Automação de Relatórios
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Configure o envio automático de relatórios para sua equipe
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Dashboard Selection */}
            <FormField
              control={form.control}
              name="dashboardId"
              rules={{ required: "Selecione um dashboard" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Dashboard</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="verdash-input">
                        <SelectValue placeholder="Escolha o dashboard para o relatório" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="verdash-glass border-verdash-divider">
                      {mockDashboards.map((dashboard) => (
                        <SelectItem key={dashboard.id} value={dashboard.id} className="text-white">
                          {dashboard.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Frequency */}
            <FormField
              control={form.control}
              name="frequency"
              rules={{ required: "Selecione a frequência" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Frequência
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="verdash-input">
                        <SelectValue placeholder="Com que frequência enviar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="verdash-glass border-verdash-divider">
                      <SelectItem value="daily" className="text-white">Diariamente</SelectItem>
                      <SelectItem value="weekly" className="text-white">Semanalmente</SelectItem>
                      <SelectItem value="biweekly" className="text-white">Quinzenalmente</SelectItem>
                      <SelectItem value="monthly" className="text-white">Mensalmente</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Format */}
            <FormField
              control={form.control}
              name="format"
              rules={{ required: "Selecione o formato" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Formato do Relatório</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="verdash-input">
                        <SelectValue placeholder="Como entregar o relatório" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="verdash-glass border-verdash-divider">
                      <SelectItem value="pdf-email" className="text-white">PDF anexado por e-mail</SelectItem>
                      <SelectItem value="link-readonly" className="text-white">Link seguro (somente leitura)</SelectItem>
                      <SelectItem value="link-interactive" className="text-white">Link seguro (interativo)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Recipients */}
            <div className="space-y-3">
              <FormLabel className="text-white/80 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Destinatários
              </FormLabel>
              
              <div className="flex gap-2">
                <Input
                  placeholder="email@exemplo.com"
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  className="verdash-input flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRecipient())}
                />
                <Button type="button" onClick={addRecipient} size="sm" className="verdash-btn-secondary">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {recipients.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {recipients.map((email) => (
                    <Badge key={email} variant="secondary" className="bg-verdash-cyan/20 text-verdash-cyan border-verdash-cyan/30">
                      {email}
                      <X 
                        className="w-3 h-3 ml-1 cursor-pointer hover:text-verdash-coral" 
                        onClick={() => removeRecipient(email)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Message */}
            <FormField
              control={form.control}
              name="customMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Mensagem Personalizada (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Adicione uma mensagem personalizada que será incluída no e-mail..."
                      className="verdash-input min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="verdash-btn-primary flex-1">
                Configurar Automação
              </Button>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="verdash-btn-secondary">
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
