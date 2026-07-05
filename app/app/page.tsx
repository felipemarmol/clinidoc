import { createClient } from '@/lib/supabase/server'
import { ArrowRight, FilePlus, Files, LayoutTemplate, Settings, ShieldCheck } from 'lucide-react'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: member } = user ? await supabase.from('organization_members').select('organization_id').eq('user_id', user.id).limit(1).single() : { data: null }
  const { count } = member ? await supabase.from('contracts').select('*', { count: 'exact', head: true }).eq('organization_id', member.organization_id) : { count: 0 }

  const cards = [
    { title: 'Novo documento', desc: 'Preencha os dados e gere um PDF.', href: '/app/novo', icon: FilePlus, action: 'Gerar agora' },
    { title: 'Modelos disponíveis', desc: 'Contrato odontológico e termo de imagem.', href: '/app/modelos', icon: LayoutTemplate, action: 'Ver modelos' },
    { title: 'Dados da clínica', desc: 'Padronize CNPJ, endereço e representante.', href: '/app/configuracoes', icon: Settings, action: 'Configurar' }
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
        <div className="overflow-hidden rounded-[2.2rem] bg-ink p-7 text-white shadow-soft sm:p-9">
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/80">Beta gratuito</span>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">Bem-vindo ao ClinicDocs</h1>
          <p className="mt-4 max-w-2xl text-white/65">Gere contratos, termos e documentos odontológicos com uma experiência mais simples, bonita e padronizada.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/app/novo" className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-ink">Criar documento</a>
            <a href="/app/configuracoes" className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-black text-white">Configurar clínica</a>
          </div>
        </div>

        <div className="card rounded-[2.2rem] p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cream"><ShieldCheck className="h-5 w-5 text-sage" /></div>
            <div>
              <p className="text-sm font-black">Conta conectada</p>
              <p className="max-w-[240px] truncate text-sm text-muted">{user?.email}</p>
            </div>
          </div>
          <div className="rounded-3xl bg-cream p-5">
            <p className="text-sm font-bold text-muted">Documentos no histórico</p>
            <p className="mt-2 text-4xl font-black">{count ?? 0}</p>
            <p className="mt-2 text-xs leading-5 text-muted">Apenas documentos marcados para salvar aparecem aqui.</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {cards.map(({ title, desc, href, icon: Icon, action }) => (
          <a key={title} href={href} className="card group rounded-3xl p-6 transition hover:-translate-y-0.5 hover:shadow-soft">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cream"><Icon className="h-6 w-6 text-sage" /></div>
            <h2 className="text-xl font-black">{title}</h2>
            <p className="mt-2 min-h-[48px] text-sm leading-6 text-muted">{desc}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-sage">{action}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
          </a>
        ))}
      </section>
    </div>
  )
}
