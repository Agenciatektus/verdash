import { supabase } from './supabase';
import { logger } from './logger';

interface BackupConfig {
  retentionDays: number;
  schedule: string;
}

export const backup = {
  async createBackup(): Promise<void> {
    try {
      // Obtém a URL do banco de dados do Supabase
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (!supabaseUrl) {
        throw new Error('URL do Supabase não configurada');
      }

      // Gera um nome único para o backup
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupName = `backup-${timestamp}`;

      // Executa o backup usando o Supabase
      const { error } = await supabase.rpc('create_backup', {
        backup_name: backupName
      });

      if (error) throw error;

      // Registra o backup no log
      await logger.log(
        'system',
        'backup_created',
        'backup',
        backupName,
        { timestamp }
      );
    } catch (error) {
      console.error('Erro ao criar backup:', error);
      throw error;
    }
  },

  async listBackups(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('backups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao listar backups:', error);
      return [];
    }
  },

  async deleteOldBackups(config: BackupConfig): Promise<void> {
    try {
      const { data: backups, error } = await supabase
        .from('backups')
        .select('*')
        .lt('created_at', new Date(Date.now() - config.retentionDays * 24 * 60 * 60 * 1000).toISOString());

      if (error) throw error;

      for (const backup of backups || []) {
        await this.deleteBackup(backup.id);
      }
    } catch (error) {
      console.error('Erro ao deletar backups antigos:', error);
      throw error;
    }
  },

  async deleteBackup(backupId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('backups')
        .delete()
        .eq('id', backupId);

      if (error) throw error;

      await logger.log(
        'system',
        'backup_deleted',
        'backup',
        backupId
      );
    } catch (error) {
      console.error('Erro ao deletar backup:', error);
      throw error;
    }
  },

  async restoreBackup(backupId: string): Promise<void> {
    try {
      const { error } = await supabase.rpc('restore_backup', {
        backup_id: backupId
      });

      if (error) throw error;

      await logger.log(
        'system',
        'backup_restored',
        'backup',
        backupId
      );
    } catch (error) {
      console.error('Erro ao restaurar backup:', error);
      throw error;
    }
  }
}; 