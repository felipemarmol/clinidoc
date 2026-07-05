import { ShieldCheck, FileText, Sparkles, Clock } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-2xl bg-sage" /><span className="text-xl font-bold">ClinicDocs</span></div>
        <div className="flex items-center gap-3"><a className="rounded-full px-5 py-2 font-semibold" href="/login">Entrar</a><a className="rounded-full bg-ink px-5 py-2 font-semibold text-white" href="/signup">Começar grátis</a></div>
      </nav>
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-sage shadow-sm">Beta gratuito para clínicas odontológicas</span>
          <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight lg:text-7xl">Contratos e termos clínicos em poucos segundos.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">Cadastre os dados da clínica, escolha um modelo, preencha os dados do paciente e gere um documento bonito, padronizado e pronto para PDF.</p>
          <div className="mt-9 flex flex-wrap gap-4"><a className="rounded-2xl bg-sage px-7 py-4 font-bold text-white shadow-soft" href="/signup">Criar conta gratuita</a><a className="rounded-2xl bg-white px-7 py-4 font-bold text-ink shadow-sm" href="#seguranca">Ver segurança</a></div>
        </div>
        <div className="rounded-[2rem] bg-white p-5 shadow-soft border border-black/5">
          <div className="rounded-[1.5rem] bg-cream p-6">
            <div className="mb-5 flex items-center justify-between"><div><p className="text-sm font-semibold text-sage">Novo documento</p><h2 className="text-2xl font-bold">Contrato odontológico</h2></div><span className="rounded-full bg-white px-3 py-1 text-xs font-bold">PDF</span></div>
            <div className="space-y-3">
              {['Nome do paciente', 'CPF', 'Procedimento', 'Valor total', 'Forma de pagamento'].map((item) => <div key={item} className="rounded-2xl bg-white px-4 py-4 text-sm text-muted">{item}</div>)}
            </div>
            <button className="mt-5 w-full rounded-2xl bg-ink py-4 font-bold text-white">Gerar contrato</button>
          </div>
        </div>
      </section>
      <section id="seguranca" className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 pb-24 md:grid-cols-4">
        {[['Login seguro', ShieldCheck], ['Modelos prontos', FileText], ['PDF organizado', Sparkles], ['Histórico opcional', Clock]].map(([title, Icon]: any) => (
          <div key={title} className="rounded-3xl bg-white p-6 shadow-sm border border-black/5"><Icon className="mb-4 h-7 w-7 text-sage" /><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">Base preparada para separar os dados por usuário e clínica, com permissões no banco.</p></div>
        ))}
      </section>
    </main>
  )
}
