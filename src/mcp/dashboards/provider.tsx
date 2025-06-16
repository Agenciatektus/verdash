import React, { createContext, useContext, useState, useCallback } from 'react';
import { Dashboard, Widget } from './model';
import { DashboardController } from './controller';
import { DashboardModel } from './model';

interface DashboardContextData {
  dashboards: Dashboard[];
  currentDashboard: Dashboard | null;
  isLoading: boolean;
  error: string | null;
  createDashboard: (dashboardData: Omit<Dashboard, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateDashboard: (id: string, dashboardData: Partial<Dashboard>) => Promise<void>;
  deleteDashboard: (id: string) => Promise<void>;
  getDashboard: (id: string) => Promise<void>;
  listDashboards: (filters?: Partial<Dashboard>) => Promise<void>;
  addWidget: (dashboardId: string, widgetData: Omit<Widget, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateWidget: (dashboardId: string, widgetId: string, widgetData: Partial<Widget>) => Promise<void>;
  removeWidget: (dashboardId: string, widgetId: string) => Promise<void>;
  updateLayout: (dashboardId: string, layout: Dashboard['layout']) => Promise<void>;
  setCurrentDashboard: (dashboard: Dashboard | null) => void;
}

const DashboardContext = createContext<DashboardContextData>({} as DashboardContextData);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [currentDashboard, setCurrentDashboard] = useState<Dashboard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const model = new DashboardModel();
  const controller = new DashboardController(model);

  const handleError = useCallback((error: Error) => {
    setError(error.message);
    setIsLoading(false);
  }, []);

  const createDashboard = useCallback(async (dashboardData: Omit<Dashboard, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      setError(null);
      const newDashboard = await controller.createDashboard(dashboardData);
      setDashboards(prev => [...prev, newDashboard]);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const updateDashboard = useCallback(async (id: string, dashboardData: Partial<Dashboard>) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedDashboard = await controller.updateDashboard(id, dashboardData);
      setDashboards(prev => prev.map(d => d.id === id ? updatedDashboard : d));
      if (currentDashboard?.id === id) {
        setCurrentDashboard(updatedDashboard);
      }
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, currentDashboard, handleError]);

  const deleteDashboard = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await controller.deleteDashboard(id);
      setDashboards(prev => prev.filter(d => d.id !== id));
      if (currentDashboard?.id === id) {
        setCurrentDashboard(null);
      }
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, currentDashboard, handleError]);

  const getDashboard = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const dashboard = await controller.getDashboard(id);
      setCurrentDashboard(dashboard);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const listDashboards = useCallback(async (filters?: Partial<Dashboard>) => {
    try {
      setIsLoading(true);
      setError(null);
      const dashboardsList = await controller.listDashboards(filters);
      setDashboards(dashboardsList);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const addWidget = useCallback(async (dashboardId: string, widgetData: Omit<Widget, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedDashboard = await controller.addWidget(dashboardId, widgetData);
      setDashboards(prev => prev.map(d => d.id === dashboardId ? updatedDashboard : d));
      if (currentDashboard?.id === dashboardId) {
        setCurrentDashboard(updatedDashboard);
      }
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, currentDashboard, handleError]);

  const updateWidget = useCallback(async (dashboardId: string, widgetId: string, widgetData: Partial<Widget>) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedDashboard = await controller.updateWidget(dashboardId, widgetId, widgetData);
      setDashboards(prev => prev.map(d => d.id === dashboardId ? updatedDashboard : d));
      if (currentDashboard?.id === dashboardId) {
        setCurrentDashboard(updatedDashboard);
      }
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, currentDashboard, handleError]);

  const removeWidget = useCallback(async (dashboardId: string, widgetId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedDashboard = await controller.removeWidget(dashboardId, widgetId);
      setDashboards(prev => prev.map(d => d.id === dashboardId ? updatedDashboard : d));
      if (currentDashboard?.id === dashboardId) {
        setCurrentDashboard(updatedDashboard);
      }
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, currentDashboard, handleError]);

  const updateLayout = useCallback(async (dashboardId: string, layout: Dashboard['layout']) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedDashboard = await controller.updateLayout(dashboardId, layout);
      setDashboards(prev => prev.map(d => d.id === dashboardId ? updatedDashboard : d));
      if (currentDashboard?.id === dashboardId) {
        setCurrentDashboard(updatedDashboard);
      }
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, currentDashboard, handleError]);

  return (
    <DashboardContext.Provider
      value={{
        dashboards,
        currentDashboard,
        isLoading,
        error,
        createDashboard,
        updateDashboard,
        deleteDashboard,
        getDashboard,
        listDashboards,
        addWidget,
        updateWidget,
        removeWidget,
        updateLayout,
        setCurrentDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboards = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboards deve ser usado dentro de um DashboardProvider');
  }
  return context;
}; 