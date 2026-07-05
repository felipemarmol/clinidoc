'use client'

import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/browser'

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
    if (mode === 'signup') return setMessage('Conta criada. Confirme seu e-mail para ativar o acesso.')
    window.location.href = '/app'
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 rounded-[2rem] p-6 sm:p-8">
      <div>
        <label className="mb-2 block text-sm font-black">E-mail</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input className="input pl-12" type="email" placeholder="voce@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-black">Senha</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input className="input px-12" type={showPassword ? 'text' : 'password'} placeholder="Mínimo 8 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required />
          <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {message && <p className="rounded-2xl border border-black/5 bg-cream px-4 py-3 text-sm font-semibold text-ink">{message}</p>}

      <button disabled={loading} className="btn-primary flex w-full items-center justify-center gap-2 disabled:opacity-60">
        {loading ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta grátis'}
        {!loading && <ArrowRight className="h-4 w-4" />}
      </button>

      <p className="text-center text-sm text-muted">
        {mode === 'login' ? 'Ainda não tem conta?' : 'Já tem conta?'}{' '}
        <a className="font-black text-sage" href={mode === 'login' ? '/signup' : '/login'}>{mode === 'login' ? 'Criar conta gratuita' : 'Entrar'}</a>
      </p>
    </form>
  )
}
