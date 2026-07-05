'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/browser'

export function SettingsForm() {
  const supabase = createClient()
  const [orgId, setOrgId] = useState('')
  const [form, setForm] = useState({ name: '', cnpj: '', address: '', representative: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: member } = await supabase.from('organization_members').select('organization_id').eq('user_id', user.id).limit(1).single()
      if (!member) return
      setOrgId(member.organization_id)
      const { data: org } = await supabase.from('organizations').select('name,cnpj,address,representative').eq('id', member.organization_id).single()
      if (org) setForm({ name: org.name || '', cnpj: org.cnpj || '', address: org.address || '', representative: org.representative || '' })
    }
    load()
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    if (!orgId) return setMessage('Organização não encontrada. Veja o README para rodar a função de criação inicial.')
    const { error } = await supabase.from('organizations').update(form).eq('id', orgId)
    setMessage(error ? error.message : 'Configurações salvas.')
  }

  return <form onSubmit={save} className="mt-8 max-w-2xl rounded-3xl bg-white p-6 shadow-sm border border-black/5 space-y-4">{Object.entries({ name: 'Nome da clínica', cnpj: 'CNPJ', address: 'Endereço', representative: 'Representante' }).map(([key,label]) => <label key={key} className="block"><span className="text-sm font-semibold">{label}</span><input className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3" value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} /></label>)}{message && <p className="rounded-2xl bg-cream p-4 text-sm">{message}</p>}<button className="rounded-2xl bg-sage px-6 py-3 font-bold text-white">Salvar dados</button></form>
}
