
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteMetricDialogProps {
  isOpen: boolean;
  onClose: () => void;
  metricName: string;
  metricId: string;
  onConfirmDelete: (id: string) => void;
  hasUsages?: boolean;
  usageCount?: number;
}

export const DeleteMetricDialog = ({
  isOpen,
  onClose,
  metricName,
  metricId,
  onConfirmDelete,
  hasUsages = false,
  usageCount = 0
}: DeleteMetricDialogProps) => {
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const expectedText = metricName.toLowerCase();
  const isConfirmValid = confirmText.toLowerCase() === expectedText;

  const handleDelete = async () => {
    if (!isConfirmValid) {
      toast.error("Nome da métrica não confere");
      return;
    }

    setIsDeleting(true);

    // Simular delay de API
    setTimeout(() => {
      onConfirmDelete(metricId);
      toast.success(`Métrica "${metricName}" excluída com sucesso`);
      setIsDeleting(false);
      setConfirmText("");
      onClose();
    }, 1000);
  };

  const handleCancel = () => {
    setConfirmText("");
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-verdash-background border-verdash-divider/50 max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <AlertDialogTitle className="text-white font-grotesk">
                Excluir Métrica
              </AlertDialogTitle>
            </div>
          </div>
          
          <AlertDialogDescription className="text-white/60 space-y-3">
            <p>
              Você está prestes a excluir permanentemente a métrica{" "}
              <span className="font-medium text-white">"{metricName}"</span>.
            </p>
            
            {hasUsages && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">Atenção</span>
                </div>
                <p className="text-sm text-yellow-200">
                  Esta métrica está sendo usada em <strong>{usageCount}</strong> dashboard(s). 
                  Excluí-la pode afetar relatórios existentes.
                </p>
              </div>
            )}
            
            <p className="text-red-400 font-medium">
              Esta ação não pode ser desfeita.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <Label className="text-white font-medium">
              Para confirmar, digite o nome da métrica:
            </Label>
            <Input
              placeholder={metricName}
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="bg-verdash-input-bg border-verdash-divider text-white placeholder:text-white/40"
            />
            <p className="text-xs text-white/40">
              Digite: {metricName}
            </p>
          </div>
        </div>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel 
            onClick={handleCancel}
            className="bg-verdash-input-bg/50 border-verdash-divider hover:bg-verdash-input-bg text-white"
          >
            Cancelar
          </AlertDialogCancel>
          
          <AlertDialogAction
            onClick={handleDelete}
            disabled={!isConfirmValid || isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              "Excluindo..."
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir Métrica
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
