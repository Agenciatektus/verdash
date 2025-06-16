# Configuração do Supabase

Este diretório contém os arquivos necessários para configurar o banco de dados Supabase para o projeto Verdash.

## Estrutura

- `migrations/`: Contém os arquivos de migração do banco de dados
  - `20240320000000_initial_schema.sql`: Schema inicial do banco de dados
  - `20240320000001_rls_policies.sql`: Políticas de segurança (RLS)

## Configuração

1. Crie uma conta no [Supabase](https://supabase.com) se ainda não tiver uma.

2. Crie um novo projeto no Supabase.

3. Copie a URL e a chave anônima do projeto nas configurações do projeto.

4. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   ```

5. Execute os scripts de migração no SQL Editor do Supabase na seguinte ordem:
   - Copie o conteúdo do arquivo `migrations/20240320000000_initial_schema.sql`
   - Cole no SQL Editor do Supabase
   - Execute o script
   - Copie o conteúdo do arquivo `migrations/20240320000001_rls_policies.sql`
   - Cole no SQL Editor do Supabase
   - Execute o script

## Estrutura do Banco de Dados

O banco de dados contém as seguintes tabelas:

- `credentials`: Armazena credenciais de integração
- `integration_configs`: Configurações de integração
- `integration_data`: Dados de integração
- `projects`: Projetos
- `metrics`: Métricas
- `kpis`: KPIs
- `dashboards`: Dashboards
- `operation_logs`: Logs de operações

Cada tabela possui:
- `id`: UUID gerado automaticamente
- `user_id`: UUID do usuário (referência para auth.users)
- `created_at`: Timestamp de criação
- `updated_at`: Timestamp de atualização
- `deleted_at`: Timestamp de exclusão (soft delete)

## Índices

Foram criados índices para otimizar as consultas mais comuns:
- Índices em `deleted_at` para todas as tabelas
- Índices em `user_id` para todas as tabelas
- Índice em `integration_id` na tabela `integration_data`
- Índice composto em `entity_type` e `entity_id` na tabela `operation_logs`

## Triggers

Foi criado um trigger para atualizar automaticamente o campo `updated_at` em todas as tabelas quando um registro é atualizado.

## Políticas de Segurança (RLS)

Todas as tabelas têm Row Level Security (RLS) habilitada com as seguintes políticas:

### Credenciais
- Usuários autenticados podem ver, criar, atualizar e excluir apenas suas próprias credenciais

### Configurações de Integração
- Usuários autenticados podem ver, criar, atualizar e excluir apenas suas próprias configurações

### Dados de Integração
- Usuários autenticados podem ver, criar, atualizar e excluir apenas dados de suas próprias integrações

### Projetos
- Usuários autenticados podem ver, criar, atualizar e excluir apenas seus próprios projetos

### Métricas
- Usuários autenticados podem ver, criar, atualizar e excluir apenas suas próprias métricas

### KPIs
- Usuários autenticados podem ver, criar, atualizar e excluir apenas seus próprios KPIs

### Dashboards
- Usuários autenticados podem ver, criar, atualizar e excluir apenas seus próprios dashboards

### Logs de Operação
- Usuários autenticados podem ver e criar apenas seus próprios logs

## Próximos Passos

1. Configure autenticação e autorização
2. Configure backups automáticos
3. Configure monitoramento e alertas
4. Implemente cache com Redis
5. Configure rate limiting
6. Implemente validação de dados
7. Configure logging e tracing 