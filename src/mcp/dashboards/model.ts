import { z } from 'zod';

// Schema para widgets
export const WidgetSchema = z.object({
  id: z.string(),
  type: z.enum(['kpi', 'chart', 'table', 'metric']),
  title: z.string(),
  description: z.string().optional(),
  config: z.record(z.any()),
  position: z.object({
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number(),
  }),
  dataSource: z.object({
    type: z.enum(['api', 'database', 'file', 'integration']),
    config: z.record(z.any()),
  }),
  refreshInterval: z.number().optional(), // em segundos
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Schema para dashboards
export const DashboardSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
  projectId: z.string(),
  ownerId: z.string(),
  widgets: z.array(WidgetSchema),
  layout: z.object({
    type: z.enum(['grid', 'free']),
    config: z.record(z.any()),
  }),
  settings: z.object({
    theme: z.string().optional(),
    refreshInterval: z.number().optional(),
    autoSave: z.boolean(),
    sharing: z.object({
      enabled: z.boolean(),
      access: z.enum(['public', 'private', 'restricted']),
      allowedUsers: z.array(z.string()),
    }),
  }),
  status: z.enum(['draft', 'published', 'archived']),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastViewedAt: z.date().optional(),
});

// Tipos inferidos dos schemas
export type Widget = z.infer<typeof WidgetSchema>;
export type Dashboard = z.infer<typeof DashboardSchema>;

// Interface para operações do modelo
export interface IDashboardModel {
  create(dashboard: Omit<Dashboard, 'id' | 'createdAt' | 'updatedAt'>): Promise<Dashboard>;
  update(id: string, dashboard: Partial<Dashboard>): Promise<Dashboard>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Dashboard>;
  list(filters?: Partial<Dashboard>): Promise<Dashboard[]>;
  addWidget(dashboardId: string, widget: Omit<Widget, 'id' | 'createdAt' | 'updatedAt'>): Promise<Dashboard>;
  updateWidget(dashboardId: string, widgetId: string, widget: Partial<Widget>): Promise<Dashboard>;
  removeWidget(dashboardId: string, widgetId: string): Promise<Dashboard>;
  updateLayout(dashboardId: string, layout: Dashboard['layout']): Promise<Dashboard>;
}

// Implementação do modelo
export class DashboardModel implements IDashboardModel {
  private dashboards: Dashboard[] = [];

  async create(dashboard: Omit<Dashboard, 'id' | 'createdAt' | 'updatedAt'>): Promise<Dashboard> {
    const newDashboard: Dashboard = {
      ...dashboard,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.dashboards.push(newDashboard);
    return newDashboard;
  }

  async update(id: string, dashboard: Partial<Dashboard>): Promise<Dashboard> {
    const index = this.dashboards.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Dashboard não encontrado');

    const updatedDashboard = {
      ...this.dashboards[index],
      ...dashboard,
      updatedAt: new Date(),
    };

    this.dashboards[index] = updatedDashboard;
    return updatedDashboard;
  }

  async delete(id: string): Promise<void> {
    const index = this.dashboards.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Dashboard não encontrado');
    this.dashboards.splice(index, 1);
  }

  async getById(id: string): Promise<Dashboard> {
    const dashboard = this.dashboards.find(d => d.id === id);
    if (!dashboard) throw new Error('Dashboard não encontrado');
    return dashboard;
  }

  async list(filters?: Partial<Dashboard>): Promise<Dashboard[]> {
    if (!filters) return this.dashboards;

    return this.dashboards.filter(dashboard => {
      return Object.entries(filters).every(([key, value]) => {
        return dashboard[key as keyof Dashboard] === value;
      });
    });
  }

  async addWidget(dashboardId: string, widget: Omit<Widget, 'id' | 'createdAt' | 'updatedAt'>): Promise<Dashboard> {
    const dashboard = await this.getById(dashboardId);
    const newWidget: Widget = {
      ...widget,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dashboard.widgets.push(newWidget);
    dashboard.updatedAt = new Date();
    return dashboard;
  }

  async updateWidget(dashboardId: string, widgetId: string, widget: Partial<Widget>): Promise<Dashboard> {
    const dashboard = await this.getById(dashboardId);
    const widgetIndex = dashboard.widgets.findIndex(w => w.id === widgetId);
    if (widgetIndex === -1) throw new Error('Widget não encontrado');

    dashboard.widgets[widgetIndex] = {
      ...dashboard.widgets[widgetIndex],
      ...widget,
      updatedAt: new Date(),
    };
    dashboard.updatedAt = new Date();
    return dashboard;
  }

  async removeWidget(dashboardId: string, widgetId: string): Promise<Dashboard> {
    const dashboard = await this.getById(dashboardId);
    const widgetIndex = dashboard.widgets.findIndex(w => w.id === widgetId);
    if (widgetIndex === -1) throw new Error('Widget não encontrado');

    dashboard.widgets.splice(widgetIndex, 1);
    dashboard.updatedAt = new Date();
    return dashboard;
  }

  async updateLayout(dashboardId: string, layout: Dashboard['layout']): Promise<Dashboard> {
    const dashboard = await this.getById(dashboardId);
    dashboard.layout = layout;
    dashboard.updatedAt = new Date();
    return dashboard;
  }
} 