import { Widget } from "@/types/widgets";

export const createExecutiveDashboard = (): Widget[] => [
  // Linha superior - 5 KPI Cards
  {
    id: 'exec-kpi-1',
    type: 'kpi',
    title: 'Receita Total',
    position: { x: 0, y: 0, width: 1, height: 1 },
    config: {
      value: 234567,
      previousValue: 198432,
      target: 250000,
      format: 'currency',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-kpi-2',
    type: 'kpi',
    title: 'Crescimento Mensal',
    position: { x: 1, y: 0, width: 1, height: 1 },
    config: {
      value: 12.5,
      previousValue: 8.3,
      format: 'percentage',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-kpi-3',
    type: 'kpi',
    title: 'Churn Rate',
    position: { x: 2, y: 0, width: 1, height: 1 },
    config: {
      value: 2.4,
      previousValue: 3.1,
      target: 2.0,
      format: 'percentage',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-kpi-4',
    type: 'progress-bar',
    title: 'Meta vs Realizado',
    position: { x: 3, y: 0, width: 1, height: 1 },
    config: {
      percentage: 78.5,
      value: 196500,
      target: 250000,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-kpi-5',
    type: 'gauge-chart',
    title: 'NPS Geral',
    position: { x: 4, y: 0, width: 1, height: 1 },
    config: {
      value: 67,
      min: -100,
      max: 100,
      unit: '',
      colors: ['#00FFB0']
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Linha intermediária
  {
    id: 'exec-line-chart',
    type: 'line-chart',
    title: 'Crescimento da Receita',
    position: { x: 0, y: 1, width: 3, height: 2 },
    config: {
      xAxisKey: 'date',
      yAxisKey: 'revenue',
      colors: ['#00FFB0'],
      showGrid: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-donut-chart',
    type: 'donut-chart',
    title: 'Receita por Canal',
    position: { x: 3, y: 1, width: 2, height: 2 },
    config: {
      dataKey: 'value',
      showLegend: true,
      colors: ['#1042F6', '#00FFB0', '#FF6F1B', '#FF4757']
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Linha inferior
  {
    id: 'exec-funnel',
    type: 'funnel',
    title: 'Pipeline Resumido',
    position: { x: 0, y: 3, width: 2, height: 2 },
    config: {
      stages: [
        { step: 'Leads', value: 1000, percentage: 100, conversion: 0, icon: 'Users', color: '#1042F6' },
        { step: 'Qualificados', value: 350, percentage: 35, conversion: 35, icon: 'UserCheck', color: '#00FFB0' },
        { step: 'Propostas', value: 120, percentage: 12, conversion: 34, icon: 'FileText', color: '#FF6F1B' },
        { step: 'Fechados', value: 45, percentage: 4.5, conversion: 37, icon: 'CheckCircle', color: '#FF4757' }
      ]
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-bar-chart',
    type: 'bar-chart',
    title: 'Desempenho por Canal',
    position: { x: 2, y: 3, width: 2, height: 2 },
    config: {
      xAxisKey: 'canal',
      yAxisKey: 'performance',
      colors: ['#1042F6'],
      showGrid: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-leads-kpi',
    type: 'kpi',
    title: 'Volume de Leads',
    position: { x: 4, y: 3, width: 1, height: 2 },
    config: {
      value: 2847,
      previousValue: 2156,
      format: 'number',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const createSalesDashboard = (): Widget[] => [
  // Topo - KPIs
  {
    id: 'sales-kpi-1',
    type: 'kpi',
    title: 'Receita Gerada',
    position: { x: 0, y: 0, width: 1, height: 1 },
    config: {
      value: 156780,
      previousValue: 142300,
      format: 'currency',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'sales-kpi-2',
    type: 'kpi',
    title: 'Leads Qualificados',
    position: { x: 1, y: 0, width: 1, height: 1 },
    config: {
      value: 247,
      previousValue: 198,
      format: 'number',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'sales-kpi-3',
    type: 'kpi',
    title: 'Taxa de Conversão',
    position: { x: 2, y: 0, width: 1, height: 1 },
    config: {
      value: 18.5,
      previousValue: 16.2,
      format: 'percentage',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'sales-kpi-4',
    type: 'kpi',
    title: 'Ciclo Médio de Vendas',
    position: { x: 3, y: 0, width: 1, height: 1 },
    config: {
      value: 34,
      previousValue: 42,
      format: 'number',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Meio
  {
    id: 'sales-funnel',
    type: 'funnel',
    title: 'Funil de Vendas',
    position: { x: 0, y: 1, width: 2, height: 2 },
    config: {
      stages: [
        { step: 'Prospects', value: 500, percentage: 100, conversion: 0, icon: 'Users', color: '#1042F6' },
        { step: 'Qualificados', value: 250, percentage: 50, conversion: 50, icon: 'UserCheck', color: '#00FFB0' },
        { step: 'Propostas', value: 100, percentage: 20, conversion: 40, icon: 'FileText', color: '#FF6F1B' },
        { step: 'Negociação', value: 45, percentage: 9, conversion: 45, icon: 'MessageSquare', color: '#FF4757' },
        { step: 'Fechados', value: 18, percentage: 3.6, conversion: 40, icon: 'CheckCircle', color: '#9c88ff' }
      ]
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'sales-bar-chart',
    type: 'bar-chart',
    title: 'Receita por Vendedor',
    position: { x: 2, y: 1, width: 2, height: 2 },
    config: {
      xAxisKey: 'vendedor',
      yAxisKey: 'receita',
      colors: ['#1042F6'],
      showGrid: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Base
  {
    id: 'sales-table',
    type: 'table',
    title: 'Pipeline de Oportunidades',
    position: { x: 0, y: 3, width: 3, height: 2 },
    config: {
      columns: [
        { key: 'cliente', title: 'Cliente', type: 'string', sortable: true },
        { key: 'valor', title: 'Valor', type: 'currency', sortable: true },
        { key: 'probabilidade', title: 'Prob.', type: 'percentage', sortable: true },
        { key: 'vendedor', title: 'Vendedor', type: 'string', sortable: true }
      ],
      pageSize: 8
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'sales-products',
    type: 'bar-chart',
    title: 'Performance por Produto',
    position: { x: 3, y: 3, width: 1, height: 2 },
    config: {
      xAxisKey: 'produto',
      yAxisKey: 'vendas',
      colors: ['#00FFB0'],
      showGrid: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const createMarketingDashboard = (): Widget[] => [
  // Linha de KPIs
  {
    id: 'marketing-kpi-1',
    type: 'kpi',
    title: 'CPL (Custo por Lead)',
    position: { x: 0, y: 0, width: 1, height: 1 },
    config: {
      value: 45.50,
      previousValue: 52.30,
      format: 'currency',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'marketing-kpi-2',
    type: 'kpi',
    title: 'CPA (Custo por Aquisição)',
    position: { x: 1, y: 0, width: 1, height: 1 },
    config: {
      value: 187.80,
      previousValue: 203.45,
      format: 'currency',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'marketing-kpi-3',
    type: 'kpi',
    title: 'ROI das Campanhas',
    position: { x: 2, y: 0, width: 1, height: 1 },
    config: {
      value: 285,
      previousValue: 245,
      format: 'percentage',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'marketing-kpi-4',
    type: 'kpi',
    title: 'CTR Médio',
    position: { x: 3, y: 0, width: 1, height: 1 },
    config: {
      value: 3.2,
      previousValue: 2.8,
      format: 'percentage',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'marketing-kpi-5',
    type: 'kpi',
    title: 'Leads Gerados',
    position: { x: 4, y: 0, width: 1, height: 1 },
    config: {
      value: 1247,
      previousValue: 1089,
      format: 'number',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Meio
  {
    id: 'marketing-area-chart',
    type: 'area-chart',
    title: 'Leads ao Longo do Tempo',
    position: { x: 0, y: 1, width: 3, height: 2 },
    config: {
      xAxisKey: 'date',
      yAxisKey: 'leads',
      colors: ['#00FFB0'],
      showGrid: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'marketing-donut',
    type: 'donut-chart',
    title: 'Leads por Canal',
    position: { x: 3, y: 1, width: 2, height: 2 },
    config: {
      dataKey: 'value',
      showLegend: true,
      colors: ['#1042F6', '#00FFB0', '#FF6F1B', '#FF4757', '#9c88ff']
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Inferior
  {
    id: 'marketing-investment',
    type: 'stacked-bar-chart',
    title: 'Investimento por Canal',
    position: { x: 0, y: 3, width: 2, height: 2 },
    config: {
      xAxisKey: 'canal',
      yAxisKey: 'investimento',
      colors: ['#1042F6', '#00FFB0', '#FF6F1B'],
      showGrid: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'marketing-campaigns',
    type: 'table',
    title: 'Campanhas Ativas',
    position: { x: 2, y: 3, width: 2, height: 2 },
    config: {
      columns: [
        { key: 'campanha', title: 'Campanha', type: 'string', sortable: true },
        { key: 'impressoes', title: 'Impressões', type: 'number', sortable: true },
        { key: 'ctr', title: 'CTR', type: 'percentage', sortable: true },
        { key: 'custo', title: 'Custo', type: 'currency', sortable: true }
      ],
      pageSize: 6
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'marketing-growth',
    type: 'line-chart',
    title: 'Crescimento de Seguidores',
    position: { x: 4, y: 3, width: 1, height: 2 },
    config: {
      xAxisKey: 'date',
      yAxisKey: 'seguidores',
      colors: ['#FF6F1B'],
      showGrid: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const createProductDashboard = (): Widget[] => [
  // Linha de KPIs
  {
    id: 'product-kpi-1',
    type: 'kpi',
    title: 'DAU (Daily Active Users)',
    position: { x: 0, y: 0, width: 1, height: 1 },
    config: {
      value: 8450,
      previousValue: 7892,
      format: 'number',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'product-kpi-2',
    type: 'kpi',
    title: 'MAU (Monthly Active Users)',
    position: { x: 1, y: 0, width: 1, height: 1 },
    config: {
      value: 45230,
      previousValue: 42150,
      format: 'number',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'product-kpi-3',
    type: 'kpi',
    title: 'DAU/MAU Ratio',
    position: { x: 2, y: 0, width: 1, height: 1 },
    config: {
      value: 18.7,
      previousValue: 18.2,
      format: 'percentage',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'product-kpi-4',
    type: 'kpi',
    title: 'Tempo Médio de Sessão',
    position: { x: 3, y: 0, width: 1, height: 1 },
    config: {
      value: 12.5,
      previousValue: 11.8,
      format: 'number',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'product-kpi-5',
    type: 'progress-bar',
    title: 'Adoção de Features',
    position: { x: 4, y: 0, width: 1, height: 1 },
    config: {
      percentage: 67.8,
      value: 678,
      target: 1000,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Meio
  {
    id: 'product-usage',
    type: 'line-chart',
    title: 'Uso ao Longo do Tempo',
    position: { x: 0, y: 1, width: 3, height: 2 },
    config: {
      xAxisKey: 'date',
      yAxisKey: 'usage',
      colors: ['#00FFB0'],
      showGrid: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'product-heatmap',
    type: 'heatmap',
    title: 'Heatmap de Atividades',
    position: { x: 3, y: 1, width: 2, height: 2 },
    config: {
      showGrid: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Inferior
  {
    id: 'product-radar',
    type: 'radar-chart',
    title: 'Uso por Funcionalidade',
    position: { x: 0, y: 3, width: 2, height: 2 },
    config: {
      showLegend: true,
      fullMark: 100,
      colors: ['#00FFB0']
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'product-bugs',
    type: 'kpi',
    title: 'Bugs Reportados',
    position: { x: 2, y: 3, width: 1, height: 1 },
    config: {
      value: 23,
      previousValue: 31,
      format: 'number',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'product-aha',
    type: 'gauge-chart',
    title: 'Tempo até AHA Moment',
    position: { x: 3, y: 3, width: 2, height: 2 },
    config: {
      value: 3.2,
      min: 0,
      max: 10,
      unit: ' dias',
      colors: ['#1042F6']
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const getDashboardTemplate = (templateId: string): Widget[] => {
  switch (templateId) {
    case 'executive':
      return createExecutiveDashboard();
    case 'sales':
      return createSalesDashboard();
    case 'marketing':
      return createMarketingDashboard();
    case 'product':
      return createProductDashboard();
    default:
      return [];
  }
};
