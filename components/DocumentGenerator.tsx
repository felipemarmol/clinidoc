'use client'

import { useEffect, useMemo, useState } from 'react'
import { Camera, CheckCircle2, FileText, Loader2, Printer, Save, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/browser'

type FormData = Record<string, string>
type DocType = 'odontologico' | 'imagem'

const defaults: FormData = {
  clinic_name: 'Dra. Nathielly Leite Odontologia LTDA',
  clinic_cnpj: '59.396.049/0001-58',
  clinic_address: 'Alameda Rolf Colin, 138 - Sala 603 - Joinville/SC',
  representative: 'Dra. Nathielly Leite da Silva',
  patient_name: '',
  patient_cpf: '',
  patient_address: '',
  procedure: 'Lentes superiores e inferiores',
  total_value: '',
  payment_terms: 'Conforme previamente combinado entre as partes',
  city: 'Joinville/SC',
  date: new Date().toLocaleDateString('pt-BR')
}

function money(value: string) {
  const digits = value.replace(/\D/g, '')
  if (!digits) return 'R$ 0,00'
  const n = Number(digits) / 100
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function header(data: FormData) {
  return `<div class="doc-header"><strong>${data.clinic_name}</strong><br/>${data.clinic_cnpj} • ${data.clinic_address}</div>`
}

function odontologico(data: FormData) {
  const valor = money(data.total_value)
  return `${header(data)}
    <h1>CONTRATO DE PRESTAÇÃO DE SERVIÇOS ODONTOLÓGICOS</h1>
    <p><strong>Contratada:</strong> ${data.clinic_name}, inscrita no CNPJ nº ${data.clinic_cnpj}, com sede em ${data.clinic_address}, neste ato representada por ${data.representative}, doravante denominada <strong>CONTRATADA</strong>.</p>
    <p><strong>Contratante:</strong> ${data.patient_name || '________________________________'}, inscrito(a) no CPF nº ${data.patient_cpf || '________________'}, residente e domiciliado(a) em ${data.patient_address || '________________________________'}, doravante denominado(a) <strong>CONTRATANTE</strong>.</p>
    <p>As partes acima identificadas têm, entre si, justo e acordado o presente Contrato de Prestação de Serviços Odontológicos, que se regerá pelas cláusulas e condições seguintes:</p>
    <h2>CLÁUSULA 1ª – DO OBJETO</h2>
    <p>Por meio deste instrumento, a CONTRATADA obriga-se a prestar os serviços odontológicos abaixo discriminados ao(à) CONTRATANTE, de acordo com planejamento odontológico baseado em informações clínicas e embasamento científico.</p>
    <p><strong>Procedimento:</strong> ${data.procedure}</p>
    <p><strong>Valor total do serviço:</strong> ${valor}</p>
    <h2>CLÁUSULA 2ª – DO PREÇO E FORMA DE PAGAMENTO</h2>
    <p>2.1. O valor total do serviço é de ${valor}. A forma de pagamento será: ${data.payment_terms}.</p>
    <p>2.2. Caso o(a) CONTRATANTE desista do tratamento antes do início dos procedimentos clínicos, serão devidos apenas os valores referentes a avaliações, consultas, planejamento, exames, registros fotográficos, materiais personalizados ou outros serviços eventualmente já realizados.</p>
    <p>2.3. Caso a desistência ocorra após o início do tratamento, o(a) CONTRATANTE será responsável pelo pagamento dos procedimentos já executados, consultas realizadas, materiais utilizados, etapas clínicas concluídas e demais custos diretamente relacionados ao tratamento até a data da rescisão.</p>
    <p>2.4. Em caso de rescisão injustificada após o início do tratamento, poderá incidir multa de 10% sobre o saldo remanescente, desde que proporcional e observados os serviços já prestados.</p>
    <h2>CLÁUSULA 3ª – OBRIGAÇÕES DO(A) CONTRATANTE</h2>
    <p>3.1. Comparecer a todas as consultas e retornos agendados. A ausência sem justificativa com 24h de antecedência poderá caracterizar abandono de tratamento, sendo devidos os valores contratados na íntegra.</p>
    <p>3.2. Comunicar imediatamente qualquer efeito adverso ocorrido, entrando em contato com a CONTRATADA para avaliação e eventual conduta clínica.</p>
    <p>3.3. Seguir todas as orientações de pós-procedimento e realizar as manutenções indicadas.</p>
    <p>3.4. Autoriza, quando necessário e previamente explicado, o desgaste dentário para melhor resultado, ciente de que pode ser permanente e irreversível.</p>
    <h2>CLÁUSULA 4ª – OBRIGAÇÕES DA CONTRATADA</h2>
    <p>4.1. Realizar avaliação clínica e planejamento odontológico individualizado.</p>
    <p>4.2. Informar ao(à) CONTRATANTE, de forma clara, sobre procedimento, benefícios, limitações, riscos, alternativas, cuidados necessários e possibilidade de ajustes.</p>
    <p>4.3. Empregar recursos técnicos, materiais e conhecimentos profissionais disponíveis e adequados à realização do tratamento.</p>
    <p>4.4. Registrar em prontuário as informações clínicas relevantes, procedimentos realizados, orientações fornecidas e evolução do tratamento.</p>
    <h2>CLÁUSULA 5ª – DO PRAZO</h2>
    <p>O prazo deste instrumento inicia-se na data da primeira consulta e encerra-se com a conclusão do pós-procedimento, podendo ser prorrogado por mútuo acordo.</p>
    <h2>CLÁUSULA 6ª – DO CONSENTIMENTO LIVRE E ESCLARECIDO</h2>
    <p>6.1. O(a) CONTRATANTE declara que recebeu explicações claras sobre o procedimento contratado, incluindo indicações, limitações, benefícios, riscos, cuidados e alternativas de tratamento.</p>
    <p>6.2. O(a) CONTRATANTE compreende que o resultado final poderá variar conforme estrutura dentária pré-existente, cor natural dos dentes, mordida, gengiva, hábitos alimentares, higiene, manutenção, bruxismo, apertamento, anatomia facial e resposta individual ao tratamento.</p>
    <p>6.3. O(a) CONTRATANTE declara estar ciente de que não há garantia de reprodução exata de fotografias, simulações, referências de internet, imagens de outros pacientes ou expectativas subjetivas previamente apresentadas.</p>
    <p>6.4. O(a) CONTRATANTE declara estar ciente de que podem ocorrer intercorrências, incluindo sensibilidade, desconforto, necessidade de ajustes, inflamação gengival, alteração de cor, lascas, fraturas, desgastes, descolamentos e necessidade de procedimentos complementares.</p>
    <h2>CLÁUSULA 7ª – DISPOSIÇÕES GERAIS</h2>
    <p>7.1. O procedimento realizado é de obrigação de meio, não de resultado. Por tratar-se de procedimento não exato, não há garantia absoluta de resultado.</p>
    <p>7.2. As lentes dentais possuem garantia contra amarelamento e defeitos relacionados à execução do tratamento, desde que respeitadas as orientações de manutenção e acompanhamento fornecidas pela clínica.</p>
    <p>7.3. A garantia não cobre danos decorrentes de acidentes, traumas, quedas, hábitos parafuncionais, falta de higiene, ausência de acompanhamento periódico ou utilização inadequada das lentes.</p>
    <p>7.4. A realização de procedimentos odontológicos posteriores por outros profissionais, ou procedimentos que possam alterar, desgastar, comprometer ou modificar as lentes instaladas, implicará perda automática da garantia.</p>
    <p>7.5. Por se tratar de tratamento estético personalizado, desenvolvido de acordo com características, expectativas e aprovação prévia do paciente, não haverá devolução de valores em casos de arrependimento, mudança de preferência estética ou insatisfação subjetiva com resultado e execução do tratamento.</p>
    <div class="signature-block">
      <p>Fica eleito o foro da Comarca de ${data.city} para dirimir eventuais controvérsias oriundas deste contrato.</p>
      <p>${data.city}, ${data.date}.</p>
      <div class="signature-row"><div class="signature-line"><strong>CONTRATADA</strong><br/>${data.clinic_name}</div><div class="signature-line"><strong>CONTRATANTE</strong><br/>${data.patient_name || '________________________________'}</div></div>
    </div>`
}

function imagem(data: FormData) {
  return `${header(data)}
    <h1>TERMO DE AUTORIZAÇÃO DE USO DE IMAGEM</h1>
    <p><strong>Autorizante:</strong> ${data.patient_name || '________________________________'}, CPF nº ${data.patient_cpf || '________________'}, residente em ${data.patient_address || '________________________________'}.</p>
    <p><strong>Autorizada:</strong> ${data.clinic_name}, CNPJ nº ${data.clinic_cnpj}, com sede em ${data.clinic_address}.</p>
    <p>O(a) AUTORIZANTE autoriza, de forma gratuita, o uso de sua imagem, fotografias, vídeos, registros de tratamento e depoimentos relacionados ao atendimento odontológico, exclusivamente para fins institucionais, científicos, educativos, informativos e de divulgação da AUTORIZADA.</p>
    <p>A autorização inclui uso em redes sociais, site, apresentações, materiais impressos, portfólio profissional e campanhas digitais, sempre preservando a dignidade e a imagem do(a) AUTORIZANTE.</p>
    <p>O(a) AUTORIZANTE declara ter ciência de que poderá solicitar a interrupção de novos usos futuros da imagem mediante comunicação formal, sem prejuízo dos materiais já produzidos, publicados ou impulsionados anteriormente.</p>
    <div class="signature-block"><p>${data.city}, ${data.date}.</p><div class="signature-row"><div class="signature-line"><strong>AUTORIZADA</strong><br/>${data.clinic_name}</div><div class="signature-line"><strong>AUTORIZANTE</strong><br/>${data.patient_name || '________________________________'}</div></div></div>`
}

const commonFields = [
  ['patient_name', 'Nome do paciente', 'Ex: Maria Fernanda Silva'],
  ['patient_cpf', 'CPF', '000.000.000-00'],
  ['patient_address', 'Endereço do paciente', 'Rua, número, bairro, cidade/UF'],
  ['procedure', 'Procedimento', 'Ex: Lentes superiores e inferiores'],
  ['total_value', 'Valor total', 'Digite 450000 para R$ 4.500,00'],
  ['payment_terms', 'Forma de pagamento', 'Ex: entrada + parcelas'],
  ['city', 'Cidade/foro', 'Ex: Joinville/SC'],
  ['date', 'Data', 'dd/mm/aaaa']
]

export function DocumentGenerator() {
  const [type, setType] = useState<DocType>('odontologico')
  const [data, setData] = useState<FormData>(defaults)
  const [saveHistory, setSaveHistory] = useState(false)
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const [loadingOrg, setLoadingOrg] = useState(true)

  const html = useMemo(() => type === 'imagem' ? imagem(data) : odontologico(data), [type, data])
  const completeness = Math.round((['patient_name', 'patient_cpf', 'patient_address', 'city', 'date'].filter((key) => data[key]?.trim()).length / 5) * 100)

  useEffect(() => {
    async function loadOrg() {
      setLoadingOrg(true)
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoadingOrg(false); return }
      const { data: member } = await supabase.from('organization_members').select('organization_id').eq('user_id', user.id).limit(1).single()
      if (!member) { setLoadingOrg(false); return }
      const { data: org } = await supabase.from('organizations').select('name,cnpj,address,representative').eq('id', member.organization_id).single()
      if (org) {
        setData((current) => ({
          ...current,
          clinic_name: org.name || current.clinic_name,
          clinic_cnpj: org.cnpj || current.clinic_cnpj,
          clinic_address: org.address || current.clinic_address,
          representative: org.representative || current.representative
        }))
      }
      setLoadingOrg(false)
    }
    loadOrg()
  }, [])

  function setField(key: string, value: string) { setData((d) => ({ ...d, [key]: value })) }

  async function saveDocument() {
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSaving(false); return setMessage('Faça login novamente.') }
    const { data: org } = await supabase.from('organization_members').select('organization_id').eq('user_id', user.id).limit(1).single()
    if (!org) { setSaving(false); return setMessage('Organização não encontrada. Confirme o schema do Supabase.') }
    const { error } = await supabase.from('contracts').insert({
      organization_id: org.organization_id,
      created_by: user.id,
      title: `${type === 'imagem' ? 'Termo de imagem' : 'Contrato odontológico'} - ${data.patient_name || 'Sem nome'}`,
      document_type: type,
      client_name: data.patient_name,
      client_document_masked: data.patient_cpf ? data.patient_cpf.replace(/(\d{3})\.?\d{3}\.?\d{3}-?(\d{2})/, '$1.***.***-$2') : null,
      html_content: html
    })
    setSaving(false)
    setMessage(error ? error.message : 'Documento salvo no histórico.')
  }

  async function printPdf() {
    setMessage('')
    if (saveHistory) await saveDocument()
    setTimeout(() => window.print(), 250)
  }

  return (
    <div className="mx-auto max-w-[1680px]">
      <div className="no-print mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <span className="badge"><Sparkles className="h-4 w-4" />Gerador inteligente</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight">Novo documento</h1>
          <p className="mt-3 max-w-2xl text-muted">Escolha o modelo, preencha os dados e confira a prévia antes de salvar em PDF.</p>
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 text-sm font-bold shadow-card">
          Preenchimento básico: <span className="text-sage">{completeness}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[440px_1fr]">
        <section className="no-print card h-max rounded-[2rem] p-5 xl:sticky xl:top-6">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setType('odontologico')} className={`rounded-3xl border p-4 text-left transition ${type === 'odontologico' ? 'border-sage bg-cream shadow-card' : 'border-black/5 bg-white'}`}>
              <FileText className="mb-3 h-6 w-6 text-sage" />
              <p className="font-black">Contrato</p>
              <p className="mt-1 text-xs leading-5 text-muted">Prestação odontológica</p>
            </button>
            <button onClick={() => setType('imagem')} className={`rounded-3xl border p-4 text-left transition ${type === 'imagem' ? 'border-sage bg-cream shadow-card' : 'border-black/5 bg-white'}`}>
              <Camera className="mb-3 h-6 w-6 text-sage" />
              <p className="font-black">Imagem</p>
              <p className="mt-1 text-xs leading-5 text-muted">Autorização de uso</p>
            </button>
          </div>

          <div className="mt-5 max-h-[56vh] space-y-4 overflow-auto pr-1">
            {commonFields.map(([key, label, placeholder]) => (
              <label key={key} className="block">
                <span className="mb-2 block text-sm font-black">{label}</span>
                <input className="input" placeholder={placeholder} value={data[key] || ''} onChange={(e) => setField(key, e.target.value)} />
                {key === 'total_value' && <span className="mt-1 block text-xs font-semibold text-muted">Prévia: {money(data.total_value)}</span>}
              </label>
            ))}

            <details className="rounded-3xl bg-cream p-4" open={loadingOrg ? false : undefined}>
              <summary className="cursor-pointer font-black">Dados da clínica {loadingOrg && <Loader2 className="ml-2 inline h-4 w-4 animate-spin" />}</summary>
              <div className="mt-4 space-y-3">
                {[
                  ['clinic_name','Nome da clínica'],['clinic_cnpj','CNPJ'],['clinic_address','Endereço'],['representative','Representante']
                ].map(([key,label]) => (
                  <label key={key} className="block">
                    <span className="mb-1 block text-xs font-black">{label}</span>
                    <input className="input rounded-2xl px-3 py-2 text-sm" value={data[key] || ''} onChange={(e) => setField(key, e.target.value)} />
                  </label>
                ))}
              </div>
            </details>
          </div>

          <div className="sticky bottom-0 -mx-5 mt-5 border-t border-black/5 bg-white/95 px-5 pb-1 pt-4 backdrop-blur-xl">
            <label className="mb-4 flex cursor-pointer items-center justify-between gap-3 rounded-2xl bg-cream p-4 text-sm font-black">
              <span className="flex items-center gap-2"><Save className="h-4 w-4 text-sage" />Salvar no histórico</span>
              <input type="checkbox" checked={saveHistory} onChange={(e) => setSaveHistory(e.target.checked)} />
            </label>
            {message && <p className="mb-4 flex items-center gap-2 rounded-2xl bg-cream p-3 text-sm font-semibold"><CheckCircle2 className="h-4 w-4 text-sage" />{message}</p>}
            <button onClick={printPdf} disabled={saving} className="btn-primary flex w-full items-center justify-center gap-2 disabled:opacity-60">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Printer className="h-4 w-4" />}
              {saving ? 'Salvando...' : 'Gerar PDF'}
            </button>
            <p className="mt-2 text-center text-xs font-semibold text-muted">Na tela seguinte, escolha “Salvar como PDF”.</p>
          </div>
        </section>

        <section>
          <div className="no-print mb-4 flex items-center justify-between rounded-3xl bg-white/80 px-5 py-4 shadow-card">
            <div>
              <p className="text-sm font-black">Prévia A4</p>
              <p className="text-xs text-muted">O documento abaixo é o que será impresso.</p>
            </div>
            <span className="rounded-full bg-cream px-3 py-1 text-xs font-black text-muted">{type === 'imagem' ? 'Termo de imagem' : 'Contrato odontológico'}</span>
          </div>
          <div className="contract-viewport"><div className="contract-paper" dangerouslySetInnerHTML={{ __html: html }} /></div>
        </section>
      </div>
    </div>
  )
}
