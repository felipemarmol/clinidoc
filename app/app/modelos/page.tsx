import { Camera, FileText, Layers, Plus } from 'lucide-react'

const modelos = [
  { title: 'Contrato de prestação de serviços odontológicos', desc: 'Objeto, pagamento, obrigações, consentimento, garantia, devolução de valores e foro.', icon: FileText, tag: 'Pronto' },
  { title: 'Termo de autorização de uso de imagem', desc: 'Autorização para uso institucional, educativo, redes sociais e portfólio profissional.', icon: Camera, tag: 'Pronto' },
  { title: 'Modelo livre', desc: 'Base para criar documentos personalizados com campos automáticos em versões futuras.', icon: Layers, tag: 'Em breve' }
]

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <span className="badge">Biblioteca</span>
      <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Modelos</h1>
          <p className="mt-3 max-w-2xl text-muted">Comece pelos modelos prontos e expanda a biblioteca conforme o produto evoluir.</p>
        </div>
        <a href="/app/novo" className="btn-primary flex w-max items-center gap-2"><Plus className="h-4 w-4" />Novo documento</a>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {modelos.map(({ title, desc, icon: Icon, tag }) => (
          <div key={title} className="card rounded-[2rem] p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cream"><Icon className="h-6 w-6 text-sage" /></div>
              <span className="rounded-full bg-cream px-3 py-1 text-xs font-black text-muted">{tag}</span>
            </div>
            <h2 className="text-xl font-black leading-7">{title}</h2>
            <p className="mt-3 min-h-[72px] text-sm leading-6 text-muted">{desc}</p>
            <a href="/app/novo" className="mt-5 inline-flex rounded-2xl bg-sage px-5 py-3 text-sm font-black text-white">Usar modelo</a>
          </div>
        ))}
      </div>
    </div>
  )
}
