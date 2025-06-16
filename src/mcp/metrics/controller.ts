import { Metric, CompositeMetric, KPI, IMetricsModel } from './model';

export interface IMetricsController {
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

export class MetricsController implements IMetricsController {
  constructor(private model: IMetricsModel) {}

  // Métricas básicas
  async createMetric(metricData: Omit<Metric, 'id' | 'createdAt' | 'updatedAt'>): Promise<Metric> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.createMetric(metricData);
    } catch (error) {
      console.error('Erro ao criar métrica:', error);
      throw new Error('Falha ao criar métrica');
    }
  }

  async updateMetric(id: string, metricData: Partial<Metric>): Promise<Metric> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.updateMetric(id, metricData);
    } catch (error) {
      console.error('Erro ao atualizar métrica:', error);
      throw new Error('Falha ao atualizar métrica');
    }
  }

  async deleteMetric(id: string): Promise<void> {
    try {
      await this.model.deleteMetric(id);
    } catch (error) {
      console.error('Erro ao deletar métrica:', error);
      throw new Error('Falha ao deletar métrica');
    }
  }

  async getMetric(id: string): Promise<Metric> {
    try {
      return await this.model.getMetric(id);
    } catch (error) {
      console.error('Erro ao buscar métrica:', error);
      throw new Error('Falha ao buscar métrica');
    }
  }

  async listMetrics(filters?: Partial<Metric>): Promise<Metric[]> {
    try {
      return await this.model.listMetrics(filters);
    } catch (error) {
      console.error('Erro ao listar métricas:', error);
      throw new Error('Falha ao listar métricas');
    }
  }

  // Métricas compostas
  async createCompositeMetric(metricData: Omit<CompositeMetric, 'id' | 'createdAt' | 'updatedAt'>): Promise<CompositeMetric> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.createCompositeMetric(metricData);
    } catch (error) {
      console.error('Erro ao criar métrica composta:', error);
      throw new Error('Falha ao criar métrica composta');
    }
  }

  async updateCompositeMetric(id: string, metricData: Partial<CompositeMetric>): Promise<CompositeMetric> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.updateCompositeMetric(id, metricData);
    } catch (error) {
      console.error('Erro ao atualizar métrica composta:', error);
      throw new Error('Falha ao atualizar métrica composta');
    }
  }

  async deleteCompositeMetric(id: string): Promise<void> {
    try {
      await this.model.deleteCompositeMetric(id);
    } catch (error) {
      console.error('Erro ao deletar métrica composta:', error);
      throw new Error('Falha ao deletar métrica composta');
    }
  }

  async getCompositeMetric(id: string): Promise<CompositeMetric> {
    try {
      return await this.model.getCompositeMetric(id);
    } catch (error) {
      console.error('Erro ao buscar métrica composta:', error);
      throw new Error('Falha ao buscar métrica composta');
    }
  }

  async listCompositeMetrics(filters?: Partial<CompositeMetric>): Promise<CompositeMetric[]> {
    try {
      return await this.model.listCompositeMetrics(filters);
    } catch (error) {
      console.error('Erro ao listar métricas compostas:', error);
      throw new Error('Falha ao listar métricas compostas');
    }
  }

  // KPIs
  async createKPI(kpiData: Omit<KPI, 'id' | 'createdAt' | 'updatedAt'>): Promise<KPI> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.createKPI(kpiData);
    } catch (error) {
      console.error('Erro ao criar KPI:', error);
      throw new Error('Falha ao criar KPI');
    }
  }

  async updateKPI(id: string, kpiData: Partial<KPI>): Promise<KPI> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.updateKPI(id, kpiData);
    } catch (error) {
      console.error('Erro ao atualizar KPI:', error);
      throw new Error('Falha ao atualizar KPI');
    }
  }

  async deleteKPI(id: string): Promise<void> {
    try {
      await this.model.deleteKPI(id);
    } catch (error) {
      console.error('Erro ao deletar KPI:', error);
      throw new Error('Falha ao deletar KPI');
    }
  }

  async getKPI(id: string): Promise<KPI> {
    try {
      return await this.model.getKPI(id);
    } catch (error) {
      console.error('Erro ao buscar KPI:', error);
      throw new Error('Falha ao buscar KPI');
    }
  }

  async listKPIs(filters?: Partial<KPI>): Promise<KPI[]> {
    try {
      return await this.model.listKPIs(filters);
    } catch (error) {
      console.error('Erro ao listar KPIs:', error);
      throw new Error('Falha ao listar KPIs');
    }
  }
} 