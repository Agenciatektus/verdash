
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface EnhancedDateRangeFilterProps {
  onRangeChange?: (range: DateRange | undefined) => void;
}

const predefinedRanges = [
  { 
    label: "Este mês", 
    value: "current-month",
    getRange: () => ({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date())
    })
  },
  { 
    label: "Mês anterior", 
    value: "last-month",
    getRange: () => ({
      from: startOfMonth(subMonths(new Date(), 1)),
      to: endOfMonth(subMonths(new Date(), 1))
    })
  },
  { 
    label: "7 dias", 
    value: "7-days",
    getRange: () => ({
      from: subDays(new Date(), 7),
      to: new Date()
    })
  },
  { 
    label: "30 dias", 
    value: "30-days",
    getRange: () => ({
      from: subDays(new Date(), 30),
      to: new Date()
    })
  },
  { 
    label: "Personalizado", 
    value: "custom"
  }
];

export const EnhancedDateRangeFilter = ({ onRangeChange }: EnhancedDateRangeFilterProps) => {
  const [selectedRange, setSelectedRange] = useState("30-days");
  const [customRange, setCustomRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [showCustomCalendar, setShowCustomCalendar] = useState(false);

  const handleRangeSelection = (value: string) => {
    setSelectedRange(value);
    
    if (value === "custom") {
      setShowCustomCalendar(true);
      return;
    }
    
    setShowCustomCalendar(false);
    const predefinedRange = predefinedRanges.find(r => r.value === value);
    if (predefinedRange && predefinedRange.getRange) {
      const range = predefinedRange.getRange();
      setCustomRange(range);
      onRangeChange?.(range);
    }
  };

  const handleCustomRangeChange = (range: DateRange | undefined) => {
    setCustomRange(range);
    onRangeChange?.(range);
  };

  const getDisplayValue = () => {
    if (selectedRange === "custom" && customRange?.from && customRange?.to) {
      return `${format(customRange.from, "dd/MM/yyyy", { locale: ptBR })} - ${format(customRange.to, "dd/MM/yyyy", { locale: ptBR })}`;
    }
    
    const predefined = predefinedRanges.find(r => r.value === selectedRange);
    return predefined?.label || "Selecionar período";
  };

  return (
    <div className="space-y-2">
      <Popover open={showCustomCalendar} onOpenChange={setShowCustomCalendar}>
        <Select value={selectedRange} onValueChange={handleRangeSelection}>
          <SelectTrigger className="w-[200px] border-0 bg-white/5 backdrop-blur-sm">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <SelectValue>{getDisplayValue()}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {predefinedRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
            {selectedRange === "custom" && customRange?.from && customRange?.to && (
              <div className="px-2 py-2 border-t">
                <div className="text-xs text-muted-foreground mb-2">Período selecionado:</div>
                <div className="text-sm">
                  {format(customRange.from, "dd/MM/yyyy", { locale: ptBR })} - {format(customRange.to, "dd/MM/yyyy", { locale: ptBR })}
                </div>
              </div>
            )}
          </SelectContent>
        </Select>
        
        {selectedRange === "custom" && (
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={customRange?.from}
              selected={customRange}
              onSelect={handleCustomRangeChange}
              numberOfMonths={2}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
};
