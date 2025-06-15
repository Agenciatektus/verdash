
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { DateRangeFilter } from "./DateRangeFilter";

interface FilterBarProps {
  onDashboardChange?: (dashboard: string) => void;
  onCampaignChange?: (campaign: string) => void;
  onStoreChange?: (store: string) => void;
}

export const FilterBar = ({ onDashboardChange, onCampaignChange, onStoreChange }: FilterBarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-card/20 border border-white/5 rounded-xl backdrop-blur-md">
      <DateRangeFilter />
      
      <Select onValueChange={onCampaignChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Todas as Campanhas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as Campanhas</SelectItem>
          <SelectItem value="facebook">Facebook Ads</SelectItem>
          <SelectItem value="google">Google Ads</SelectItem>
          <SelectItem value="instagram">Instagram Ads</SelectItem>
          <SelectItem value="email">Email Marketing</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onStoreChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Todas as Lojas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as Lojas</SelectItem>
          <SelectItem value="store1">Loja Principal</SelectItem>
          <SelectItem value="store2">Loja Shopping</SelectItem>
          <SelectItem value="store3">Loja Online</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="sm">
        <Filter className="w-4 h-4 mr-2" />
        Mais Filtros
      </Button>
      
      <Button className="verdash-btn-primary">
        Aplicar Filtros
      </Button>
    </div>
  );
};
