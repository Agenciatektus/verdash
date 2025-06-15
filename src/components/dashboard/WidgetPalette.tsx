
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Widget } from '@/types/widgets';
import { 
  BarChart3, 
  TrendingUp, 
  Table, 
  PieChart, 
  Target,
  TrendingDown
} from 'lucide-react';

interface WidgetPaletteProps {
  onWidgetAdd: (widget: Omit<Widget, 'id' | 'createdAt' | 'updatedAt'>) => void;
  isVisible: boolean;
}

export const WidgetPalette = ({ onWidgetAdd, isVisible }: WidgetPaletteProps) => {
  const widgetTemplates = [
    {
      type: 'kpi' as const,
      title: 'KPI',
      description: 'Métrica simples',
      icon: Target,
      config: {
        value: 0,
        previousValue: 0,
        format: 'number' as const,
      },
      position: { x: 0, y: 0, width: 1, height: 1 }
    },
    {
      type: 'line-chart' as const,
      title: 'Gráfico de Linha',
      description: 'Evolução temporal',
      icon: TrendingUp,
      config: {
        xAxisKey: 'date',
        yAxisKey: 'value',
        showGrid: true,
        colors: ['#00FFB0']
      },
      position: { x: 0, y: 0, width: 2, height: 2 }
    },
    {
      type: 'bar-chart' as const,
      title: 'Gráfico de Barras',
      description: 'Comparação de valores',
      icon: BarChart3,
      config: {
        xAxisKey: 'category',
        yAxisKey: 'value',
        showGrid: true,
        colors: ['#1042F6']
      },
      position: { x: 0, y: 0, width: 2, height: 2 }
    },
    {
      type: 'table' as const,
      title: 'Tabela',
      description: 'Dados tabulares',
      icon: Table,
      config: {
        columns: [
          { key: 'name', title: 'Nome', type: 'string' as const, sortable: true },
          { key: 'value', title: 'Valor', type: 'number' as const, sortable: true }
        ],
        pageSize: 10
      },
      position: { x: 0, y: 0, width: 1, height: 2 }
    },
    {
      type: 'pie-chart' as const,
      title: 'Gráfico de Pizza',
      description: 'Distribuição percentual',
      icon: PieChart,
      config: {
        dataKey: 'value',
        showLegend: true,
        colors: ['#1042F6', '#00FFB0', '#FF6F1B', '#FF4757']
      },
      position: { x: 0, y: 0, width: 2, height: 2 }
    },
    {
      type: 'funnel' as const,
      title: 'Funil',
      description: 'Processo de conversão',
      icon: TrendingDown,
      config: {
        stages: [
          { name: 'Visitantes', value: 1000, color: '#1042F6' },
          { name: 'Leads', value: 300, color: '#00FFB0' },
          { name: 'Prospects', value: 100, color: '#FF6F1B' },
          { name: 'Clientes', value: 30, color: '#FF4757' }
        ]
      },
      position: { x: 0, y: 0, width: 1, height: 2 }
    }
  ];

  const handleAddWidget = (template: typeof widgetTemplates[0]) => {
    const newWidget = {
      type: template.type,
      title: template.title,
      description: template.description,
      position: template.position,
      config: template.config,
      dataSource: undefined,
    };
    
    onWidgetAdd(newWidget);
  };

  if (!isVisible) return null;

  return (
    <div className="w-80 h-full bg-background border-l border-border overflow-y-auto">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Adicionar Widgets</h3>
        
        <div className="space-y-3">
          {widgetTemplates.map((template, index) => (
            <Card key={index} className="verdash-glass cursor-pointer hover:bg-white/5 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-verdash-blue to-verdash-cyan flex items-center justify-center">
                    <template.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white">{template.title}</h4>
                    <p className="text-xs text-white/60">{template.description}</p>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  className="w-full verdash-btn-primary text-xs"
                  onClick={() => handleAddWidget(template)}
                >
                  Adicionar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
