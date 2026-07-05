import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ClinicDocs - Gerador de documentos clínicos',
  description: 'SaaS simples e seguro para gerar contratos e termos odontológicos.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
