'use client'

import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { ArrowRight, Check, Download, FileText } from 'lucide-react'
import { EstimateSummary } from '@/components/PlatformSections'

function first(items = []) {
  return items[0] || null
}

function priceOf(item) {
  return Number(item?.base_price || 0)
}

function pdfReference(prefix = 'AV') {
  const now = new Date()
  return `${prefix}-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${String(Date.now()).slice(-6)}`
}

export default function QuoteBuilder({ settings = {}, calculator = {} }) {
  const exchangeRate = Number(settings.exchange_rate || 1400)
  const [type, setType] = useState(null)
  const [scale, setScale] = useState(null)
  const [timeline, setTimeline] = useState(null)
  const [support, setSupport] = useState(null)
  const [addons, setAddons] = useState([])
  const [form, setForm] = useState({
    client_name: '',
    entity_name: '',
    email: '',
    phone: '',
    address: '',
    project_title: '',
    goals: '',
    notes: '',
  })
  const [loading, setLoading] = useState(false)

  const types = calculator.type || []
  const scales = calculator.scale || []
  const timelines = calculator.timeline || []
  const supports = calculator.support || []
  const addonItems = calculator.addon || []

  useEffect(() => {
    setType(first(types))
    setScale(first(scales))
    setTimeline(first(timelines))
    setSupport(first(supports))
  }, [calculator])

  const selectedItems = useMemo(() => {
    const items = []
    if (type) items.push({ ...type, group: 'Project type', calculated_price: priceOf(type) })
    if (scale) items.push({ ...scale, group: 'Scale', calculated_price: priceOf(scale) })
    if (timeline && Number(timeline.multiplier || 1) !== 1) {
      const timelinePrice = Math.round((priceOf(type) + priceOf(scale)) * (Number(timeline.multiplier || 1) - 1))
      items.push({ ...timeline, group: 'Timeline', calculated_price: timelinePrice })
    }
    if (support) items.push({ ...support, group: 'Support', calculated_price: priceOf(support) })
    addons.forEach(addon => items.push({ ...addon, group: 'Add-on', calculated_price: priceOf(addon) }))
    return items.filter(item => Number(item.calculated_price || 0) >= 0)
  }, [type, scale, timeline, support, addons])

  const total = useMemo(() => {
    const base = priceOf(type) + priceOf(scale)
    const timed = base * Number(timeline?.multiplier || 1)
    const supportPrice = priceOf(support)
    const addonTotal = addons.reduce((sum, item) => sum + priceOf(item), 0)
    return Math.max(0, Math.round(timed + supportPrice + addonTotal))
  }, [type, scale, timeline, support, addons])

  const totalNaira = Math.round(total * exchangeRate)

  const toggleAddon = (addon) => {
    setAddons(prev => prev.some(item => item.id === addon.id)
      ? prev.filter(item => item.id !== addon.id)
      : [...prev, addon]
    )
  }

  const generatePDF = async (reference) => {
    const { default: jsPDF } = await import('jspdf')
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const pageW = 210
    const margin = 16
    const contentW = pageW - margin * 2
    let y = 18

    const section = (label) => {
      y += 8
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor(15, 23, 42)
      doc.text(label.toUpperCase(), margin, y)
      y += 5
      doc.setDrawColor(226, 232, 240)
      doc.line(margin, y, pageW - margin, y)
      y += 6
    }

    doc.setFillColor(7, 17, 31)
    doc.rect(0, 0, pageW, 46, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(22)
    doc.text(settings.company_name || 'Anjal Ventures', margin, 18)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(194, 204, 220)
    doc.text(settings.company_tagline || "Building Africa's digital infrastructure", margin, 27)
    doc.text(`${settings.company_email || 'anjalventures@gmail.com'} | ${settings.company_phone || '+234 000 000 0000'}`, margin, 35)
    doc.setTextColor(96, 165, 250)
    doc.setFont('helvetica', 'bold')
    doc.text('PROJECT PROPOSAL', pageW - margin, 18, { align: 'right' })
    doc.setTextColor(226, 232, 240)
    doc.setFont('helvetica', 'normal')
    doc.text(reference, pageW - margin, 27, { align: 'right' })

    y = 60
    doc.setTextColor(15, 23, 42)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text(form.project_title || type?.name || 'Digital product engagement', margin, y)
    y += 8
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(71, 85, 105)
    doc.text(doc.splitTextToSize(`Prepared for ${form.client_name}${form.entity_name ? `, ${form.entity_name}` : ''}. This proposal summarizes the selected scope, indicative investment, delivery assumptions, and next steps.`, contentW), margin, y)
    y += 18

    section('Client')
    const clientLines = [
      `Name: ${form.client_name}`,
      form.entity_name ? `Company: ${form.entity_name}` : null,
      form.email ? `Email: ${form.email}` : null,
      form.phone ? `Phone: ${form.phone}` : null,
      form.address ? `Address: ${form.address}` : null,
    ].filter(Boolean)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(71, 85, 105)
    clientLines.forEach(line => { doc.text(line, margin, y); y += 5 })

    section('Scope')
    selectedItems.forEach((item, index) => {
      if (y > 260) { doc.addPage(); y = 20 }
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(15, 23, 42)
      doc.text(`${index + 1}. ${item.name}`, margin, y)
      doc.setTextColor(37, 99, 235)
      doc.text(`$${Number(item.calculated_price || 0).toFixed(0)}`, pageW - margin, y, { align: 'right' })
      y += 5
      if (item.description) {
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(100, 116, 139)
        doc.text(doc.splitTextToSize(item.description, contentW - 16), margin + 4, y)
        y += 6
      }
    })

    section('Investment')
    doc.setFillColor(241, 245, 249)
    doc.roundedRect(margin, y - 4, contentW, 22, 2, 2, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(15, 23, 42)
    doc.text('Indicative total', margin + 5, y + 4)
    doc.setTextColor(37, 99, 235)
    doc.text(`$${total.toLocaleString()} USD`, pageW - margin - 5, y + 4, { align: 'right' })
    doc.setFontSize(9)
    doc.setTextColor(22, 101, 52)
    doc.text(`NGN ${totalNaira.toLocaleString()} at NGN ${exchangeRate.toLocaleString()} / USD`, pageW - margin - 5, y + 12, { align: 'right' })
    y += 28

    section('Assumptions and terms')
    const terms = [
      'Final quote may change after discovery, content review, and technical scoping.',
      'Standard payment structure is 50% deposit, 40% implementation milestone, 10% launch handoff unless otherwise agreed.',
      'Quotation validity is 30 days from issue date.',
      'Client owns approved deliverables and source code after full payment.',
      'Hosting, paid APIs, app store fees, third-party subscriptions, and SMS/email credits are billed separately unless stated.',
    ]
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(71, 85, 105)
    terms.forEach(term => {
      doc.text(doc.splitTextToSize(`- ${term}`, contentW), margin, y)
      y += 7
    })
    if (form.goals || form.notes) {
      section('Client notes')
      doc.text(doc.splitTextToSize([form.goals, form.notes].filter(Boolean).join('\n\n'), contentW), margin, y)
    }

    doc.setFontSize(8)
    doc.setTextColor(148, 163, 184)
    doc.text('Prepared by Anjal Ventures', margin, 288)
    doc.text(reference, pageW - margin, 288, { align: 'right' })
    return doc
  }

  const submit = async () => {
    if (!form.client_name || !type) {
      toast.error('Client name and project type are required')
      return
    }
    setLoading(true)
    try {
      const ref = pdfReference()
      const payload = {
        ...form,
        selected_items: selectedItems,
        total_amount: total,
        total_naira: totalNaira,
        client_payload: form,
        proposal_payload: { type, scale, timeline, support, addons, exchange_rate: exchangeRate },
        quote_type: 'project',
        source: 'quote-builder',
      }
      const res = await fetch('/api/quotation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      const doc = await generatePDF(data.reference || ref)
      doc.save(`Anjal-Ventures-Proposal-${data.reference || ref}.pdf`)
      toast.success('Proposal generated and saved')
    } catch (err) {
      toast.error(err.message || 'Failed to generate proposal')
    }
    setLoading(false)
  }

  return (
    <section className="bg-slate-50 px-5 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <Panel title="1. Select the engagement">
            <div className="grid gap-3 md:grid-cols-2">
              {types.map(item => (
                <Choice key={item.id} active={type?.id === item.id} onClick={() => setType(item)} title={item.name} price={priceOf(item)} text={item.description} />
              ))}
            </div>
          </Panel>

          <Panel title="2. Configure scope">
            <div className="grid gap-4 md:grid-cols-3">
              <Select label="Scale" value={scale?.id || ''} onChange={id => setScale(scales.find(item => String(item.id) === id))} items={scales} />
              <Select label="Timeline" value={timeline?.id || ''} onChange={id => setTimeline(timelines.find(item => String(item.id) === id))} items={timelines} />
              <Select label="Support" value={support?.id || ''} onChange={id => setSupport(supports.find(item => String(item.id) === id))} items={supports} />
            </div>
          </Panel>

          <Panel title="3. Add capabilities">
            <div className="grid gap-3 md:grid-cols-3">
              {addonItems.map(addon => (
                <button key={addon.id} onClick={() => toggleAddon(addon)} className={`rounded-lg border p-4 text-left transition ${addons.some(item => item.id === addon.id) ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                  <span className="mb-4 flex h-5 w-5 items-center justify-center rounded-md border border-slate-300">
                    {addons.some(item => item.id === addon.id) && <Check className="h-3.5 w-3.5 text-blue-700" />}
                  </span>
                  <span className="block text-sm font-bold text-slate-950">{addon.name}</span>
                  <span className="mt-1 block text-xs font-semibold text-blue-700">+${priceOf(addon).toLocaleString()}</span>
                </button>
              ))}
            </div>
          </Panel>

          <Panel title="4. Client details">
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Full name" value={form.client_name} onChange={v => setForm({ ...form, client_name: v })} required />
              <Input label="Company" value={form.entity_name} onChange={v => setForm({ ...form, entity_name: v })} />
              <Input label="Email" value={form.email} onChange={v => setForm({ ...form, email: v })} />
              <Input label="Phone" value={form.phone} onChange={v => setForm({ ...form, phone: v })} />
              <Input label="Project title" value={form.project_title} onChange={v => setForm({ ...form, project_title: v })} />
              <Input label="Address" value={form.address} onChange={v => setForm({ ...form, address: v })} />
              <Textarea label="Business goals" value={form.goals} onChange={v => setForm({ ...form, goals: v })} />
              <Textarea label="Additional notes" value={form.notes} onChange={v => setForm({ ...form, notes: v })} />
            </div>
          </Panel>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <EstimateSummary total={total} totalNaira={totalNaira} />
          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="mb-4 text-sm font-bold text-slate-950">Proposal scope</p>
            <div className="max-h-72 space-y-3 overflow-auto pr-1">
              {selectedItems.map(item => (
                <div key={`${item.group}-${item.id}`} className="flex justify-between gap-3 border-b border-slate-100 pb-3 text-sm last:border-0">
                  <span className="text-slate-600">{item.name}</span>
                  <span className="font-bold text-slate-950">${Number(item.calculated_price || 0).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <button onClick={submit} disabled={loading} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-60">
              {loading ? 'Generating...' : 'Download proposal'}
              {loading ? <FileText className="h-4 w-4" /> : <Download className="h-4 w-4" />}
            </button>
          </div>
        </aside>
      </div>
    </section>
  )
}

function Panel({ title, children }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold tracking-normal text-slate-950">{title}</h2>
      {children}
    </div>
  )
}

function Choice({ active, onClick, title, price, text }) {
  return (
    <button onClick={onClick} className={`rounded-lg border p-5 text-left transition ${active ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
      <span className="text-sm font-bold text-slate-950">{title}</span>
      <span className="mt-2 block text-sm font-semibold text-blue-700">from ${price.toLocaleString()}</span>
      {text && <span className="mt-3 block text-sm leading-6 text-slate-600">{text}</span>}
    </button>
  )
}

function Select({ label, value, onChange, items }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <select value={value} onChange={e => onChange(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-600">
        {items.map(item => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </select>
    </label>
  )
}

function Input({ label, value, onChange, required }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}{required ? ' *' : ''}</span>
      <input value={value} onChange={e => onChange(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-600" />
    </label>
  )
}

function Textarea({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={4} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-600" />
    </label>
  )
}
