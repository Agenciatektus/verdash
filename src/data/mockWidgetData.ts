import { Widget, WidgetData } from "@/types/widgets";

export const mockWidgets: Widget[] = [
  {
    id: '1',
    type: 'kpi',
    title: 'Receita Total',
    description: 'Receita acumulada no mês',
    position: { x: 0, y: 0, width: 1, height: 1 },
    config: {
      value: 234567,
      previousValue: 198432,
      target: 250000,
      format: 'currency',
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    type: 'kpi',
    title: 'Conversão',
    description: 'Taxa de conversão do funil',
    position: { x: 1, y: 0, width: 1, height: 1 },
    config: {
      value: 3.4,
      previousValue: 3.7,
      target: 4.0,
      format: 'percentage',
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '3',
    type: 'kpi',
    title: 'Usuários Ativos',
    description: 'Usuários únicos este mês',
    position: { x: 2, y: 0, width: 1, height: 1 },
    config: {
      value: 12543,
      previousValue: 11230,
      target: 15000,
      format: 'number',
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '4',
    type: 'kpi',
    title: 'NPS Score',
    description: 'Net Promoter Score atual',
    position: { x: 3, y: 0, width: 1, height: 1 },
    config: {
      value: 72,
      previousValue: 68,
      target: 75,
      format: 'number',
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '5',
    type: 'kpi',
    title: 'Churn Rate',
    description: 'Taxa de cancelamento mensal',
    position: { x: 4, y: 0, width: 1, height: 1 },
    config: {
      value: 2.8,
      previousValue: 3.2,
      target: 2.0,
      format: 'percentage',
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '6',
    type: 'line-chart',
    title: 'Evolução da Receita',
    description: 'Receita diária dos últimos 30 dias',
    position: { x: 0, y: 1, width: 3, height: 2 },
    config: {
      xAxisKey: 'date',
      yAxisKey: 'value',
      colors: ['#00FFB0'],
      showGrid: true,
      showLegend: false,
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '7',
    type: 'donut-chart',
    title: 'Receita por Canal',
    description: 'Distribuição da receita por canal de vendas',
    position: { x: 3, y: 1, width: 2, height: 2 },
    config: {
      dataKey: 'value',
      colors: ['#1042F6', '#00FFB0', '#FF6F1B', '#FF4757', '#9c88ff'],
      showLegend: true,
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '8',
    type: 'bar-chart',
    title: 'Performance por Vendedor',
    description: 'Vendas realizadas por cada vendedor',
    position: { x: 0, y: 3, width: 2, height: 2 },
    config: {
      xAxisKey: 'name',
      yAxisKey: 'value',
      colors: ['#1042F6'],
      showGrid: true,
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '9',
    type: 'table',
    title: 'Top Produtos',
    description: 'Produtos mais vendidos',
    position: { x: 2, y: 3, width: 2, height: 2 },
    config: {
      columns: [
        { key: 'produto', title: 'Produto', type: 'string', sortable: true },
        { key: 'vendas', title: 'Vendas', type: 'number', sortable: true },
        { key: 'receita', title: 'Receita', type: 'currency', sortable: true }
      ],
      pageSize: 8
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '10',
    type: 'gauge-chart',
    title: 'Meta Mensal',
    description: 'Progresso da meta de vendas',
    position: { x: 4, y: 3, width: 1, height: 2 },
    config: {
      value: 78,
      min: 0,
      max: 100,
      unit: '%',
      colors: ['#00FFB0']
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '11',
    type: 'funnel',
    title: 'Funil Comercial',
    description: 'Etapas do funil de vendas',
    position: { x: 0, y: 4, width: 2, height: 2 },
    config: { stages: [
      { stage: 'Visitantes', value: 10000, conversion: 100 },
      { stage: 'Leads', value: 2500, conversion: 25 },
      { stage: 'MQLs', value: 1000, conversion: 40 },
      { stage: 'SQLs', value: 400, conversion: 40 },
      { stage: 'Oportunidades', value: 200, conversion: 50 },
      { stage: 'Propostas', value: 120, conversion: 60 },
      { stage: 'Fechamentos', value: 60, conversion: 50 }
    ] },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

export const mockWidgetData: Record<string, any[]> = {
  // Line chart data - Evolução da Receita
  '6': [
    { date: '01/12', value: 45000 },
    { date: '02/12', value: 52000 },
    { date: '03/12', value: 48000 },
    { date: '04/12', value: 61000 },
    { date: '05/12', value: 55000 },
    { date: '06/12', value: 67000 },
    { date: '07/12', value: 72000 },
    { date: '08/12', value: 68000 },
    { date: '09/12', value: 75000 },
    { date: '10/12', value: 82000 },
    { date: '11/12', value: 78000 },
    { date: '12/12', value: 85000 },
    { date: '13/12', value: 91000 },
    { date: '14/12', value: 87000 },
    { date: '15/12', value: 94000 },
    { date: '16/12', value: 89000 },
    { date: '17/12', value: 96000 },
    { date: '18/12', value: 103000 },
    { date: '19/12', value: 98000 },
    { date: '20/12', value: 105000 },
    { date: '21/12', value: 112000 },
    { date: '22/12', value: 108000 },
    { date: '23/12', value: 115000 },
    { date: '24/12', value: 121000 },
    { date: '25/12', value: 118000 },
    { date: '26/12', value: 125000 },
    { date: '27/12', value: 132000 },
    { date: '28/12', value: 128000 },
    { date: '29/12', value: 135000 },
    { date: '30/12', value: 142000 }
  ],

  // Donut chart data - Receita por Canal
  '7': [
    { name: 'E-commerce', value: 45, color: '#1042F6' },
    { name: 'Vendas Diretas', value: 28, color: '#00FFB0' },
    { name: 'Marketplace', value: 15, color: '#FF6F1B' },
    { name: 'Parcerias', value: 8, color: '#FF4757' },
    { name: 'Outros', value: 4, color: '#9c88ff' }
  ],

  // Bar chart data - Performance por Vendedor
  '8': [
    { name: 'Ana Silva', value: 145000 },
    { name: 'Carlos Santos', value: 132000 },
    { name: 'Maria Oliveira', value: 128000 },
    { name: 'João Pedro', value: 118000 },
    { name: 'Fernanda Costa', value: 112000 },
    { name: 'Rafael Lima', value: 108000 },
    { name: 'Juliana Rocha', value: 95000 },
    { name: 'Pedro Alves', value: 87000 }
  ],

  // Table data - Top Produtos
  '9': [
    { produto: 'Plano Premium Anual', vendas: 245, receita: 73500 },
    { produto: 'Plano Básico Mensal', vendas: 189, receita: 18900 },
    { produto: 'Add-on Analytics Pro', vendas: 156, receita: 15600 },
    { produto: 'Consultoria Especializada', vendas: 78, receita: 39000 },
    { produto: 'Treinamento Corporativo', vendas: 67, receita: 20100 },
    { produto: 'Suporte Premium', vendas: 45, receita: 9000 },
    { produto: 'API Access Enterprise', vendas: 34, receita: 6800 },
    { produto: 'White Label Solution', vendas: 23, receita: 11500 },
    { produto: 'Custom Reports', vendas: 19, receita: 5700 },
    { produto: 'Data Export Premium', vendas: 12, receita: 2400 },
    { produto: 'Mobile App Add-on', vendas: 8, receita: 1600 },
    { produto: 'Advanced Security', vendas: 6, receita: 3000 }
  ],

  // Marketing data - Pie chart
  'marketing-channels': [
    { name: 'Facebook Ads', value: 35, color: '#1877F2' },
    { name: 'Google Ads', value: 28, color: '#4285F4' },
    { name: 'Instagram Ads', value: 20, color: '#E4405F' },
    { name: 'Email Marketing', value: 12, color: '#FF6B35' },
    { name: 'LinkedIn Ads', value: 5, color: '#0077B5' }
  ],

  // Leads evolution - Area chart
  'leads-evolution': [
    { date: 'Jan', leads: 1200, qualified: 480 },
    { date: 'Fev', leads: 1350, qualified: 540 },
    { date: 'Mar', leads: 1180, qualified: 472 },
    { date: 'Abr', leads: 1580, qualified: 632 },
    { date: 'Mai', leads: 1450, qualified: 580 },
    { date: 'Jun', leads: 1720, qualified: 688 },
    { date: 'Jul', leads: 1890, qualified: 756 },
    { date: 'Ago', leads: 1650, qualified: 660 },
    { date: 'Set', leads: 1980, qualified: 792 },
    { date: 'Out', leads: 2150, qualified: 860 },
    { date: 'Nov', leads: 1950, qualified: 780 },
    { date: 'Dez', leads: 2280, qualified: 912 }
  ],

  // User engagement - Radar chart
  'user-engagement': [
    { subject: 'Login Frequency', value: 85, fullMark: 100 },
    { subject: 'Feature Usage', value: 72, fullMark: 100 },
    { subject: 'Session Duration', value: 68, fullMark: 100 },
    { subject: 'Task Completion', value: 90, fullMark: 100 },
    { subject: 'Mobile Usage', value: 65, fullMark: 100 },
    { subject: 'Support Tickets', value: 45, fullMark: 100 }
  ],

  // Financial performance - Bar chart
  'financial-performance': [
    { category: 'Q1 2024', revenue: 450000, costs: 280000, profit: 170000 },
    { category: 'Q2 2024', revenue: 520000, costs: 310000, profit: 210000 },
    { category: 'Q3 2024', revenue: 480000, costs: 290000, profit: 190000 },
    { category: 'Q4 2024', revenue: 610000, costs: 350000, profit: 260000 }
  ],

  // Customer satisfaction - Area chart
  'customer-satisfaction': [
    { month: 'Jan', nps: 65, csat: 78, ces: 72 },
    { month: 'Fev', nps: 68, csat: 80, ces: 74 },
    { month: 'Mar', nps: 72, csat: 82, ces: 76 },
    { month: 'Abr', nps: 70, csat: 79, ces: 75 },
    { month: 'Mai', nps: 74, csat: 84, ces: 78 },
    { month: 'Jun', nps: 76, csat: 86, ces: 80 },
    { month: 'Jul', nps: 78, csat: 87, ces: 82 },
    { month: 'Ago', nps: 75, csat: 85, ces: 79 },
    { month: 'Set', nps: 79, csat: 88, ces: 83 },
    { month: 'Out', nps: 81, csat: 90, ces: 85 },
    { month: 'Nov', nps: 80, csat: 89, ces: 84 },
    { month: 'Dez', nps: 83, csat: 92, ces: 87 }
  ],

  // Sales funnel data
  'sales-funnel': [
    { stage: 'Visitantes', value: 10000, conversion: 100 },
    { stage: 'Leads', value: 2500, conversion: 25 },
    { stage: 'MQLs', value: 1000, conversion: 40 },
    { stage: 'SQLs', value: 400, conversion: 40 },
    { stage: 'Oportunidades', value: 200, conversion: 50 },
    { stage: 'Propostas', value: 120, conversion: 60 },
    { stage: 'Fechamentos', value: 60, conversion: 50 }
  ],

  // Technical metrics
  'technical-metrics': [
    { metric: 'Uptime', value: 99.8, target: 99.9 },
    { metric: 'Response Time', value: 245, target: 200 },
    { metric: 'Error Rate', value: 0.2, target: 0.1 },
    { metric: 'Throughput', value: 1250, target: 1000 },
    { metric: 'CPU Usage', value: 68, target: 80 },
    { metric: 'Memory Usage', value: 72, target: 85 }
  ],

  // Campaign performance
  'campaign-performance': [
    { campaign: 'Black Friday 2024', impressions: 125000, clicks: 8750, conversions: 350, spend: 15000 },
    { campaign: 'Natal Premium', impressions: 98000, clicks: 6860, conversions: 275, spend: 12000 },
    { campaign: 'Ano Novo Empresarial', impressions: 87000, clicks: 5220, conversions: 195, spend: 9500 },
    { campaign: 'Volta às Aulas B2B', impressions: 76000, clicks: 4560, conversions: 182, spend: 8200 },
    { campaign: 'Promoção Trimestral', impressions: 65000, clicks: 3900, conversions: 156, spend: 7100 }
  ],

  // Product usage metrics
  'product-usage': [
    { feature: 'Dashboard Analytics', usage: 95, adoption: 87 },
    { feature: 'Reports Generator', usage: 82, adoption: 74 },
    { feature: 'Data Export', usage: 78, adoption: 68 },
    { feature: 'Team Collaboration', usage: 71, adoption: 62 },
    { feature: 'API Integration', usage: 58, adoption: 45 },
    { feature: 'Custom Widgets', usage: 43, adoption: 35 }
  ],

  // Customer success metrics
  'customer-health': [
    { segment: 'Enterprise', health: 85, revenue: 450000, accounts: 45 },
    { segment: 'Mid-Market', health: 78, revenue: 320000, accounts: 128 },
    { segment: 'SMB', health: 72, revenue: 180000, accounts: 285 },
    { segment: 'Startup', health: 68, revenue: 95000, accounts: 420 }
  ],

  // Geographic performance
  'geographic-performance': [
    { region: 'Sudeste', revenue: 850000, customers: 1250, growth: 15.2 },
    { region: 'Sul', revenue: 320000, customers: 480, growth: 12.8 },
    { region: 'Nordeste', revenue: 280000, customers: 420, growth: 18.5 },
    { region: 'Centro-Oeste', revenue: 180000, customers: 270, growth: 14.3 },
    { region: 'Norte', revenue: 120000, customers: 180, growth: 22.1 }
  ],

  // Support metrics
  'support-metrics': [
    { metric: 'First Response Time', value: 2.5, unit: 'hours', target: 2.0 },
    { metric: 'Resolution Time', value: 8.2, unit: 'hours', target: 6.0 },
    { metric: 'Customer Satisfaction', value: 4.6, unit: '/5', target: 4.8 },
    { metric: 'Ticket Volume', value: 145, unit: 'tickets', target: 120 },
    { metric: 'First Contact Resolution', value: 78, unit: '%', target: 85 }
  ],

  // Sales funnel data
  '11': [
    { stage: 'Visitantes', value: 10000, conversion: 100 },
    { stage: 'Leads', value: 2500, conversion: 25 },
    { stage: 'MQLs', value: 1000, conversion: 40 },
    { stage: 'SQLs', value: 400, conversion: 40 },
    { stage: 'Oportunidades', value: 200, conversion: 50 },
    { stage: 'Propostas', value: 120, conversion: 60 },
    { stage: 'Fechamentos', value: 60, conversion: 50 }
  ]
};

export const mockFunnelData = [
  { label: "Total de Clicks", value: 170 },
  { label: "Conversas", value: 128 },
  { label: "Orçamentos", value: 83 },
  { label: "Compras", value: 25 }
];

export const mockBarData = [
  { name: "Janeiro", vendas: 120, leads: 200 },
  { name: "Fevereiro", vendas: 98, leads: 180 },
  { name: "Março", vendas: 150, leads: 220 }
];

export const mockDonutData = [
  { name: "E-commerce", value: 45 },
  { name: "Vendas Diretas", value: 28 },
  { name: "Marketplace", value: 15 },
  { name: "Parcerias", value: 8 }
];

export const mockKPIData = [
  { title: "Receita Total", value: 234567, format: "currency" },
  { title: "Conversão", value: 3.4, format: "percentage" },
  { title: "Usuários Ativos", value: 12543, format: "number" }
];

export const mockStackedBarData = [
  { name: "Janeiro", vendas: 120, upsell: 30, cross: 20 },
  { name: "Fevereiro", vendas: 98, upsell: 22, cross: 15 },
  { name: "Março", vendas: 150, upsell: 40, cross: 25 }
];

export const mockLineData = [
  { date: "01/12", value: 45000 },
  { date: "02/12", value: 52000 },
  { date: "03/12", value: 48000 },
  { date: "04/12", value: 61000 },
  { date: "05/12", value: 55000 },
  { date: "06/12", value: 67000 },
  { date: "07/12", value: 72000 },
  { date: "08/12", value: 68000 },
  { date: "09/12", value: 75000 },
  { date: "10/12", value: 82000 }
];
