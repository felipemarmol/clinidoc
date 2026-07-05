import { SettingsForm } from '@/components/SettingsForm'

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <span className="badge">Configurações</span>
      <h1 className="mt-4 text-4xl font-black tracking-tight">Dados da clínica</h1>
      <p className="mt-3 max-w-2xl text-muted">Salve os dados fixos uma vez para reutilizar em todos os documentos gerados.</p>
      <SettingsForm />
    </div>
  )
}
