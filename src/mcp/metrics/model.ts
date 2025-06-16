import { z } from 'zod';

// Schema para métricas básicas
export const MetricSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  type: z.enum(['number', 'percentage', 'currency', 'text', 'boolean']),
  unit: z.string().optional(),
  value: z.any(),
  source: z.string(),
  lastUpdated: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Schema para métricas compostas
export const CompositeMetricSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  formula: z.string(),
  metrics: z.array(z.string()), // IDs das métricas que compõem esta métrica
  type: z.enum(['number', 'percentage', 'currency', 'text', 'boolean']),
  unit: z.string().optional(),
  value: z.any(),
  lastUpdated: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Schema para KPIs
export const KPISchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  metricId: z.string(), // ID da métrica associada
  target: z.number(),
  currentValue: z.number(),
  status: z.enum(['above_target', 'on_target', 'below_target']),
  lastUpdated: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Tipos derivados dos schemas
export type Metric = z.infer<typeof MetricSchema>;
export type CompositeMetric = z.infer<typeof CompositeMetricSchema>;
export type KPI = z.infer<typeof KPISchema>;

// Interface para o modelo de métricas
export interface IMetricsModel {
  // Métricas básicas
  createMetric(metricData: Omit<Metric, 'id' | 'createdAt' | 'updatedAt'>): Promise<Metric>;
  updateMetric(id: string, metricData: Partial<Metric>): Promise<Metric>;
  deleteMetric(id: string): Promise<void>;
  getMetric(id: string): Promise<Metric>;
  listMetrics(filters?: Partial<Metric>): Promise<Metric[]>;

  // Métricas compostas
  createCompositeMetric(metricData: Omit<CompositeMetric, 'id' | 'createdAt' | 'updatedAt'>): Promise<CompositeMetric>;
  updateCompositeMetric(id: string, metricData: Partial<CompositeMetric>): Promise<CompositeMetric>;
  deleteCompositeMetric(id: string): Promise<void>;
  getCompositeMetric(id: string): Promise<CompositeMetric>;
  listCompositeMetrics(filters?: Partial<CompositeMetric>): Promise<CompositeMetric[]>;

  // KPIs
  createKPI(kpiData: Omit<KPI, 'id' | 'createdAt' | 'updatedAt'>): Promise<KPI>;
  updateKPI(id: string, kpiData: Partial<KPI>): Promise<KPI>;
  deleteKPI(id: string): Promise<void>;
  getKPI(id: string): Promise<KPI>;
  listKPIs(filters?: Partial<KPI>): Promise<KPI[]>;
}

// Implementação do modelo de métricas
export class MetricsModel implements IMetricsModel {
  private metrics: Metric[] = [];
  private compositeMetrics: CompositeMetric[] = [];
  private kpis: KPI[] = [];

  // Métricas básicas
  async createMetric(metricData: Omit<Metric, 'id' | 'createdAt' | 'updatedAt'>): Promise<Metric> {
    const now = new Date();
    const newMetric: Metric = {
      ...metricData,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    this.metrics.push(newMetric);
    return newMetric;
  }

  async updateMetric(id: string, metricData: Partial<Metric>): Promise<Metric> {
    const index = this.metrics.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Métrica não encontrada');
    }

    const updatedMetric = {
      ...this.metrics[index],
      ...metricData,
      updatedAt: new Date(),
    };

    this.metrics[index] = updatedMetric;
    return updatedMetric;
  }

  async deleteMetric(id: string): Promise<void> {
    const index = this.metrics.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Métrica não encontrada');
    }
    this.metrics.splice(index, 1);
  }

  async getMetric(id: string): Promise<Metric> {
    const metric = this.metrics.find(m => m.id === id);
    if (!metric) {
      throw new Error('Métrica não encontrada');
    }
    return metric;
  }

  async listMetrics(filters?: Partial<Metric>): Promise<Metric[]> {
    if (!filters) {
      return this.metrics;
    }
    return this.metrics.filter(metric =>
      Object.entries(filters).every(([key, value]) => metric[key as keyof Metric] === value)
    );
  }

  // Métricas compostas
  async createCompositeMetric(metricData: Omit<CompositeMetric, 'id' | 'createdAt' | 'updatedAt'>): Promise<CompositeMetric> {
    const now = new Date();
    const newMetric: CompositeMetric = {
      ...metricData,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    this.compositeMetrics.push(newMetric);
    return newMetric;
  }

  async updateCompositeMetric(id: string, metricData: Partial<CompositeMetric>): Promise<CompositeMetric> {
    const index = this.compositeMetrics.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Métrica composta não encontrada');
    }

    const updatedMetric = {
      ...this.compositeMetrics[index],
      ...metricData,
      updatedAt: new Date(),
    };

    this.compositeMetrics[index] = updatedMetric;
    return updatedMetric;
  }

  async deleteCompositeMetric(id: string): Promise<void> {
    const index = this.compositeMetrics.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Métrica composta não encontrada');
    }
    this.compositeMetrics.splice(index, 1);
  }

  async getCompositeMetric(id: string): Promise<CompositeMetric> {
    const metric = this.compositeMetrics.find(m => m.id === id);
    if (!metric) {
      throw new Error('Métrica composta não encontrada');
    }
    return metric;
  }

  async listCompositeMetrics(filters?: Partial<CompositeMetric>): Promise<CompositeMetric[]> {
    if (!filters) {
      return this.compositeMetrics;
    }
    return this.compositeMetrics.filter(metric =>
      Object.entries(filters).every(([key, value]) => metric[key as keyof CompositeMetric] === value)
    );
  }

  // KPIs
  async createKPI(kpiData: Omit<KPI, 'id' | 'createdAt' | 'updatedAt'>): Promise<KPI> {
    const now = new Date();
    const newKPI: KPI = {
      ...kpiData,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    this.kpis.push(newKPI);
    return newKPI;
  }

  async updateKPI(id: string, kpiData: Partial<KPI>): Promise<KPI> {
    const index = this.kpis.findIndex(k => k.id === id);
    if (index === -1) {
      throw new Error('KPI não encontrado');
    }

    const updatedKPI = {
      ...this.kpis[index],
      ...kpiData,
      updatedAt: new Date(),
    };

    this.kpis[index] = updatedKPI;
    return updatedKPI;
  }

  async deleteKPI(id: string): Promise<void> {
    const index = this.kpis.findIndex(k => k.id === id);
    if (index === -1) {
      throw new Error('KPI não encontrado');
    }
    this.kpis.splice(index, 1);
  }

  async getKPI(id: string): Promise<KPI> {
    const kpi = this.kpis.find(k => k.id === id);
    if (!kpi) {
      throw new Error('KPI não encontrado');
    }
    return kpi;
  }

  async listKPIs(filters?: Partial<KPI>): Promise<KPI[]> {
    if (!filters) {
      return this.kpis;
    }
    return this.kpis.filter(kpi =>
      Object.entries(filters).every(([key, value]) => kpi[key as keyof KPI] === value)
    );
  }
} 