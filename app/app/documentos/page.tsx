import { createClient } from '@/lib/supabase/server'

export default async function DocumentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: org } = user ? await supabase.from('organization_members').select('organization_id').eq('user_id', user.id).limit(1).single() : { data: null }
  const { data: docs } = org ? await supabase.from('contracts').select('id,title,document_type,client_name,created_at').eq('organization_id', org.organization_id).order('created_at', { ascending: false }).limit(50) : { data: [] }
  return <div className="mx-auto max-w-6xl"><h1 className="text-4xl font-bold">Documentos salvos</h1><p className="mt-3 text-muted">Só aparecem aqui os documentos marcados para salvar no histórico.</p><div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm border border-black/5"><table className="w-full text-left text-sm"><thead className="bg-cream"><tr><th className="p-4">Título</th><th className="p-4">Cliente</th><th className="p-4">Tipo</th><th className="p-4">Data</th></tr></thead><tbody>{docs?.map((d: any) => <tr key={d.id} className="border-t border-black/5"><td className="p-4 font-semibold">{d.title}</td><td className="p-4">{d.client_name}</td><td className="p-4">{d.document_type}</td><td className="p-4">{new Date(d.created_at).toLocaleDateString('pt-BR')}</td></tr>)}{!docs?.length && <tr><td colSpan={4} className="p-8 text-center text-muted">Nenhum documento salvo ainda.</td></tr>}</tbody></table></div></div>
}
