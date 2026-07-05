'use client'

import { FilePlus, Files, LayoutTemplate, Settings, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/browser'

const items = [
  { href: '/app', label: 'Painel', icon: Files },
  { href: '/app/novo', label: 'Novo documento', icon: FilePlus },
  { href: '/app/modelos', label: 'Modelos', icon: LayoutTemplate },
  { href: '/app/documentos', label: 'Documentos', icon: Files },
  { href: '/app/configuracoes', label: 'Configurações', icon: Settings }
]

export function Sidebar() {
  async function signOut() {
    await createClient().auth.signOut()
    window.location.href = '/login'
  }
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-black/5 bg-white p-5 lg:block">
      <a href="/app" className="mb-8 flex items-center gap-3"><div className="h-10 w-10 rounded-2xl bg-sage" /><span className="text-xl font-bold">ClinicDocs</span></a>
      <nav className="space-y-2">
        {items.map(({ href, label, icon: Icon }) => <a key={href} href={href} className="flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-muted hover:bg-cream hover:text-ink"><Icon className="h-5 w-5" />{label}</a>)}
      </nav>
      <button onClick={signOut} className="absolute bottom-5 left-5 right-5 flex items-center justify-center gap-2 rounded-2xl bg-cream px-4 py-3 font-semibold text-ink"><LogOut className="h-4 w-4" />Sair</button>
    </aside>
  )
}
