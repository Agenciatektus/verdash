
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Widget } from "@/types/widgets";
import { useState } from "react";

interface TableWidgetProps {
  widget: Widget;
  data: any[];
  isEditing?: boolean;
}

export const TableWidget = ({ widget, data, isEditing = false }: TableWidgetProps) => {
  const { config } = widget;
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const columns = config.columns || [];
  const pageSize = config.pageSize || 10;
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const formatCellValue = (value: any, type: string) => {
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('pt-BR', { 
          style: 'currency', 
          currency: 'BRL' 
        }).format(value);
      case 'percentage':
        return `${value}%`;
      case 'date':
        return new Date(value).toLocaleDateString('pt-BR');
      case 'number':
        return typeof value === 'number' ? value.toLocaleString('pt-BR') : value;
      default:
        return value;
    }
  };

  return (
    <Card className={`verdash-glass h-full ${isEditing ? 'ring-2 ring-verdash-cyan' : ''}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-base truncate">
          {widget.title}
        </CardTitle>
        {widget.description && (
          <p className="text-xs text-white/60">{widget.description}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-auto max-h-80">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {columns.map((column) => (
                  <th 
                    key={column.key}
                    className={`text-left py-2 px-3 text-white/80 font-medium ${
                      column.sortable ? 'cursor-pointer hover:text-white' : ''
                    }`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-1">
                      {column.title}
                      {column.sortable && sortField === column.key && (
                        sortDirection === 'asc' ? 
                        <ChevronUp className="w-3 h-3" /> : 
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.slice(0, pageSize).map((row, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                  {columns.map((column) => (
                    <td key={column.key} className="py-2 px-3 text-white">
                      {formatCellValue(row[column.key], column.type)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {data.length > pageSize && (
          <div className="mt-3 text-xs text-white/60 text-center">
            Mostrando {Math.min(pageSize, data.length)} de {data.length} registros
          </div>
        )}
      </CardContent>
    </Card>
  );
};
