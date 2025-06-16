import { createClient } from '@supabase/supabase-js';

// Tipos para as tabelas do Supabase
export type Database = {
  public: {
    Tables: {
      credentials: {
        Row: {
          id: string;
          name: string;
          type: string;
          data: any;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['credentials']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['credentials']['Insert']>;
      };
      integration_configs: {
        Row: {
          id: string;
          name: string;
          type: string;
          status: string;
          last_sync: string | null;
          record_count: number;
          config: any;
          fields: any[];
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['integration_configs']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['integration_configs']['Insert']>;
      };
      integration_data: {
        Row: {
          id: string;
          integration_id: string;
          data: any;
          timestamp: string;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['integration_data']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['integration_data']['Insert']>;
      };
      projects: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          status: string;
          config: any;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      metrics: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          formula: string;
          type: string;
          category: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['metrics']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['metrics']['Insert']>;
      };
      kpis: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          formula: string;
          type: string;
          category: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['kpis']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['kpis']['Insert']>;
      };
      dashboards: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          layout: any;
          config: any;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['dashboards']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['dashboards']['Insert']>;
      };
      operation_logs: {
        Row: {
          id: string;
          entity_type: string;
          entity_id: string;
          operation: string;
          data: any;
          user_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['operation_logs']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['operation_logs']['Insert']>;
      };
    };
  };
};

// Cliente Supabase singleton
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL e Anon Key são necessários');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public',
  },
}); 