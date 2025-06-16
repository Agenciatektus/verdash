import { supabase } from './supabase';

export interface LogEntry {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: Record<string, any>;
  created_at: string;
}

export const logger = {
  async log(
    userId: string,
    action: string,
    entityType: string,
    entityId: string,
    details: Record<string, any> = {}
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('operation_logs')
        .insert({
          user_id: userId,
          action,
          entity_type: entityType,
          entity_id: entityId,
          details,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Erro ao registrar log:', error);
      // Não lançamos o erro para não interromper o fluxo principal
    }
  },

  async getLogs(
    filters: {
      userId?: string;
      action?: string;
      entityType?: string;
      entityId?: string;
      startDate?: Date;
      endDate?: Date;
    } = {},
    limit = 100,
    offset = 0
  ): Promise<LogEntry[]> {
    try {
      let query = supabase
        .from('operation_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (filters.userId) {
        query = query.eq('user_id', filters.userId);
      }
      if (filters.action) {
        query = query.eq('action', filters.action);
      }
      if (filters.entityType) {
        query = query.eq('entity_type', filters.entityType);
      }
      if (filters.entityId) {
        query = query.eq('entity_id', filters.entityId);
      }
      if (filters.startDate) {
        query = query.gte('created_at', filters.startDate.toISOString());
      }
      if (filters.endDate) {
        query = query.lte('created_at', filters.endDate.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
      return [];
    }
  },

  async getRecentLogs(limit = 10): Promise<LogEntry[]> {
    try {
      const { data, error } = await supabase
        .from('operation_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar logs recentes:', error);
      return [];
    }
  },
}; 