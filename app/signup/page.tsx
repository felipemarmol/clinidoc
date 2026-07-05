import { AuthForm } from '@/components/AuthForm'
import { CheckCircle2 } from 'lucide-react'

export default function SignupPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_520px]">
      <section className="hidden p-8 lg:block">
        <div className="flex h-full flex-col justify-between rounded-[2.5rem] bg-sage p-10 text-white shadow-soft">
          <a href="/" className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-white font-black text-sage">CD</div><span className="text-xl font-black">ClinicDocs</span></a>
          <div>
            <span className="badge border-white/15 bg-white/12 text-white"><CheckCircle2 className="h-4 w-4" />Beta gratuito</span>
            <h1 className="mt-6 max-w-2xl text-5xl font-black leading-tight">Comece com contratos, termos e documentos prontos.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">Crie a conta, confirme o e-mail e já gere o primeiro documento.</p>
          </div>
          <p className="text-sm text-white/60">Preparado para plano gratuito e cobrança futura.</p>
        </div>
      </section>
      <section className="grid place-items-center px-6 py-12">
        <div className="w-full max-w-md">
          <a href="/" className="mx-auto mb-8 flex w-max items-center gap-3 lg:hidden"><div className="grid h-10 w-10 place-items-center rounded-2xl bg-sage font-black text-white">CD</div><span className="text-xl font-black">ClinicDocs</span></a>
          <p className="mb-3 text-center text-sm font-black text-sage">Cadastro gratuito</p>
          <h1 className="mb-8 text-center text-3xl font-black">Crie sua conta</h1>
          <AuthForm mode="signup" />
        </div>
      </section>
    </main>
  )
}
