
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Widget } from '@/types/widgets';
import { 
  BarChart3, 
  TrendingUp, 
  Table, 
  PieChart, 
  Target,
  TrendingDown,
  AreaChart,
  Gauge,
  BarChart2,
  Activity,
  Radar
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
      type: 'area-chart' as const,
      title: 'Gráfico de Área',
      description: 'Área preenchida',
      icon: AreaChart,
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
      type: 'donut-chart' as const,
      title: 'Gráfico de Rosca',
      description: 'Pizza com centro vazado',
      icon: PieChart,
      config: {
        dataKey: 'value',
        showLegend: true,
        colors: ['#1042F6', '#00FFB0', '#FF6F1B', '#FF4757']
      },
      position: { x: 0, y: 0, width: 2, height: 2 }
    },
    {
      type: 'gauge-chart' as const,
      title: 'Velocímetro',
      description: 'Indicador gauge',
      icon: Gauge,
      config: {
        value: 75,
        min: 0,
        max: 100,
        unit: '%',
        colors: ['#00FFB0']
      },
      position: { x: 0, y: 0, width: 1, height: 1 }
    },
    {
      type: 'progress-bar' as const,
      title: 'Barra de Progresso',
      description: 'Progresso visual',
      icon: BarChart2,
      config: {
        percentage: 65,
        value: 65,
        target: 100
      },
      position: { x: 0, y: 0, width: 1, height: 1 }
    },
    {
      type: 'radar-chart' as const,
      title: 'Gráfico Radar',
      description: 'Múltiplos critérios',
      icon: Radar,
      config: {
        showLegend: true,
        fullMark: 100,
        colors: ['#00FFB0']
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
    <div className="w-80 h-full bg-card border-l border-border overflow-y-auto flex-shrink-0">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Widgets Disponíveis</h3>
        </div>
        
        <div className="space-y-4">
          {widgetTemplates.map((template, index) => (
            <Card key={index} className="verdash-glass cursor-pointer hover:bg-accent/10 transition-colors border-border">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-verdash-blue to-verdash-cyan flex items-center justify-center flex-shrink-0">
                    <template.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">{template.title}</h4>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  className="w-full verdash-btn-primary text-xs"
                  onClick={() => handleAddWidget(template)}
                >
                  Adicionar Widget
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
