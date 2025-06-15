
export interface Widget {
  id: string;
  type: 'kpi' | 'line-chart' | 'bar-chart' | 'pie-chart' | 'table' | 'funnel';
  title: string;
  description?: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  config: WidgetConfig;
  dataSource?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WidgetConfig {
  // KPI específico
  value?: number;
  previousValue?: number;
  target?: number;
  format?: 'currency' | 'percentage' | 'number';
  trend?: 'up' | 'down' | 'neutral';
  
  // Gráficos
  dataKey?: string;
  xAxisKey?: string;
  yAxisKey?: string;
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  
  // Tabela
  columns?: TableColumn[];
  pageSize?: number;
  
  // Funil
  stages?: FunnelStage[];
}

export interface TableColumn {
  key: string;
  title: string;
  type: 'string' | 'number' | 'currency' | 'percentage' | 'date';
  sortable?: boolean;
}

export interface FunnelStage {
  name: string;
  value: number;
  color: string;
}

export interface WidgetData {
  widgetId: string;
  data: any[];
  lastUpdate: string;
}
