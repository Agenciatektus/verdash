
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewIntegrationDialogProps {
  onIntegrationAdded: (integration: any) => void;
}

export function NewIntegrationDialog({ onIntegrationAdded }: NewIntegrationDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    apiKey: "",
    webhookUrl: ""
  });
  const { toast } = useToast();

  const integrationTypes = [
    { value: "analytics", label: "Analytics", icon: "📊" },
    { value: "social", label: "Social Media", icon: "📱" },
    { value: "spreadsheet", label: "Planilhas", icon: "📋" },
    { value: "webhook", label: "Webhook", icon: "🔗" },
    { value: "ecommerce", label: "E-commerce", icon: "🛒" },
    { value: "email", label: "Email Marketing", icon: "📧" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type) {
      toast({
        title: "Erro",
        description: "Nome e tipo são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const selectedType = integrationTypes.find(t => t.value === formData.type);
    
    const newIntegration = {
      id: Date.now(),
      name: formData.name,
      description: formData.description || `Integração ${selectedType?.label}`,
      status: "disconnected",
      icon: selectedType?.icon || "🔗",
      lastSync: "Nunca conectado"
    };

    onIntegrationAdded(newIntegration);
    
    toast({
      title: "Sucesso",
      description: "Nova integração adicionada com sucesso!",
    });

    setFormData({
      name: "",
      type: "",
      description: "",
      apiKey: "",
      webhookUrl: ""
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="verdash-btn-primary verdash-hover-scale">
          <Plus className="w-5 h-5 mr-2" />
          Nova Integração
        </Button>
      </DialogTrigger>
      <DialogContent className="verdash-glass border-verdash-divider max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white font-grotesk">
            Adicionar Nova Integração
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Configure uma nova fonte de dados para seus dashboards
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/80">Nome da Integração</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Google Analytics Principal"
              className="verdash-input"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-white/80">Tipo</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger className="verdash-input">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent className="verdash-glass border-verdash-divider">
                {integrationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="text-white">
                    {type.icon} {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white/80">Descrição (opcional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva o propósito desta integração..."
              className="verdash-input"
              rows={3}
            />
          </div>

          {formData.type === "webhook" && (
            <div className="space-y-2">
              <Label htmlFor="webhookUrl" className="text-white/80">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={formData.webhookUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, webhookUrl: e.target.value }))}
                placeholder="https://api.example.com/webhook"
                className="verdash-input"
                type="url"
              />
            </div>
          )}

          {(formData.type === "analytics" || formData.type === "social" || formData.type === "ecommerce") && (
            <div className="space-y-2">
              <Label htmlFor="apiKey" className="text-white/80">API Key</Label>
              <Input
                id="apiKey"
                value={formData.apiKey}
                onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                placeholder="Sua chave de API"
                className="verdash-input"
                type="password"
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 verdash-btn-secondary"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 verdash-btn-primary">
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
