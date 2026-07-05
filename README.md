# ClinicDocs SaaS MVP

SaaS inicial para geração de contratos e termos odontológicos, com visual moderno, login, separação por organização, histórico opcional e base de segurança com Supabase RLS.

## O que já vem pronto

- Landing page bonita
- Login e cadastro com Supabase Auth
- Área protegida `/app`
- Gerador de contrato odontológico
- Gerador de termo de uso de imagem
- Geração de PDF pelo navegador
- Opção de salvar ou não salvar documento no histórico
- Página de modelos
- Página de documentos salvos
- Página de configurações da clínica
- Schema SQL com tabelas, trigger de organização inicial e Row Level Security

## Como rodar localmente

1. Crie um projeto no Supabase.
2. No Supabase, abra **SQL Editor** e execute `supabase/schema.sql`.
3. Copie `.env.example` para `.env.local`.
4. Preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_ANON_KEY
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. Instale dependências e rode:

```bash
npm install
npm run dev
```

6. Acesse `http://localhost:3000`.

## Segurança do MVP

- Cada usuário entra por Supabase Auth.
- Cada conta recebe uma organização automaticamente.
- As tabelas usam `organization_id`.
- As políticas RLS impedem um usuário de acessar dados de outra organização.
- O PDF é gerado no navegador.
- O contrato só é salvo no banco quando o usuário marca “Salvar no histórico”.
- O CPF salvo no histórico é mascarado; o conteúdo completo só fica no banco se o usuário optar por salvar.

## Próximos passos recomendados

- Criar editor visual de modelos personalizados.
- Adicionar limites mensais por plano.
- Integrar cobrança com Mercado Pago, Asaas ou Stripe.
- Criar tela de exclusão de conta e dados.
- Criar política de privacidade e termos de uso próprios.
- Adicionar logs de geração/edição/exclusão.
- Adicionar assinatura digital via provedor externo.

## Observação jurídica

Os modelos são uma base operacional. Antes de vender como SaaS, valide os contratos, termos de uso e política de privacidade com advogado familiarizado com LGPD e documentos da área da saúde.
