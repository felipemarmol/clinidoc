'use client'

import { useEffect, useState } from 'react'
import { Building2, CheckCircle2, Loader2, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase/browser'

export function SettingsForm() {
  const supabase = createClient()
  const [orgId, setOrgId] = useState('')
  const [form, setForm] = useState({ name: '', cnpj: '', address: '', representative: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }
      const { data: member } = await supabase.from('organization_members').select('organization_id').eq('user_id', user.id).limit(1).single()
      if (!member) { setLoading(false); return }
      setOrgId(member.organization_id)
      const { data: org } = await supabase.from('organizations').select('name,cnpj,address,representative').eq('id', member.organization_id).single()
      if (org) setForm({ name: org.name || '', cnpj: org.cnpj || '', address: org.address || '', representative: org.representative || '' })
      setLoading(false)
    }
    load()
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')
    if (!orgId) return setMessage('Organização não encontrada. Confirme se o schema do Supabase foi executado corretamente.')
    setSaving(true)
    const { error } = await supabase.from('organizations').update(form).eq('id', orgId)
    setSaving(false)
    setMessage(error ? error.message : 'Dados da clínica salvos com sucesso.')
  }

  const fields = [
    ['name', 'Nome da clínica', 'Ex: Clínica Odontológica Exemplo LTDA'],
    ['cnpj', 'CNPJ', '00.000.000/0001-00'],
    ['address', 'Endereço completo', 'Rua, número, sala, cidade/UF'],
    ['representative', 'Representante', 'Nome do responsável técnico ou representante']
  ]

  return (
    <form onSubmit={save} className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
      <section className="card rounded-[2rem] p-6 sm:p-8">
        {loading ? (
          <div className="flex items-center gap-3 text-muted"><Loader2 className="h-5 w-5 animate-spin" />Carregando dados...</div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {fields.map(([key, label, placeholder]) => (
              <label key={key} className={key === 'address' ? 'md:col-span-2' : ''}>
                <span className="mb-2 block text-sm font-black">{label}</span>
                <input className="input" placeholder={placeholder} value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
              </label>
            ))}
          </div>
        )}

        {message && (
          <p className="mt-5 flex items-center gap-2 rounded-2xl bg-cream p-4 text-sm font-semibold">
            <CheckCircle2 className="h-4 w-4 text-sage" />{message}
          </p>
        )}

        <button disabled={saving || loading} className="btn-primary mt-6 flex items-center gap-2 disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? 'Salvando...' : 'Salvar dados'}
        </button>
      </section>

      <aside className="card h-max rounded-[2rem] p-6">
        <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-cream"><Building2 className="h-6 w-6 text-sage" /></div>
        <h2 className="text-lg font-black">Por que preencher?</h2>
        <p className="mt-2 text-sm leading-6 text-muted">Esses dados serão usados automaticamente nos contratos e termos. Isso reduz erros e acelera a geração dos documentos.</p>
        <div className="mt-5 rounded-2xl bg-cream p-4 text-xs leading-5 text-muted">Dica: mantenha o endereço exatamente como deve aparecer no PDF.</div>
      </aside>
    </form>
  )
}
