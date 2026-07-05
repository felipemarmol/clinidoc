import { AuthForm } from '@/components/AuthForm'

export default function SignupPage() {
  return <main className="min-h-screen grid place-items-center px-6"><div className="w-full max-w-md"><p className="mb-4 text-center text-sm font-bold text-sage">ClinicDocs</p><h1 className="mb-8 text-center text-3xl font-bold">Comece grátis</h1><AuthForm mode="signup" /></div></main>
}
