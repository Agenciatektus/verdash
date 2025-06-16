import { Credentials, IntegrationConfig, IntegrationData, IIntegrationsModel } from './model';

export interface IIntegrationsController {
  // Credenciais
  createCredentials(credentialsData: Omit<Credentials, 'id' | 'createdAt' | 'updatedAt'>): Promise<Credentials>;
  updateCredentials(id: string, credentialsData: Partial<Credentials>): Promise<Credentials>;
  deleteCredentials(id: string): Promise<void>;
  getCredentials(id: string): Promise<Credentials>;
  listCredentials(filters?: Partial<Credentials>): Promise<Credentials[]>;

  // Configurações de integração
  createIntegrationConfig(configData: Omit<IntegrationConfig, 'id' | 'createdAt' | 'updatedAt'>): Promise<IntegrationConfig>;
  updateIntegrationConfig(id: string, configData: Partial<IntegrationConfig>): Promise<IntegrationConfig>;
  deleteIntegrationConfig(id: string): Promise<void>;
  getIntegrationConfig(id: string): Promise<IntegrationConfig>;
  listIntegrationConfigs(filters?: Partial<IntegrationConfig>): Promise<IntegrationConfig[]>;

  // Dados de integração
  createIntegrationData(data: Omit<IntegrationData, 'id' | 'createdAt' | 'updatedAt'>): Promise<IntegrationData>;
  updateIntegrationData(id: string, data: Partial<IntegrationData>): Promise<IntegrationData>;
  deleteIntegrationData(id: string): Promise<void>;
  getIntegrationData(id: string): Promise<IntegrationData>;
  listIntegrationData(filters?: Partial<IntegrationData>): Promise<IntegrationData[]>;
}

export class IntegrationsController implements IIntegrationsController {
  constructor(private model: IIntegrationsModel) {}

  // Credenciais
  async createCredentials(credentialsData: Omit<Credentials, 'id' | 'createdAt' | 'updatedAt'>): Promise<Credentials> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.createCredentials(credentialsData);
    } catch (error) {
      console.error('Erro ao criar credenciais:', error);
      throw new Error('Falha ao criar credenciais');
    }
  }

  async updateCredentials(id: string, credentialsData: Partial<Credentials>): Promise<Credentials> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.updateCredentials(id, credentialsData);
    } catch (error) {
      console.error('Erro ao atualizar credenciais:', error);
      throw new Error('Falha ao atualizar credenciais');
    }
  }

  async deleteCredentials(id: string): Promise<void> {
    try {
      await this.model.deleteCredentials(id);
    } catch (error) {
      console.error('Erro ao deletar credenciais:', error);
      throw new Error('Falha ao deletar credenciais');
    }
  }

  async getCredentials(id: string): Promise<Credentials> {
    try {
      return await this.model.getCredentials(id);
    } catch (error) {
      console.error('Erro ao buscar credenciais:', error);
      throw new Error('Falha ao buscar credenciais');
    }
  }

  async listCredentials(filters?: Partial<Credentials>): Promise<Credentials[]> {
    try {
      return await this.model.listCredentials(filters);
    } catch (error) {
      console.error('Erro ao listar credenciais:', error);
      throw new Error('Falha ao listar credenciais');
    }
  }

  // Configurações de integração
  async createIntegrationConfig(configData: Omit<IntegrationConfig, 'id' | 'createdAt' | 'updatedAt'>): Promise<IntegrationConfig> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.createIntegrationConfig(configData);
    } catch (error) {
      console.error('Erro ao criar configuração de integração:', error);
      throw new Error('Falha ao criar configuração de integração');
    }
  }

  async updateIntegrationConfig(id: string, configData: Partial<IntegrationConfig>): Promise<IntegrationConfig> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.updateIntegrationConfig(id, configData);
    } catch (error) {
      console.error('Erro ao atualizar configuração de integração:', error);
      throw new Error('Falha ao atualizar configuração de integração');
    }
  }

  async deleteIntegrationConfig(id: string): Promise<void> {
    try {
      await this.model.deleteIntegrationConfig(id);
    } catch (error) {
      console.error('Erro ao deletar configuração de integração:', error);
      throw new Error('Falha ao deletar configuração de integração');
    }
  }

  async getIntegrationConfig(id: string): Promise<IntegrationConfig> {
    try {
      return await this.model.getIntegrationConfig(id);
    } catch (error) {
      console.error('Erro ao buscar configuração de integração:', error);
      throw new Error('Falha ao buscar configuração de integração');
    }
  }

  async listIntegrationConfigs(filters?: Partial<IntegrationConfig>): Promise<IntegrationConfig[]> {
    try {
      return await this.model.listIntegrationConfigs(filters);
    } catch (error) {
      console.error('Erro ao listar configurações de integração:', error);
      throw new Error('Falha ao listar configurações de integração');
    }
  }

  // Dados de integração
  async createIntegrationData(data: Omit<IntegrationData, 'id' | 'createdAt' | 'updatedAt'>): Promise<IntegrationData> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.createIntegrationData(data);
    } catch (error) {
      console.error('Erro ao criar dados de integração:', error);
      throw new Error('Falha ao criar dados de integração');
    }
  }

  async updateIntegrationData(id: string, data: Partial<IntegrationData>): Promise<IntegrationData> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.updateIntegrationData(id, data);
    } catch (error) {
      console.error('Erro ao atualizar dados de integração:', error);
      throw new Error('Falha ao atualizar dados de integração');
    }
  }

  async deleteIntegrationData(id: string): Promise<void> {
    try {
      await this.model.deleteIntegrationData(id);
    } catch (error) {
      console.error('Erro ao deletar dados de integração:', error);
      throw new Error('Falha ao deletar dados de integração');
    }
  }

  async getIntegrationData(id: string): Promise<IntegrationData> {
    try {
      return await this.model.getIntegrationData(id);
    } catch (error) {
      console.error('Erro ao buscar dados de integração:', error);
      throw new Error('Falha ao buscar dados de integração');
    }
  }

  async listIntegrationData(filters?: Partial<IntegrationData>): Promise<IntegrationData[]> {
    try {
      return await this.model.listIntegrationData(filters);
    } catch (error) {
      console.error('Erro ao listar dados de integração:', error);
      throw new Error('Falha ao listar dados de integração');
    }
  }
} 