
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

  const getCurrentDateText = () => {
    if (selectedRange === "custom" && customRange?.from) {
      if (customRange.to) {
        return `${format(customRange.from, "dd/MM/yyyy", { locale: ptBR })} - ${format(customRange.to, "dd/MM/yyyy", { locale: ptBR })}`;
      }
      return format(customRange.from, "dd/MM/yyyy", { locale: ptBR });
    }
    
    const predefined = predefinedRanges.find(r => r.value === selectedRange);
    if (predefined && predefined.getRange) {
      const range = predefined.getRange();
      return `${format(range.from, "dd/MM/yyyy", { locale: ptBR })} - ${format(range.to, "dd/MM/yyyy", { locale: ptBR })}`;
    }
    
    return predefined?.label || "Selecionar período";
  };

  return (
    <div className="space-y-2">
      <Select value={selectedRange} onValueChange={handleRangeSelection}>
        <SelectTrigger className="w-[200px]">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {predefinedRanges.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedRange === "custom" && (
        <Popover open={showCustomCalendar} onOpenChange={setShowCustomCalendar}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !customRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {getCurrentDateText()}
            </Button>
          </PopoverTrigger>
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
        </Popover>
      )}
      
      {selectedRange !== "custom" && (
        <div className="text-sm text-muted-foreground">
          {getCurrentDateText()}
        </div>
      )}
    </div>
  );
};
