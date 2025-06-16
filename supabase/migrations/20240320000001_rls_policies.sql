-- Enable Row Level Security
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE operation_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for credentials
CREATE POLICY "Usuários autenticados podem ver suas próprias credenciais"
    ON credentials FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem criar suas próprias credenciais"
    ON credentials FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem atualizar suas próprias credenciais"
    ON credentials FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem excluir suas próprias credenciais"
    ON credentials FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Create policies for integration_configs
CREATE POLICY "Usuários autenticados podem ver suas próprias configurações"
    ON integration_configs FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem criar suas próprias configurações"
    ON integration_configs FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem atualizar suas próprias configurações"
    ON integration_configs FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem excluir suas próprias configurações"
    ON integration_configs FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Create policies for integration_data
CREATE POLICY "Usuários autenticados podem ver seus próprios dados"
    ON integration_data FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM integration_configs
            WHERE integration_configs.id = integration_data.integration_id
            AND integration_configs.user_id = auth.uid()
        )
    );

CREATE POLICY "Usuários autenticados podem criar seus próprios dados"
    ON integration_data FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM integration_configs
            WHERE integration_configs.id = integration_data.integration_id
            AND integration_configs.user_id = auth.uid()
        )
    );

CREATE POLICY "Usuários autenticados podem atualizar seus próprios dados"
    ON integration_data FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM integration_configs
            WHERE integration_configs.id = integration_data.integration_id
            AND integration_configs.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM integration_configs
            WHERE integration_configs.id = integration_data.integration_id
            AND integration_configs.user_id = auth.uid()
        )
    );

CREATE POLICY "Usuários autenticados podem excluir seus próprios dados"
    ON integration_data FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM integration_configs
            WHERE integration_configs.id = integration_data.integration_id
            AND integration_configs.user_id = auth.uid()
        )
    );

-- Create policies for projects
CREATE POLICY "Usuários autenticados podem ver seus próprios projetos"
    ON projects FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem criar seus próprios projetos"
    ON projects FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem atualizar seus próprios projetos"
    ON projects FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem excluir seus próprios projetos"
    ON projects FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Create policies for metrics
CREATE POLICY "Usuários autenticados podem ver suas próprias métricas"
    ON metrics FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem criar suas próprias métricas"
    ON metrics FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem atualizar suas próprias métricas"
    ON metrics FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem excluir suas próprias métricas"
    ON metrics FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Create policies for kpis
CREATE POLICY "Usuários autenticados podem ver seus próprios KPIs"
    ON kpis FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem criar seus próprios KPIs"
    ON kpis FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem atualizar seus próprios KPIs"
    ON kpis FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem excluir seus próprios KPIs"
    ON kpis FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Create policies for dashboards
CREATE POLICY "Usuários autenticados podem ver seus próprios dashboards"
    ON dashboards FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem criar seus próprios dashboards"
    ON dashboards FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem atualizar seus próprios dashboards"
    ON dashboards FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem excluir seus próprios dashboards"
    ON dashboards FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Create policies for operation_logs
CREATE POLICY "Usuários autenticados podem ver seus próprios logs"
    ON operation_logs FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem criar seus próprios logs"
    ON operation_logs FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Add user_id column to tables that don't have it
ALTER TABLE credentials ADD COLUMN user_id UUID REFERENCES auth.users(id);
ALTER TABLE integration_configs ADD COLUMN user_id UUID REFERENCES auth.users(id);
ALTER TABLE projects ADD COLUMN user_id UUID REFERENCES auth.users(id);
ALTER TABLE metrics ADD COLUMN user_id UUID REFERENCES auth.users(id);
ALTER TABLE kpis ADD COLUMN user_id UUID REFERENCES auth.users(id);
ALTER TABLE dashboards ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Create indexes for user_id
CREATE INDEX idx_credentials_user_id ON credentials(user_id);
CREATE INDEX idx_integration_configs_user_id ON integration_configs(user_id);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_metrics_user_id ON metrics(user_id);
CREATE INDEX idx_kpis_user_id ON kpis(user_id);
CREATE INDEX idx_dashboards_user_id ON dashboards(user_id); 