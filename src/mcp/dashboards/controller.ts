import { Dashboard, Widget, IDashboardModel } from './model';

export interface IDashboardController {
  createDashboard(dashboardData: Omit<Dashboard, 'id' | 'createdAt' | 'updatedAt'>): Promise<Dashboard>;
  updateDashboard(id: string, dashboardData: Partial<Dashboard>): Promise<Dashboard>;
  deleteDashboard(id: string): Promise<void>;
  getDashboard(id: string): Promise<Dashboard>;
  listDashboards(filters?: Partial<Dashboard>): Promise<Dashboard[]>;
  addWidget(dashboardId: string, widgetData: Omit<Widget, 'id' | 'createdAt' | 'updatedAt'>): Promise<Dashboard>;
  updateWidget(dashboardId: string, widgetId: string, widgetData: Partial<Widget>): Promise<Dashboard>;
  removeWidget(dashboardId: string, widgetId: string): Promise<Dashboard>;
  updateLayout(dashboardId: string, layout: Dashboard['layout']): Promise<Dashboard>;
}

export class DashboardController implements IDashboardController {
  constructor(private model: IDashboardModel) {}

  async createDashboard(dashboardData: Omit<Dashboard, 'id' | 'createdAt' | 'updatedAt'>): Promise<Dashboard> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.create(dashboardData);
    } catch (error) {
      console.error('Erro ao criar dashboard:', error);
      throw new Error('Falha ao criar dashboard');
    }
  }

  async updateDashboard(id: string, dashboardData: Partial<Dashboard>): Promise<Dashboard> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.update(id, dashboardData);
    } catch (error) {
      console.error('Erro ao atualizar dashboard:', error);
      throw new Error('Falha ao atualizar dashboard');
    }
  }

  async deleteDashboard(id: string): Promise<void> {
    try {
      await this.model.delete(id);
    } catch (error) {
      console.error('Erro ao deletar dashboard:', error);
      throw new Error('Falha ao deletar dashboard');
    }
  }

  async getDashboard(id: string): Promise<Dashboard> {
    try {
      return await this.model.getById(id);
    } catch (error) {
      console.error('Erro ao buscar dashboard:', error);
      throw new Error('Falha ao buscar dashboard');
    }
  }

  async listDashboards(filters?: Partial<Dashboard>): Promise<Dashboard[]> {
    try {
      return await this.model.list(filters);
    } catch (error) {
      console.error('Erro ao listar dashboards:', error);
      throw new Error('Falha ao listar dashboards');
    }
  }

  async addWidget(dashboardId: string, widgetData: Omit<Widget, 'id' | 'createdAt' | 'updatedAt'>): Promise<Dashboard> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.addWidget(dashboardId, widgetData);
    } catch (error) {
      console.error('Erro ao adicionar widget:', error);
      throw new Error('Falha ao adicionar widget');
    }
  }

  async updateWidget(dashboardId: string, widgetId: string, widgetData: Partial<Widget>): Promise<Dashboard> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.updateWidget(dashboardId, widgetId, widgetData);
    } catch (error) {
      console.error('Erro ao atualizar widget:', error);
      throw new Error('Falha ao atualizar widget');
    }
  }

  async removeWidget(dashboardId: string, widgetId: string): Promise<Dashboard> {
    try {
      return await this.model.removeWidget(dashboardId, widgetId);
    } catch (error) {
      console.error('Erro ao remover widget:', error);
      throw new Error('Falha ao remover widget');
    }
  }

  async updateLayout(dashboardId: string, layout: Dashboard['layout']): Promise<Dashboard> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.updateLayout(dashboardId, layout);
    } catch (error) {
      console.error('Erro ao atualizar layout:', error);
      throw new Error('Falha ao atualizar layout');
    }
  }
} 