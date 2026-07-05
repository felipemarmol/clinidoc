import { AuthForm } from '@/components/AuthForm'
import { ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_520px]">
      <section className="hidden p-8 lg:block">
        <div className="flex h-full flex-col justify-between rounded-[2.5rem] bg-ink p-10 text-white shadow-soft">
          <a href="/" className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-sage font-black">CD</div><span className="text-xl font-black">ClinicDocs</span></a>
          <div>
            <span className="badge border-white/10 bg-white/10 text-white"><ShieldCheck className="h-4 w-4" />Área protegida</span>
            <h1 className="mt-6 max-w-2xl text-5xl font-black leading-tight">Entre para gerar documentos clínicos em poucos segundos.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/65">Modelos odontológicos, histórico opcional e dados organizados por clínica.</p>
          </div>
          <p className="text-sm text-white/45">Beta gratuito • ClinicDocs</p>
        </div>
      </section>
      <section className="grid place-items-center px-6 py-12">
        <div className="w-full max-w-md">
          <a href="/" className="mx-auto mb-8 flex w-max items-center gap-3 lg:hidden"><div className="grid h-10 w-10 place-items-center rounded-2xl bg-sage font-black text-white">CD</div><span className="text-xl font-black">ClinicDocs</span></a>
          <p className="mb-3 text-center text-sm font-black text-sage">Acessar painel</p>
          <h1 className="mb-8 text-center text-3xl font-black">Entrar na sua conta</h1>
          <AuthForm mode="login" />
        </div>
      </section>
    </main>
  )
}
