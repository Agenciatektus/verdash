
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MetricBuilderForm } from "./MetricBuilderForm";

export const MetricBuilder = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSave = (metricData: any) => {
    console.log("Saving metric:", metricData);
    // Handle metric save logic here
  };

  return (
    <Card className="verdash-glass">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-verdash-input-bg/20 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calculator className="w-6 h-6 text-verdash-cyan" />
                <div>
                  <CardTitle className="text-white font-grotesk">Construtor de Métricas</CardTitle>
                  <CardDescription className="text-white/60">
                    Crie fórmulas personalizadas empilhando cálculos
                  </CardDescription>
                </div>
              </div>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-white/60" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white/60" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent>
            <MetricBuilderForm 
              onSave={handleSave}
              onCancel={() => setIsOpen(false)}
              showActions={true}
            />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
