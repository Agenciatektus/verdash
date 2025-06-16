import { supabase } from './supabase';
import { cache } from './redis';

// Interface para estatísticas de performance
interface PerformanceStats {
  tables: {
    name: string;
    size: number;
    rows: number;
    indexes: number;
  }[];
  indexes: {
    name: string;
    size: number;
    scans: number;
    rows_read: number;
  }[];
  cache: {
    hit_ratio: number;
    size: number;
    keys: number;
  };
  connections: {
    active: number;
    idle: number;
    waiting: number;
  };
}

// Interface para queries lentas
interface SlowQuery {
  query: string;
  calls: number;
  total_time: number;
  mean_time: number;
  rows: number;
}

// Interface para locks
interface Lock {
  blocked_pid: number;
  blocked_user: string;
  blocked_query: string;
  blocking_pid: number;
  blocking_user: string;
  blocking_query: string;
}

// Serviço de monitoramento
export const monitor = {
  // Obter estatísticas de performance
  async getPerformanceStats(): Promise<PerformanceStats> {
    // Verificar cache
    const cached = await cache.get<PerformanceStats>('performance_stats');
    if (cached) return cached;

    // Obter estatísticas de tabelas
    const { data: tables, error: tablesError } = await supabase.rpc('get_table_stats');
    if (tablesError) throw tablesError;

    // Obter estatísticas de índices
    const { data: indexes, error: indexesError } = await supabase.rpc('get_index_stats');
    if (indexesError) throw indexesError;

    // Obter estatísticas de cache
    const { data: cacheStats, error: cacheError } = await supabase.rpc('get_cache_stats');
    if (cacheError) throw cacheError;

    // Obter estatísticas de conexões
    const { data: connections, error: connectionsError } = await supabase.rpc('get_connection_stats');
    if (connectionsError) throw connectionsError;

    // Montar resultado
    const stats: PerformanceStats = {
      tables,
      indexes,
      cache: cacheStats,
      connections,
    };

    // Salvar em cache por 5 minutos
    await cache.set('performance_stats', stats, 300);

    return stats;
  },

  // Obter queries lentas
  async getSlowQueries(limit: number = 10): Promise<SlowQuery[]> {
    // Verificar cache
    const cached = await cache.get<SlowQuery[]>(`slow_queries:${limit}`);
    if (cached) return cached;

    // Obter queries lentas
    const { data, error } = await supabase.rpc('get_slow_queries', { limit });
    if (error) throw error;

    // Salvar em cache por 1 minuto
    await cache.set(`slow_queries:${limit}`, data, 60);

    return data;
  },

  // Obter locks
  async getLocks(): Promise<Lock[]> {
    // Verificar cache
    const cached = await cache.get<Lock[]>('locks');
    if (cached) return cached;

    // Obter locks
    const { data, error } = await supabase.rpc('get_locks');
    if (error) throw error;

    // Salvar em cache por 30 segundos
    await cache.set('locks', data, 30);

    return data;
  },

  // Obter estatísticas de uso de recursos
  async getResourceUsage(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('resource_usage');
    if (cached) return cached;

    // Obter estatísticas de CPU
    const { data: cpu, error: cpuError } = await supabase.rpc('get_cpu_stats');
    if (cpuError) throw cpuError;

    // Obter estatísticas de memória
    const { data: memory, error: memoryError } = await supabase.rpc('get_memory_stats');
    if (memoryError) throw memoryError;

    // Obter estatísticas de disco
    const { data: disk, error: diskError } = await supabase.rpc('get_disk_stats');
    if (diskError) throw diskError;

    // Montar resultado
    const stats = {
      cpu,
      memory,
      disk,
    };

    // Salvar em cache por 1 minuto
    await cache.set('resource_usage', stats, 60);

    return stats;
  },

  // Obter estatísticas de erros
  async getErrorStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('error_stats');
    if (cached) return cached;

    // Obter estatísticas de erros
    const { data, error } = await supabase.rpc('get_error_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('error_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de API
  async getApiStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('api_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de API
    const { data, error } = await supabase.rpc('get_api_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('api_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de autenticação
  async getAuthStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('auth_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de autenticação
    const { data, error } = await supabase.rpc('get_auth_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('auth_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de storage
  async getStorageStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('storage_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de storage
    const { data, error } = await supabase.rpc('get_storage_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('storage_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de funções
  async getFunctionStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('function_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de funções
    const { data, error } = await supabase.rpc('get_function_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('function_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de webhooks
  async getWebhookStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('webhook_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de webhooks
    const { data, error } = await supabase.rpc('get_webhook_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('webhook_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de realtime
  async getRealtimeStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('realtime_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de realtime
    const { data, error } = await supabase.rpc('get_realtime_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('realtime_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de edge functions
  async getEdgeFunctionStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('edge_function_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de edge functions
    const { data, error } = await supabase.rpc('get_edge_function_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('edge_function_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de backups
  async getBackupStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('backup_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de backups
    const { data, error } = await supabase.rpc('get_backup_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('backup_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de logs
  async getLogStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('log_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de logs
    const { data, error } = await supabase.rpc('get_log_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('log_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de métricas
  async getMetricStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('metric_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de métricas
    const { data, error } = await supabase.rpc('get_metric_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('metric_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de alertas
  async getAlertStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('alert_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de alertas
    const { data, error } = await supabase.rpc('get_alert_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('alert_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de dashboards
  async getDashboardStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('dashboard_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de dashboards
    const { data, error } = await supabase.rpc('get_dashboard_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('dashboard_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de relatórios
  async getReportStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('report_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de relatórios
    const { data, error } = await supabase.rpc('get_report_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('report_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de exportações
  async getExportStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('export_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de exportações
    const { data, error } = await supabase.rpc('get_export_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('export_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de importações
  async getImportStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('import_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de importações
    const { data, error } = await supabase.rpc('get_import_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('import_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de integrações
  async getIntegrationStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('integration_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de integrações
    const { data, error } = await supabase.rpc('get_integration_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('integration_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de projetos
  async getProjectStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('project_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de projetos
    const { data, error } = await supabase.rpc('get_project_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('project_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de usuários
  async getUserStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('user_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de usuários
    const { data, error } = await supabase.rpc('get_user_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('user_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de equipes
  async getTeamStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('team_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de equipes
    const { data, error } = await supabase.rpc('get_team_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('team_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de organizações
  async getOrganizationStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('organization_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de organizações
    const { data, error } = await supabase.rpc('get_organization_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('organization_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de planos
  async getPlanStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('plan_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de planos
    const { data, error } = await supabase.rpc('get_plan_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('plan_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de assinaturas
  async getSubscriptionStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('subscription_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de assinaturas
    const { data, error } = await supabase.rpc('get_subscription_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('subscription_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de pagamentos
  async getPaymentStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('payment_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de pagamentos
    const { data, error } = await supabase.rpc('get_payment_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('payment_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de faturas
  async getInvoiceStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('invoice_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de faturas
    const { data, error } = await supabase.rpc('get_invoice_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('invoice_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de créditos
  async getCreditStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('credit_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de créditos
    const { data, error } = await supabase.rpc('get_credit_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('credit_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de descontos
  async getDiscountStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('discount_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de descontos
    const { data, error } = await supabase.rpc('get_discount_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('discount_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de cupons
  async getCouponStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('coupon_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de cupons
    const { data, error } = await supabase.rpc('get_coupon_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('coupon_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de taxas
  async getTaxStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('tax_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de taxas
    const { data, error } = await supabase.rpc('get_tax_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('tax_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de impostos
  async getTaxRateStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('tax_rate_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de impostos
    const { data, error } = await supabase.rpc('get_tax_rate_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('tax_rate_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de moedas
  async getCurrencyStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('currency_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de moedas
    const { data, error } = await supabase.rpc('get_currency_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('currency_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de países
  async getCountryStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('country_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de países
    const { data, error } = await supabase.rpc('get_country_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('country_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de estados
  async getStateStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('state_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de estados
    const { data, error } = await supabase.rpc('get_state_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('state_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de cidades
  async getCityStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('city_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de cidades
    const { data, error } = await supabase.rpc('get_city_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('city_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de endereços
  async getAddressStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('address_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de endereços
    const { data, error } = await supabase.rpc('get_address_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('address_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de telefones
  async getPhoneStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('phone_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de telefones
    const { data, error } = await supabase.rpc('get_phone_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('phone_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de emails
  async getEmailStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('email_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de emails
    const { data, error } = await supabase.rpc('get_email_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('email_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de websites
  async getWebsiteStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('website_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de websites
    const { data, error } = await supabase.rpc('get_website_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('website_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de redes sociais
  async getSocialMediaStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('social_media_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de redes sociais
    const { data, error } = await supabase.rpc('get_social_media_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('social_media_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de documentos
  async getDocumentStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('document_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de documentos
    const { data, error } = await supabase.rpc('get_document_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('document_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de arquivos
  async getFileStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('file_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de arquivos
    const { data, error } = await supabase.rpc('get_file_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('file_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de imagens
  async getImageStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('image_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de imagens
    const { data, error } = await supabase.rpc('get_image_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('image_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de vídeos
  async getVideoStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('video_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de vídeos
    const { data, error } = await supabase.rpc('get_video_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('video_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de áudios
  async getAudioStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('audio_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de áudios
    const { data, error } = await supabase.rpc('get_audio_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('audio_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de outros arquivos
  async getOtherFileStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('other_file_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de outros arquivos
    const { data, error } = await supabase.rpc('get_other_file_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('other_file_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de todos os arquivos
  async getAllFileStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('all_file_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de todos os arquivos
    const { data, error } = await supabase.rpc('get_all_file_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('all_file_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de todos os recursos
  async getAllResourceStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('all_resource_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de todos os recursos
    const { data, error } = await supabase.rpc('get_all_resource_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('all_resource_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de todos os serviços
  async getAllServiceStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('all_service_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de todos os serviços
    const { data, error } = await supabase.rpc('get_all_service_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('all_service_stats', data, 300);

    return data;
  },

  // Obter estatísticas de uso de todos os recursos e serviços
  async getAllStats(): Promise<any> {
    // Verificar cache
    const cached = await cache.get<any>('all_stats');
    if (cached) return cached;

    // Obter estatísticas de uso de todos os recursos e serviços
    const { data, error } = await supabase.rpc('get_all_stats');
    if (error) throw error;

    // Salvar em cache por 5 minutos
    await cache.set('all_stats', data, 300);

    return data;
  },
}; 