import { createClient } from '@/lib/supabase/server'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return (
    <div className="mx-auto max-w-6xl">
      <div className="rounded-[2rem] bg-ink p-8 text-white shadow-soft">
        <p className="text-sm font-semibold text-white/60">Beta gratuito</p>
        <h1 className="mt-2 text-4xl font-bold">Bem-vindo ao ClinicDocs</h1>
        <p className="mt-4 max-w-2xl text-white/70">Gere contratos, termos e documentos odontológicos com dados padronizados. Conta conectada: {user?.email}</p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <a href="/app/novo" className="rounded-3xl bg-white p-6 shadow-sm border border-black/5"><h2 className="text-xl font-bold">Gerar documento</h2><p className="mt-2 text-sm text-muted">Escolha um modelo e preencha os campos variáveis.</p></a>
        <a href="/app/modelos" className="rounded-3xl bg-white p-6 shadow-sm border border-black/5"><h2 className="text-xl font-bold">Modelos</h2><p className="mt-2 text-sm text-muted">Contrato odontológico, termo de imagem e modelo livre.</p></a>
        <a href="/app/configuracoes" className="rounded-3xl bg-white p-6 shadow-sm border border-black/5"><h2 className="text-xl font-bold">Dados da clínica</h2><p className="mt-2 text-sm text-muted">Salve CNPJ, endereço, representante e logo.</p></a>
      </div>
    </div>
  )
}
