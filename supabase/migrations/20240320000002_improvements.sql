-- Adicionar colunas user_id
ALTER TABLE credentials ADD COLUMN user_id UUID REFERENCES auth.users(id);
ALTER TABLE integration_configs ADD COLUMN user_id UUID REFERENCES auth.users(id);
ALTER TABLE projects ADD COLUMN user_id UUID REFERENCES auth.users(id);
ALTER TABLE metrics ADD COLUMN user_id UUID REFERENCES auth.users(id);
ALTER TABLE kpis ADD COLUMN user_id UUID REFERENCES auth.users(id);
ALTER TABLE dashboards ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Criar índices para user_id
CREATE INDEX idx_credentials_user_id ON credentials(user_id);
CREATE INDEX idx_integration_configs_user_id ON integration_configs(user_id);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_metrics_user_id ON metrics(user_id);
CREATE INDEX idx_kpis_user_id ON kpis(user_id);
CREATE INDEX idx_dashboards_user_id ON dashboards(user_id);

-- Adicionar chave estrangeira para integration_data
ALTER TABLE integration_data
ADD CONSTRAINT fk_integration_data_integration_id
FOREIGN KEY (integration_id)
REFERENCES integration_configs(id);

-- Criar função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar triggers para updated_at
CREATE TRIGGER update_credentials_updated_at
    BEFORE UPDATE ON credentials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_integration_configs_updated_at
    BEFORE UPDATE ON integration_configs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_integration_data_updated_at
    BEFORE UPDATE ON integration_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_metrics_updated_at
    BEFORE UPDATE ON metrics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_kpis_updated_at
    BEFORE UPDATE ON kpis
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dashboards_updated_at
    BEFORE UPDATE ON dashboards
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Adicionar constraints para status
ALTER TABLE integration_configs
ADD CONSTRAINT chk_integration_configs_status
CHECK (status IN ('active', 'inactive', 'error', 'syncing'));

ALTER TABLE projects
ADD CONSTRAINT chk_projects_status
CHECK (status IN ('active', 'inactive', 'archived'));

-- Remover políticas antigas
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON credentials;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON integration_configs;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON integration_data;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON projects;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON metrics;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON kpis;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON dashboards;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON operation_logs;

-- Criar políticas mais granulares
-- Credenciais
CREATE POLICY "Users can only access their own credentials" ON credentials
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can only insert their own credentials" ON credentials
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can only update their own credentials" ON credentials
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can only delete their own credentials" ON credentials
    FOR DELETE USING (auth.uid() = user_id);

-- Configurações de integração
CREATE POLICY "Users can only access their own integration configs" ON integration_configs
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can only insert their own integration configs" ON integration_configs
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can only update their own integration configs" ON integration_configs
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can only delete their own integration configs" ON integration_configs
    FOR DELETE USING (auth.uid() = user_id);

-- Dados de integração
CREATE POLICY "Users can only access their own integration data" ON integration_data
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM integration_configs
            WHERE integration_configs.id = integration_data.integration_id
            AND integration_configs.user_id = auth.uid()
        )
    );
CREATE POLICY "Users can only insert their own integration data" ON integration_data
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM integration_configs
            WHERE integration_configs.id = integration_data.integration_id
            AND integration_configs.user_id = auth.uid()
        )
    );
CREATE POLICY "Users can only update their own integration data" ON integration_data
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM integration_configs
            WHERE integration_configs.id = integration_data.integration_id
            AND integration_configs.user_id = auth.uid()
        )
    );
CREATE POLICY "Users can only delete their own integration data" ON integration_data
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM integration_configs
            WHERE integration_configs.id = integration_data.integration_id
            AND integration_configs.user_id = auth.uid()
        )
    );

-- Projetos
CREATE POLICY "Users can only access their own projects" ON projects
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can only insert their own projects" ON projects
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can only update their own projects" ON projects
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can only delete their own projects" ON projects
    FOR DELETE USING (auth.uid() = user_id);

-- Métricas
CREATE POLICY "Users can only access their own metrics" ON metrics
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can only insert their own metrics" ON metrics
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can only update their own metrics" ON metrics
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can only delete their own metrics" ON metrics
    FOR DELETE USING (auth.uid() = user_id);

-- KPIs
CREATE POLICY "Users can only access their own kpis" ON kpis
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can only insert their own kpis" ON kpis
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can only update their own kpis" ON kpis
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can only delete their own kpis" ON kpis
    FOR DELETE USING (auth.uid() = user_id);

-- Dashboards
CREATE POLICY "Users can only access their own dashboards" ON dashboards
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can only insert their own dashboards" ON dashboards
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can only update their own dashboards" ON dashboards
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can only delete their own dashboards" ON dashboards
    FOR DELETE USING (auth.uid() = user_id);

-- Logs de operação
CREATE POLICY "Users can only access their own operation logs" ON operation_logs
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can only insert their own operation logs" ON operation_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id); 