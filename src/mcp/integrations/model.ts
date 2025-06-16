import { z } from 'zod';
import { supabase } from '@/lib/supabase';

// Schema para credenciais
export const CredentialsSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  data: z.record(z.any()),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
});

export type Credentials = z.infer<typeof CredentialsSchema>;

// Schema para configurações de integração
export const IntegrationConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  status: z.string(),
  last_sync: z.string().nullable(),
  record_count: z.number(),
  config: z.record(z.any()),
  fields: z.array(z.any()),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
});

export type IntegrationConfig = z.infer<typeof IntegrationConfigSchema>;

// Schema para dados de integração
export const IntegrationDataSchema = z.object({
  id: z.string(),
  integration_id: z.string(),
  data: z.record(z.any()),
  timestamp: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
});

export type IntegrationData = z.infer<typeof IntegrationDataSchema>;

// Interface para o modelo de integrações
export interface IIntegrationsModel {
  // Credenciais
  createCredentials(credentialsData: Omit<Credentials, 'id' | 'created_at' | 'updated_at'>): Promise<Credentials>;
  updateCredentials(id: string, credentialsData: Partial<Credentials>): Promise<Credentials>;
  deleteCredentials(id: string): Promise<void>;
  getCredentials(id: string): Promise<Credentials>;
  listCredentials(filters?: Partial<Credentials>): Promise<Credentials[]>;

  // Configurações de integração
  createIntegrationConfig(configData: Omit<IntegrationConfig, 'id' | 'created_at' | 'updated_at'>): Promise<IntegrationConfig>;
  updateIntegrationConfig(id: string, configData: Partial<IntegrationConfig>): Promise<IntegrationConfig>;
  deleteIntegrationConfig(id: string): Promise<void>;
  getIntegrationConfig(id: string): Promise<IntegrationConfig>;
  listIntegrationConfigs(filters?: Partial<IntegrationConfig>): Promise<IntegrationConfig[]>;

  // Dados de integração
  createIntegrationData(data: Omit<IntegrationData, 'id' | 'created_at' | 'updated_at'>): Promise<IntegrationData>;
  updateIntegrationData(id: string, data: Partial<IntegrationData>): Promise<IntegrationData>;
  deleteIntegrationData(id: string): Promise<void>;
  getIntegrationData(id: string): Promise<IntegrationData>;
  listIntegrationData(filters?: Partial<IntegrationData>): Promise<IntegrationData[]>;
}

// Implementação do modelo de integrações
export class IntegrationsModel implements IIntegrationsModel {
  // Credenciais
  async createCredentials(credentialsData: Omit<Credentials, 'id' | 'created_at' | 'updated_at'>): Promise<Credentials> {
    const { data, error } = await supabase
      .from('credentials')
      .insert(credentialsData)
      .select()
      .single();

    if (error) throw error;
    return CredentialsSchema.parse(data);
  }

  async updateCredentials(id: string, credentialsData: Partial<Credentials>): Promise<Credentials> {
    const { data, error } = await supabase
      .from('credentials')
      .update(credentialsData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return CredentialsSchema.parse(data);
  }

  async deleteCredentials(id: string): Promise<void> {
    const { error } = await supabase
      .from('credentials')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
  }

  async getCredentials(id: string): Promise<Credentials> {
    const { data, error } = await supabase
      .from('credentials')
      .select()
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return CredentialsSchema.parse(data);
  }

  async listCredentials(filters?: Partial<Credentials>): Promise<Credentials[]> {
    let query = supabase
      .from('credentials')
      .select()
      .is('deleted_at', null);

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data.map(c => CredentialsSchema.parse(c));
  }

  // Configurações de integração
  async createIntegrationConfig(configData: Omit<IntegrationConfig, 'id' | 'created_at' | 'updated_at'>): Promise<IntegrationConfig> {
    const { data, error } = await supabase
      .from('integration_configs')
      .insert(configData)
      .select()
      .single();

    if (error) throw error;
    return IntegrationConfigSchema.parse(data);
  }

  async updateIntegrationConfig(id: string, configData: Partial<IntegrationConfig>): Promise<IntegrationConfig> {
    const { data, error } = await supabase
      .from('integration_configs')
      .update(configData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return IntegrationConfigSchema.parse(data);
  }

  async deleteIntegrationConfig(id: string): Promise<void> {
    const { error } = await supabase
      .from('integration_configs')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
  }

  async getIntegrationConfig(id: string): Promise<IntegrationConfig> {
    const { data, error } = await supabase
      .from('integration_configs')
      .select()
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return IntegrationConfigSchema.parse(data);
  }

  async listIntegrationConfigs(filters?: Partial<IntegrationConfig>): Promise<IntegrationConfig[]> {
    let query = supabase
      .from('integration_configs')
      .select()
      .is('deleted_at', null);

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data.map(c => IntegrationConfigSchema.parse(c));
  }

  // Dados de integração
  async createIntegrationData(data: Omit<IntegrationData, 'id' | 'created_at' | 'updated_at'>): Promise<IntegrationData> {
    const { data: newData, error } = await supabase
      .from('integration_data')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return IntegrationDataSchema.parse(newData);
  }

  async updateIntegrationData(id: string, data: Partial<IntegrationData>): Promise<IntegrationData> {
    const { data: updatedData, error } = await supabase
      .from('integration_data')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return IntegrationDataSchema.parse(updatedData);
  }

  async deleteIntegrationData(id: string): Promise<void> {
    const { error } = await supabase
      .from('integration_data')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
  }

  async getIntegrationData(id: string): Promise<IntegrationData> {
    const { data, error } = await supabase
      .from('integration_data')
      .select()
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return IntegrationDataSchema.parse(data);
  }

  async listIntegrationData(filters?: Partial<IntegrationData>): Promise<IntegrationData[]> {
    let query = supabase
      .from('integration_data')
      .select()
      .is('deleted_at', null);

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data.map(d => IntegrationDataSchema.parse(d));
  }
} 