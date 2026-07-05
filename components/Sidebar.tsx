'use client'

import { usePathname } from 'next/navigation'
import { FilePlus, Files, LayoutTemplate, Settings, LogOut, Home, ShieldCheck } from 'lucide-react'
import { createClient } from '@/lib/supabase/browser'

const items = [
  { href: '/app', label: 'Painel', icon: Home },
  { href: '/app/novo', label: 'Novo', icon: FilePlus },
  { href: '/app/modelos', label: 'Modelos', icon: LayoutTemplate },
  { href: '/app/documentos', label: 'Histórico', icon: Files },
  { href: '/app/configuracoes', label: 'Clínica', icon: Settings }
]

export function Sidebar() {
  const pathname = usePathname()

  async function signOut() {
    await createClient().auth.signOut()
    window.location.href = '/login'
  }

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-black/5 bg-white/88 p-5 backdrop-blur-xl lg:block">
        <a href="/app" className="mb-7 flex items-center gap-3 rounded-3xl bg-cream p-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-sage text-sm font-black text-white">CD</div>
          <div>
            <p className="text-lg font-black leading-5">ClinicDocs</p>
            <p className="text-xs font-semibold text-muted">Beta gratuito</p>
          </div>
        </a>

        <nav className="space-y-1.5">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <a
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${active ? 'bg-sage text-white shadow-card' : 'text-muted hover:bg-cream hover:text-ink'}`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </a>
            )
          })}
        </nav>

        <div className="absolute bottom-5 left-5 right-5 space-y-3">
          <div className="rounded-3xl border border-black/5 bg-cream p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-black text-sage"><ShieldCheck className="h-4 w-4" /> Segurança ativa</div>
            <p className="text-xs leading-5 text-muted">Dados separados por conta e organização no Supabase.</p>
          </div>
          <button onClick={signOut} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3 text-sm font-bold text-white">
            <LogOut className="h-4 w-4" />Sair
          </button>
        </div>
      </aside>

      <div className="fixed bottom-3 left-3 right-3 z-40 rounded-[1.4rem] border border-black/10 bg-white/92 p-2 shadow-soft backdrop-blur-xl lg:hidden no-print">
        <nav className="grid grid-cols-5 gap-1">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <a key={href} href={href} className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-bold ${active ? 'bg-sage text-white' : 'text-muted'}`}>
                <Icon className="h-4 w-4" />{label}
              </a>
            )
          })}
        </nav>
      </div>
    </>
  )
}
