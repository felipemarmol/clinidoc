# ClinicDocs SaaS MVP — UI/UX v2

Versão aprimorada do MVP SaaS para geração de contratos e termos odontológicos.

## O que mudou nesta versão

- Interface mais profissional e mais clara.
- Landing page redesenhada.
- Login e cadastro com layout dividido e mais premium.
- Sidebar com estado ativo e navegação mobile.
- Painel inicial com cards de ação e resumo de documentos.
- Gerador de documentos com cards de modelo, prévia A4, botão fixo de PDF e barra de preenchimento.
- Configurações da clínica com layout guiado.
- Histórico mais organizado, com tabela no desktop e cards no mobile.
- Ajuste para Tailwind/PostCSS atual usado pela Vercel.
- Substituição do `middleware.ts` por `proxy.ts`, conforme padrão atual do Next.js.

## Variáveis na Vercel

Configure em **Vercel → Project → Settings → Environment Variables**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA_ANON
```

Depois faça **Redeploy**.

## Supabase

Use o mesmo banco já criado. Não precisa rodar o schema novamente se as tabelas já existem.

## Deploy

Suba estes arquivos no mesmo repositório GitHub e a Vercel fará novo deploy automaticamente. Se não fizer, acesse:

**Vercel → Deployments → Redeploy**
