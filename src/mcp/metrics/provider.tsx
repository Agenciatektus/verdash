import React, { createContext, useContext, useState, useCallback } from 'react';
import { Metric, CompositeMetric, KPI } from './model';
import { MetricsController } from './controller';
import { MetricsModel } from './model';

interface MetricsContextData {
  // Estado
  metrics: Metric[];
  compositeMetrics: CompositeMetric[];
  kpis: KPI[];
  isLoading: boolean;
  error: string | null;

  // Métricas básicas
  createMetric: (metricData: Omit<Metric, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateMetric: (id: string, metricData: Partial<Metric>) => Promise<void>;
  deleteMetric: (id: string) => Promise<void>;
  getMetric: (id: string) => Promise<Metric>;
  listMetrics: (filters?: Partial<Metric>) => Promise<void>;

  // Métricas compostas
  createCompositeMetric: (metricData: Omit<CompositeMetric, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateCompositeMetric: (id: string, metricData: Partial<CompositeMetric>) => Promise<void>;
  deleteCompositeMetric: (id: string) => Promise<void>;
  getCompositeMetric: (id: string) => Promise<CompositeMetric>;
  listCompositeMetrics: (filters?: Partial<CompositeMetric>) => Promise<void>;

  // KPIs
  createKPI: (kpiData: Omit<KPI, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateKPI: (id: string, kpiData: Partial<KPI>) => Promise<void>;
  deleteKPI: (id: string) => Promise<void>;
  getKPI: (id: string) => Promise<KPI>;
  listKPIs: (filters?: Partial<KPI>) => Promise<void>;
}

const MetricsContext = createContext<MetricsContextData>({} as MetricsContextData);

export const MetricsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [compositeMetrics, setCompositeMetrics] = useState<CompositeMetric[]>([]);
  const [kpis, setKPIs] = useState<KPI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const model = new MetricsModel();
  const controller = new MetricsController(model);

  const handleError = useCallback((error: Error) => {
    setError(error.message);
    setIsLoading(false);
  }, []);

  // Métricas básicas
  const createMetric = useCallback(async (metricData: Omit<Metric, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      setError(null);
      const newMetric = await controller.createMetric(metricData);
      setMetrics(prev => [...prev, newMetric]);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const updateMetric = useCallback(async (id: string, metricData: Partial<Metric>) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedMetric = await controller.updateMetric(id, metricData);
      setMetrics(prev => prev.map(m => m.id === id ? updatedMetric : m));
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const deleteMetric = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await controller.deleteMetric(id);
      setMetrics(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const getMetric = useCallback(async (id: string): Promise<Metric> => {
    try {
      setIsLoading(true);
      setError(null);
      return await controller.getMetric(id);
    } catch (error) {
      handleError(error as Error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const listMetrics = useCallback(async (filters?: Partial<Metric>) => {
    try {
      setIsLoading(true);
      setError(null);
      const metricsList = await controller.listMetrics(filters);
      setMetrics(metricsList);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  // Métricas compostas
  const createCompositeMetric = useCallback(async (metricData: Omit<CompositeMetric, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      setError(null);
      const newMetric = await controller.createCompositeMetric(metricData);
      setCompositeMetrics(prev => [...prev, newMetric]);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const updateCompositeMetric = useCallback(async (id: string, metricData: Partial<CompositeMetric>) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedMetric = await controller.updateCompositeMetric(id, metricData);
      setCompositeMetrics(prev => prev.map(m => m.id === id ? updatedMetric : m));
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const deleteCompositeMetric = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await controller.deleteCompositeMetric(id);
      setCompositeMetrics(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const getCompositeMetric = useCallback(async (id: string): Promise<CompositeMetric> => {
    try {
      setIsLoading(true);
      setError(null);
      return await controller.getCompositeMetric(id);
    } catch (error) {
      handleError(error as Error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const listCompositeMetrics = useCallback(async (filters?: Partial<CompositeMetric>) => {
    try {
      setIsLoading(true);
      setError(null);
      const metricsList = await controller.listCompositeMetrics(filters);
      setCompositeMetrics(metricsList);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  // KPIs
  const createKPI = useCallback(async (kpiData: Omit<KPI, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      setError(null);
      const newKPI = await controller.createKPI(kpiData);
      setKPIs(prev => [...prev, newKPI]);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const updateKPI = useCallback(async (id: string, kpiData: Partial<KPI>) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedKPI = await controller.updateKPI(id, kpiData);
      setKPIs(prev => prev.map(k => k.id === id ? updatedKPI : k));
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const deleteKPI = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await controller.deleteKPI(id);
      setKPIs(prev => prev.filter(k => k.id !== id));
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const getKPI = useCallback(async (id: string): Promise<KPI> => {
    try {
      setIsLoading(true);
      setError(null);
      return await controller.getKPI(id);
    } catch (error) {
      handleError(error as Error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const listKPIs = useCallback(async (filters?: Partial<KPI>) => {
    try {
      setIsLoading(true);
      setError(null);
      const kpisList = await controller.listKPIs(filters);
      setKPIs(kpisList);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  return (
    <MetricsContext.Provider
      value={{
        metrics,
        compositeMetrics,
        kpis,
        isLoading,
        error,
        createMetric,
        updateMetric,
        deleteMetric,
        getMetric,
        listMetrics,
        createCompositeMetric,
        updateCompositeMetric,
        deleteCompositeMetric,
        getCompositeMetric,
        listCompositeMetrics,
        createKPI,
        updateKPI,
        deleteKPI,
        getKPI,
        listKPIs,
      }}
    >
      {children}
    </MetricsContext.Provider>
  );
};

export const useMetrics = () => {
  const context = useContext(MetricsContext);
  if (!context) {
    throw new Error('useMetrics deve ser usado dentro de um MetricsProvider');
  }
  return context;
}; 