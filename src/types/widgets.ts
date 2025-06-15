export interface Widget {
  id: string;
  type: 'kpi' | 'line-chart' | 'bar-chart' | 'pie-chart' | 'table' | 'funnel' | 'area-chart' | 'stacked-area-chart' | 'horizontal-bar-chart' | 'stacked-bar-chart' | 'grouped-bar-chart' | 'donut-chart' | 'waterfall-chart' | 'gauge-chart' | 'progress-bar' | 'scatter-chart' | 'bubble-chart' | 'heatmap' | 'radar-chart';
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
  
  // Gauge específico
  min?: number;
  max?: number;
  unit?: string;
  
  // Progress Bar
  percentage?: number;
  
  // Scatter/Bubble específico
  xKey?: string;
  yKey?: string;
  sizeKey?: string;
  
  // Radar específico
  subjects?: string[];
  fullMark?: number;
}

export interface TableColumn {
  key: string;
  title: string;
  type: 'string' | 'number' | 'currency' | 'percentage' | 'date';
  sortable?: boolean;
}

export interface FunnelStage {
  step: string;
  value: number;
  percentage: number;
  conversion: number;
  icon: string;
  color: string;
  metric?: string;
}

export interface WidgetData {
  widgetId: string;
  data: any[];
  lastUpdate: string;
}
