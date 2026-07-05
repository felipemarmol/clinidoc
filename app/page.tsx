import { ArrowRight, CheckCircle2, FileText, Lock, Sparkles, Wand2 } from 'lucide-react'

const features = [
  ['Login e dados separados', Lock, 'Cada conta acessa somente os próprios documentos.'],
  ['Modelos odontológicos', FileText, 'Contrato, termo de imagem e novos documentos.'],
  ['PDF em segundos', Sparkles, 'Prévia em A4 e impressão pelo navegador.']
]

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-sage text-sm font-black text-white">CD</div>
          <span className="text-xl font-black">ClinicDocs</span>
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          <a className="rounded-full px-4 py-2 text-sm font-black sm:px-5" href="/login">Entrar</a>
          <a className="rounded-full bg-ink px-4 py-2 text-sm font-black text-white sm:px-5" href="/signup">Começar grátis</a>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-10 lg:grid-cols-[1.05fr_.95fr] lg:pb-24 lg:pt-20">
        <div>
          <span className="badge"><CheckCircle2 className="h-4 w-4" />Beta gratuito para clínicas odontológicas</span>
          <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">Documentos clínicos bonitos, rápidos e organizados.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">Cadastre os dados da clínica, escolha um modelo, preencha os dados do paciente e gere contratos ou termos prontos para PDF.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a className="btn-primary flex items-center gap-2" href="/signup">Criar conta gratuita <ArrowRight className="h-4 w-4" /></a>
            <a className="btn-secondary" href="#recursos">Ver recursos</a>
          </div>
        </div>

        <div className="card rounded-[2.4rem] p-4 lg:p-5">
          <div className="rounded-[2rem] bg-cream p-5 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black text-sage">Novo documento</p>
                <h2 className="mt-1 text-2xl font-black">Contrato odontológico</h2>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black">A4/PDF</span>
            </div>
            <div className="space-y-3">
              {['Paciente: Ana Souza', 'CPF: ***.***.***-00', 'Procedimento: Lentes em resina', 'Valor total: R$ 4.500,00'].map((item) => <div key={item} className="rounded-2xl bg-white px-4 py-4 text-sm font-bold text-muted shadow-sm">{item}</div>)}
            </div>
            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-ink py-4 font-black text-white"><Wand2 className="h-4 w-4" />Gerar documento</button>
          </div>
        </div>
      </section>

      <section id="recursos" className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 pb-24 md:grid-cols-3">
        {features.map(([title, Icon, desc]: any) => (
          <div key={title} className="card rounded-3xl p-6">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cream"><Icon className="h-6 w-6 text-sage" /></div>
            <h3 className="text-lg font-black">{title}</h3>
            <p className="mt-2 leading-6 text-muted">{desc}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
