const modelos = [
  ['Contrato de prestação de serviços odontológicos', 'Baseado no contrato clínico com objeto, pagamento, obrigações, consentimento, garantia e foro.'],
  ['Termo de autorização de uso de imagem', 'Autorização simples para uso institucional, educativo e divulgação profissional.'],
  ['Modelo livre', 'Estrutura futura para contratos personalizados com campos automáticos.']
]
export default function TemplatesPage() {
  return <div className="mx-auto max-w-5xl"><h1 className="text-4xl font-bold">Modelos</h1><p className="mt-3 text-muted">Biblioteca inicial do MVP.</p><div className="mt-8 grid gap-5">{modelos.map(([title, desc]) => <div key={title} className="rounded-3xl bg-white p-6 shadow-sm border border-black/5"><h2 className="text-xl font-bold">{title}</h2><p className="mt-2 text-muted">{desc}</p><a href="/app/novo" className="mt-5 inline-block rounded-2xl bg-sage px-5 py-3 font-bold text-white">Usar modelo</a></div>)}</div></div>
}
