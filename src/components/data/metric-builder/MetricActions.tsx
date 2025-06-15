
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Copy, Archive, Trash2, BarChart3, Share2 } from "lucide-react";
import { toast } from "sonner";

interface MetricActionsProps {
  metricId: string;
  metricName: string;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  isActive: boolean;
}

export const MetricActions = ({
  metricId,
  metricName,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleStatus,
  isActive
}: MetricActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    onEdit(metricId);
    setIsOpen(false);
    toast.success(`Editando métrica: ${metricName}`);
  };

  const handleDuplicate = () => {
    onDuplicate(metricId);
    setIsOpen(false);
    toast.success(`Métrica duplicada: ${metricName}`);
  };

  const handleToggleStatus = () => {
    onToggleStatus(metricId);
    setIsOpen(false);
    toast.success(`Métrica ${isActive ? 'desativada' : 'ativada'}: ${metricName}`);
  };

  const handleDelete = () => {
    onDelete(metricId);
    setIsOpen(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`Métrica compartilhada: ${metricName}`);
    toast.success("Link copiado para a área de transferência!");
    setIsOpen(false);
  };

  const handleViewChart = () => {
    toast.info("Redirecionando para visualização de gráfico...");
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 text-white/60 hover:text-white hover:bg-verdash-input-bg/50"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Abrir menu de ações</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-verdash-background border-verdash-divider/50 shadow-lg"
      >
        <DropdownMenuItem 
          onClick={handleEdit}
          className="text-white hover:bg-verdash-input-bg/50 focus:bg-verdash-input-bg/50"
        >
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={handleDuplicate}
          className="text-white hover:bg-verdash-input-bg/50 focus:bg-verdash-input-bg/50"
        >
          <Copy className="mr-2 h-4 w-4" />
          Duplicar
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={handleViewChart}
          className="text-white hover:bg-verdash-input-bg/50 focus:bg-verdash-input-bg/50"
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Ver Gráfico
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={handleShare}
          className="text-white hover:bg-verdash-input-bg/50 focus:bg-verdash-input-bg/50"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Compartilhar
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-verdash-divider/30" />
        
        <DropdownMenuItem 
          onClick={handleToggleStatus}
          className="text-white hover:bg-verdash-input-bg/50 focus:bg-verdash-input-bg/50"
        >
          <Archive className="mr-2 h-4 w-4" />
          {isActive ? 'Desativar' : 'Ativar'}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-verdash-divider/30" />
        
        <DropdownMenuItem 
          onClick={handleDelete}
          className="text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 hover:text-red-300"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
