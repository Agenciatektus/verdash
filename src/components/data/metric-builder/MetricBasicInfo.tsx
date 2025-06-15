
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

interface MetricBasicInfoProps {
  name: string;
  description: string;
  category: string;
  project: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onProjectChange: (value: string) => void;
}

export const MetricBasicInfo = ({
  name,
  description,
  category,
  project,
  onNameChange,
  onDescriptionChange,
  onCategoryChange,
  onProjectChange
}: MetricBasicInfoProps) => {
  return (
    <Card className="verdash-glass">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-verdash-cyan" />
          <div>
            <CardTitle className="text-white font-grotesk">Informações Básicas</CardTitle>
            <CardDescription className="text-white/60">
              Configure os detalhes principais da métrica
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="metric-name" className="text-white font-medium">
              Nome da Métrica *
            </Label>
            <Input
              id="metric-name"
              placeholder="Ex: Custo por Lead Qualificado"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="bg-verdash-input-bg border-verdash-divider text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="metric-project" className="text-white font-medium">
              Projeto
            </Label>
            <Select value={project} onValueChange={onProjectChange}>
              <SelectTrigger className="bg-verdash-input-bg border-verdash-divider text-white">
                <SelectValue placeholder="Selecione um projeto" />
              </SelectTrigger>
              <SelectContent className="bg-verdash-background border-verdash-divider">
                <SelectItem value="ecommerce">E-commerce Principal</SelectItem>
                <SelectItem value="marketing">Marketing Digital</SelectItem>
                <SelectItem value="b2b">Vendas B2B</SelectItem>
                <SelectItem value="global">Global (Todos os projetos)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="metric-description" className="text-white font-medium">
            Descrição
          </Label>
          <Textarea
            id="metric-description"
            placeholder="Descreva o que esta métrica calcula e sua importância..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={3}
            className="resize-none bg-verdash-input-bg border-verdash-divider text-white placeholder:text-white/40"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="metric-category" className="text-white font-medium">
            Categoria
          </Label>
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="bg-verdash-input-bg border-verdash-divider text-white">
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent className="bg-verdash-background border-verdash-divider">
              <SelectItem value="marketing">📊 Marketing</SelectItem>
              <SelectItem value="sales">💰 Vendas</SelectItem>
              <SelectItem value="finance">🏦 Financeiro</SelectItem>
              <SelectItem value="operations">⚙️ Operações</SelectItem>
              <SelectItem value="custom">🎯 Personalizada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
