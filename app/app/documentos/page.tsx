import { createClient } from '@/lib/supabase/server'
import { FileText, Search } from 'lucide-react'

export default async function DocumentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: org } = user ? await supabase.from('organization_members').select('organization_id').eq('user_id', user.id).limit(1).single() : { data: null }
  const { data: docs } = org ? await supabase.from('contracts').select('id,title,document_type,client_name,created_at').eq('organization_id', org.organization_id).order('created_at', { ascending: false }).limit(50) : { data: [] }

  return (
    <div className="mx-auto max-w-7xl">
      <span className="badge">Histórico</span>
      <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Documentos salvos</h1>
          <p className="mt-3 max-w-2xl text-muted">Apenas documentos marcados para salvar no histórico aparecem nesta tela.</p>
        </div>
        <a href="/app/novo" className="btn-primary w-max">Gerar novo</a>
      </div>

      <div className="mt-8 hidden overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-card md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream text-xs font-black uppercase tracking-wide text-muted">
            <tr><th className="p-5">Título</th><th className="p-5">Cliente</th><th className="p-5">Tipo</th><th className="p-5">Data</th></tr>
          </thead>
          <tbody>
            {docs?.map((d: any) => (
              <tr key={d.id} className="border-t border-black/5">
                <td className="p-5 font-black">{d.title}</td>
                <td className="p-5 text-muted">{d.client_name || '-'}</td>
                <td className="p-5"><span className="rounded-full bg-cream px-3 py-1 text-xs font-black text-muted">{d.document_type === 'imagem' ? 'Uso de imagem' : 'Contrato'}</span></td>
                <td className="p-5 text-muted">{new Date(d.created_at).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}
            {!docs?.length && <tr><td colSpan={4} className="p-10 text-center text-muted"><Search className="mx-auto mb-3 h-8 w-8" />Nenhum documento salvo ainda.</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-4 md:hidden">
        {docs?.map((d: any) => (
          <div key={d.id} className="card rounded-3xl p-5">
            <div className="mb-3 flex items-center gap-3"><FileText className="h-5 w-5 text-sage" /><span className="rounded-full bg-cream px-3 py-1 text-xs font-black text-muted">{d.document_type === 'imagem' ? 'Uso de imagem' : 'Contrato'}</span></div>
            <h2 className="font-black">{d.title}</h2>
            <p className="mt-2 text-sm text-muted">{d.client_name || 'Sem cliente'} • {new Date(d.created_at).toLocaleDateString('pt-BR')}</p>
          </div>
        ))}
        {!docs?.length && <div className="card rounded-3xl p-8 text-center text-muted">Nenhum documento salvo ainda.</div>}
      </div>
    </div>
  )
}
