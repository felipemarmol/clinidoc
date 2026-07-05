'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/browser'

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const redirectTo = `${window.location.origin}/app`
    const result = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } })

    setLoading(false)
    if (result.error) return setMessage(result.error.message)
    if (mode === 'signup') return setMessage('Conta criada. Confirme seu e-mail, se a confirmação estiver ativa no Supabase.')
    window.location.href = '/app'
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 shadow-soft border border-black/5 space-y-5">
      <div>
        <label className="text-sm font-semibold">E-mail</label>
        <input className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-sage/30" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label className="text-sm font-semibold">Senha</label>
        <input className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-sage/30" type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required />
      </div>
      {message && <p className="rounded-2xl bg-cream px-4 py-3 text-sm text-ink">{message}</p>}
      <button disabled={loading} className="w-full rounded-2xl bg-sage px-5 py-3 font-semibold text-white disabled:opacity-60">
        {loading ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta grátis'}
      </button>
      <p className="text-center text-sm text-muted">
        {mode === 'login' ? 'Ainda não tem conta?' : 'Já tem conta?'}{' '}
        <a className="font-semibold text-sage" href={mode === 'login' ? '/signup' : '/login'}>{mode === 'login' ? 'Criar conta' : 'Entrar'}</a>
      </p>
    </form>
  )
}
