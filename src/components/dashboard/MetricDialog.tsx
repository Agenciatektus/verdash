
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Calculator } from "lucide-react";
import { toast } from "sonner";
import { availableMetrics } from "@/constants/metricsData";
import { MetricBuilderForm } from "@/components/data/MetricBuilderForm";

interface MetricDialogProps {
  onNewMetric?: () => void;
}

export const MetricDialog = ({ onNewMetric }: MetricDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const [selectedMetric, setSelectedMetric] = useState("");

  const handleCreateMetric = (metricData: any) => {
    console.log("Creating metric:", metricData);
    toast.success("Métrica criada com sucesso!");
    setIsDialogOpen(false);
    onNewMetric?.();
  };

  const selectPredefinedMetric = (metricName: string) => {
    setSelectedMetric(metricName);
    setActiveTab("create");
    toast.success(`Métrica "${metricName}" selecionada!`);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="verdash-btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Nova Métrica
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-hidden bg-verdash-background border-verdash-divider/30" 
      >
        <DialogHeader>
          <DialogTitle className="text-white font-grotesk">Criar Nova Métrica</DialogTitle>
          <DialogDescription className="text-white/60">
            Escolha uma métrica pré-definida ou configure uma métrica personalizada
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-2 bg-verdash-input-bg/30">
            <TabsTrigger value="available" className="data-[state=active]:bg-verdash-cyan/20 data-[state=active]:text-verdash-cyan">
              Métricas Disponíveis
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-verdash-cyan/20 data-[state=active]:text-verdash-cyan">
              Criar Personalizada
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="mt-6">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-6">
                {Object.entries(availableMetrics).map(([key, category]) => (
                  <div key={key} className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <category.icon className="w-5 h-5 text-verdash-cyan" />
                      <h3 className="text-lg font-semibold text-white font-grotesk">{category.title}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {category.metrics.map((metric, index) => (
                        <button
                          key={index}
                          onClick={() => selectPredefinedMetric(metric)}
                          className="text-left p-3 rounded-lg bg-verdash-input-bg/20 hover:bg-verdash-input-bg/40 transition-all duration-200 group border border-verdash-divider/30 hover:border-verdash-cyan/50"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white group-hover:text-verdash-cyan transition-colors">
                              {metric}
                            </span>
                            <Plus className="w-4 h-4 text-white/60 group-hover:text-verdash-cyan transition-colors" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="create" className="mt-6">
            <ScrollArea className="h-[500px] pr-4">
              <MetricBuilderForm 
                onSave={handleCreateMetric}
                onCancel={() => setIsDialogOpen(false)}
                showActions={true}
                initialData={selectedMetric ? { name: selectedMetric } : undefined}
              />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
