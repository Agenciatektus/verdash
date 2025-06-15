
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
    type: 'line-chart',
    title: 'Evolução da Receita',
    description: 'Receita diária dos últimos 30 dias',
    position: { x: 0, y: 1, width: 2, height: 2 },
    config: {
      xAxisKey: 'date',
      yAxisKey: 'revenue',
      colors: ['#00FFB0'],
      showGrid: true,
      showLegend: false,
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '5',
    type: 'table',
    title: 'Top Produtos',
    description: 'Produtos mais vendidos',
    position: { x: 2, y: 1, width: 1, height: 2 },
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
  }
];

export const mockWidgetData: Record<string, any[]> = {
  '4': [ // Line chart data
    { date: '01/01', revenue: 45000 },
    { date: '02/01', revenue: 52000 },
    { date: '03/01', revenue: 48000 },
    { date: '04/01', revenue: 61000 },
    { date: '05/01', revenue: 55000 },
    { date: '06/01', revenue: 67000 },
    { date: '07/01', revenue: 72000 },
    { date: '08/01', revenue: 68000 },
    { date: '09/01', revenue: 75000 },
    { date: '10/01', revenue: 82000 },
    { date: '11/01', revenue: 78000 },
    { date: '12/01', revenue: 85000 },
    { date: '13/01', revenue: 91000 },
    { date: '14/01', revenue: 87000 },
    { date: '15/01', revenue: 94000 }
  ],
  '5': [ // Table data
    { produto: 'Plano Premium', vendas: 245, receita: 73500 },
    { produto: 'Plano Básico', vendas: 189, receita: 18900 },
    { produto: 'Add-on Analytics', vendas: 156, receita: 15600 },
    { produto: 'Consultoria', vendas: 78, receita: 39000 },
    { produto: 'Treinamento', vendas: 67, receita: 20100 },
    { produto: 'Suporte Premium', vendas: 45, receita: 9000 },
    { produto: 'API Access', vendas: 34, receita: 6800 },
    { produto: 'White Label', vendas: 23, receita: 11500 },
    { produto: 'Custom Reports', vendas: 19, receita: 5700 },
    { produto: 'Data Export', vendas: 12, receita: 2400 }
  ]
};
