import React, { createContext, useContext, useState, useCallback } from 'react';
import { Credentials, IntegrationConfig, IntegrationData } from './model';
import { IntegrationsController } from './controller';
import { IntegrationsModel } from './model';

interface IntegrationsContextData {
  // Estado
  credentials: Credentials[];
  integrationConfigs: IntegrationConfig[];
  integrationData: IntegrationData[];
  isLoading: boolean;
  error: string | null;

  // Credenciais
  createCredentials: (credentialsData: Omit<Credentials, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateCredentials: (id: string, credentialsData: Partial<Credentials>) => Promise<void>;
  deleteCredentials: (id: string) => Promise<void>;
  getCredentials: (id: string) => Promise<Credentials>;
  listCredentials: (filters?: Partial<Credentials>) => Promise<void>;

  // Configurações de integração
  createIntegrationConfig: (configData: Omit<IntegrationConfig, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateIntegrationConfig: (id: string, configData: Partial<IntegrationConfig>) => Promise<void>;
  deleteIntegrationConfig: (id: string) => Promise<void>;
  getIntegrationConfig: (id: string) => Promise<IntegrationConfig>;
  listIntegrationConfigs: (filters?: Partial<IntegrationConfig>) => Promise<void>;

  // Dados de integração
  createIntegrationData: (data: Omit<IntegrationData, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateIntegrationData: (id: string, data: Partial<IntegrationData>) => Promise<void>;
  deleteIntegrationData: (id: string) => Promise<void>;
  getIntegrationData: (id: string) => Promise<IntegrationData>;
  listIntegrationData: (filters?: Partial<IntegrationData>) => Promise<void>;
}

const IntegrationsContext = createContext<IntegrationsContextData>({} as IntegrationsContextData);

export const IntegrationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [credentials, setCredentials] = useState<Credentials[]>([]);
  const [integrationConfigs, setIntegrationConfigs] = useState<IntegrationConfig[]>([]);
  const [integrationData, setIntegrationData] = useState<IntegrationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const model = new IntegrationsModel();
  const controller = new IntegrationsController(model);

  const handleError = useCallback((error: Error) => {
    setError(error.message);
    setIsLoading(false);
  }, []);

  // Credenciais
  const createCredentials = useCallback(async (credentialsData: Omit<Credentials, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      setError(null);
      const newCredentials = await controller.createCredentials(credentialsData);
      setCredentials(prev => [...prev, newCredentials]);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const updateCredentials = useCallback(async (id: string, credentialsData: Partial<Credentials>) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedCredentials = await controller.updateCredentials(id, credentialsData);
      setCredentials(prev => prev.map(c => c.id === id ? updatedCredentials : c));
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const deleteCredentials = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await controller.deleteCredentials(id);
      setCredentials(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const getCredentials = useCallback(async (id: string): Promise<Credentials> => {
    try {
      setIsLoading(true);
      setError(null);
      return await controller.getCredentials(id);
    } catch (error) {
      handleError(error as Error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const listCredentials = useCallback(async (filters?: Partial<Credentials>) => {
    try {
      setIsLoading(true);
      setError(null);
      const credentialsList = await controller.listCredentials(filters);
      setCredentials(credentialsList);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  // Configurações de integração
  const createIntegrationConfig = useCallback(async (configData: Omit<IntegrationConfig, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      setError(null);
      const newConfig = await controller.createIntegrationConfig(configData);
      setIntegrationConfigs(prev => [...prev, newConfig]);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const updateIntegrationConfig = useCallback(async (id: string, configData: Partial<IntegrationConfig>) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedConfig = await controller.updateIntegrationConfig(id, configData);
      setIntegrationConfigs(prev => prev.map(c => c.id === id ? updatedConfig : c));
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const deleteIntegrationConfig = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await controller.deleteIntegrationConfig(id);
      setIntegrationConfigs(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const getIntegrationConfig = useCallback(async (id: string): Promise<IntegrationConfig> => {
    try {
      setIsLoading(true);
      setError(null);
      return await controller.getIntegrationConfig(id);
    } catch (error) {
      handleError(error as Error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const listIntegrationConfigs = useCallback(async (filters?: Partial<IntegrationConfig>) => {
    try {
      setIsLoading(true);
      setError(null);
      const configsList = await controller.listIntegrationConfigs(filters);
      setIntegrationConfigs(configsList);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  // Dados de integração
  const createIntegrationData = useCallback(async (data: Omit<IntegrationData, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      setError(null);
      const newData = await controller.createIntegrationData(data);
      setIntegrationData(prev => [...prev, newData]);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const updateIntegrationData = useCallback(async (id: string, data: Partial<IntegrationData>) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedData = await controller.updateIntegrationData(id, data);
      setIntegrationData(prev => prev.map(d => d.id === id ? updatedData : d));
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const deleteIntegrationData = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await controller.deleteIntegrationData(id);
      setIntegrationData(prev => prev.filter(d => d.id !== id));
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const getIntegrationData = useCallback(async (id: string): Promise<IntegrationData> => {
    try {
      setIsLoading(true);
      setError(null);
      return await controller.getIntegrationData(id);
    } catch (error) {
      handleError(error as Error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  const listIntegrationData = useCallback(async (filters?: Partial<IntegrationData>) => {
    try {
      setIsLoading(true);
      setError(null);
      const dataList = await controller.listIntegrationData(filters);
      setIntegrationData(dataList);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [controller, handleError]);

  return (
    <IntegrationsContext.Provider
      value={{
        credentials,
        integrationConfigs,
        integrationData,
        isLoading,
        error,
        createCredentials,
        updateCredentials,
        deleteCredentials,
        getCredentials,
        listCredentials,
        createIntegrationConfig,
        updateIntegrationConfig,
        deleteIntegrationConfig,
        getIntegrationConfig,
        listIntegrationConfigs,
        createIntegrationData,
        updateIntegrationData,
        deleteIntegrationData,
        getIntegrationData,
        listIntegrationData,
      }}
    >
      {children}
    </IntegrationsContext.Provider>
  );
};

export const useIntegrations = () => {
  const context = useContext(IntegrationsContext);
  if (!context) {
    throw new Error('useIntegrations deve ser usado dentro de um IntegrationsProvider');
  }
  return context;
}; 