'use client'

import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { ArrowRight, Check, Download, FileText, ShieldCheck, Zap, Coins } from 'lucide-react'
import { EstimateSummary } from '@/components/PlatformSections'

function first(items = []) {
  return items[0] || null
}

function priceOf(item) {
  return Number(item?.base_price || 0)
}

function pdfReference(prefix = 'AV') {
  const now = new Date()
  return `${prefix}-PROP-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${String(Date.now()).slice(-6)}`
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
    if (type) items.push({ ...type, group: 'Project Architecture', calculated_price: priceOf(type) })
    if (scale) items.push({ ...scale, group: 'Scale & Concurrency', calculated_price: priceOf(scale) })
    if (timeline && Number(timeline.multiplier || 1) !== 1) {
      const timelinePrice = Math.round((priceOf(type) + priceOf(scale)) * (Number(timeline.multiplier || 1) - 1))
      items.push({ ...timeline, group: 'Delivery Velocity', calculated_price: timelinePrice })
    }
    if (support) items.push({ ...support, group: 'SLA & Ongoing Support', calculated_price: priceOf(support) })
    addons.forEach(addon => {
      items.push({ ...addon, group: 'Specialized Capabilities', calculated_price: priceOf(addon) })
    })
    return items
  }, [type, scale, timeline, support, addons])

  const total = useMemo(() => {
    return Math.round(selectedItems.reduce((sum, item) => sum + Number(item.calculated_price || 0), 0))
  }, [selectedItems])

  const totalNaira = Math.round(total * exchangeRate)

  const toggleAddon = (addon) => {
    setAddons(prev =>
      prev.some(item => item.id === addon.id)
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
      doc.setFontSize(9.5)
      doc.setTextColor(10, 22, 40)
      doc.text(label.toUpperCase(), margin, y)
      y += 4
      doc.setDrawColor(226, 232, 240)
      doc.line(margin, y, pageW - margin, y)
      y += 6
    }

    // Institutional Header
    doc.setFillColor(10, 22, 40)
    doc.rect(0, 0, pageW, 48, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.text(settings.company_name || 'Anjal Ventures', margin, 18)

    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(148, 163, 184)
    doc.text('CAC Registered: 9258709  |  D-U-N-S: 352294840  |  TIN: 2623553716975', margin, 26)
    doc.text('Damaturu, Yobe State, Nigeria  |  contact@anjalventures.com', margin, 32)
    doc.text('Executive Digital Product Proposal & Commercial Scope', margin, 38)

    doc.setTextColor(59, 130, 246)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text('FORMAL PROPOSAL', pageW - margin, 18, { align: 'right' })
    doc.setTextColor(226, 232, 240)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.text(reference, pageW - margin, 26, { align: 'right' })

    y = 62
    doc.setTextColor(15, 23, 42)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text(form.project_title || type?.name || 'Digital Platform Engineering', margin, y)
    y += 7
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(71, 85, 105)
    doc.text(
      doc.splitTextToSize(
        `Prepared for: ${form.client_name || 'Client Principal'}${form.entity_name ? ` (${form.entity_name})` : ''}  |  Official Channel: ${form.email || 'contact@anjalventures.com'}. This document formalizes the commercial scope, architecture assumptions, and financial investment.`,
        contentW
      ),
      margin,
      y
    )
    y += 14

    section('Client & Enterprise Context')
    const clientLines = [
      `Client Principal: ${form.client_name || 'Designated Stakeholder'}`,
      form.entity_name ? `Organization: ${form.entity_name}` : null,
      form.email ? `Official Email: ${form.email}` : null,
      form.address ? `Registered Office: ${form.address}` : null,
    ].filter(Boolean)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(71, 85, 105)
    clientLines.forEach(line => {
      doc.text(line, margin, y)
      y += 5
    })

    section('Itemized Scope & Technical Deliverables')
    selectedItems.forEach((item, index) => {
      if (y > 255) {
        doc.addPage()
        y = 20
      }
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8.5)
      doc.setTextColor(15, 23, 42)
      doc.text(`${index + 1}. ${item.name} (${item.group})`, margin, y)
      doc.setTextColor(37, 99, 235)
      doc.text(`$${Number(item.calculated_price || 0).toLocaleString()}`, pageW - margin, y, { align: 'right' })
      y += 5
      if (item.description) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        doc.setTextColor(100, 116, 139)
        doc.text(doc.splitTextToSize(item.description, contentW - 16), margin + 4, y)
        y += 5
      }
    })

    section('Financial Investment Summary')
    doc.setFillColor(248, 250, 252)
    doc.roundedRect(margin, y - 3, contentW, 20, 2, 2, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(10, 22, 40)
    doc.text('Total Fixed-Price Investment', margin + 5, y + 4)
    doc.setTextColor(37, 99, 235)
    doc.text(`$${total.toLocaleString()} USD`, pageW - margin - 5, y + 4, { align: 'right' })
    doc.setFontSize(8.5)
    doc.setTextColor(22, 101, 52)
    doc.text(`NGN ${totalNaira.toLocaleString()} at official rate (NGN ${exchangeRate.toLocaleString()} / USD)`, pageW - margin - 5, y + 11, { align: 'right' })
    y += 26

    section('Institutional Terms & Handover Guarantee')
    const terms = [
      '100% intellectual property, repository ownership, and full-stack source code handover upon completion.',
      'Milestone payment structure: 50% mobilization deposit, 40% functional milestone delivery, 10% final production launch.',
      '30-day comprehensive post-launch warranty including bug resolution and performance monitoring.',
      'Quotation remains valid for 30 calendar days from date of issue.',
    ]
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(71, 85, 105)
    terms.forEach(term => {
      doc.text(doc.splitTextToSize(`- ${term}`, contentW), margin, y)
      y += 5
    })

    if (form.goals || form.notes) {
      section('Client Specific Requirements')
      doc.text(doc.splitTextToSize([form.goals, form.notes].filter(Boolean).join('\n'), contentW), margin, y)
      y += 8
    }

    doc.setFontSize(7.5)
    doc.setTextColor(148, 163, 184)
    doc.text('Prepared by Anjal Ventures Product Studio · CAC: 9258709 · D-U-N-S: 352294840 · developers@anjalventures.com', margin, 288)
    doc.text(reference, pageW - margin, 288, { align: 'right' })
    return doc
  }

  const submit = async () => {
    if (!form.client_name || !type || !form.email) {
      toast.error('Client name, email, and project type are required')
      return
    }
    setLoading(true)
    try {
      const ref = pdfReference()
      const payload = {
        ...form,
        phone: 'N/A',
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
      toast.success('Official executive proposal generated and saved!')
    } catch (err) {
      toast.error(err.message || 'Failed to generate proposal')
    }
    setLoading(false)
  }

  return (
    <section className="bg-slate-50 px-5 py-16 lg:px-8 border-t border-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {/* Step 1: Engagement Archetype */}
          <Panel step="01" title="Core System Architecture" desc="Select the fundamental digital product model you are building.">
            <div className="grid gap-3.5 md:grid-cols-2">
              {types.map(item => (
                <Choice
                  key={item.id}
                  active={type?.id === item.id}
                  onClick={() => setType(item)}
                  title={item.name}
                  price={priceOf(item)}
                  text={item.description}
                />
              ))}
            </div>
          </Panel>

          {/* Step 2: System Scale & Velocity */}
          <Panel step="02" title="Scale, Velocity & Operating Tier" desc="Define target concurrent capacity, delivery urgency, and SLA commitments.">
            <div className="grid gap-4 md:grid-cols-3">
              <Select
                label="Concurrency Scale"
                value={scale?.id || ''}
                onChange={id => setScale(scales.find(item => String(item.id) === id))}
                items={scales}
              />
              <Select
                label="Delivery Velocity"
                value={timeline?.id || ''}
                onChange={id => setTimeline(timelines.find(item => String(item.id) === id))}
                items={timelines}
              />
              <Select
                label="Post-Launch SLA"
                value={support?.id || ''}
                onChange={id => setSupport(supports.find(item => String(item.id) === id))}
                items={supports}
              />
            </div>
          </Panel>

          {/* Step 3: Technical Add-on Modules */}
          <Panel step="03" title="Specialized Technical Modules" desc="Equip your platform with institutional add-ons.">
            <div className="grid gap-3 md:grid-cols-3">
              {addonItems.map(addon => {
                const isSelected = addons.some(item => item.id === addon.id)
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      isSelected
                        ? 'border-2 border-slate-950 bg-slate-50/80 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded-md border text-xs transition ${
                          isSelected ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="h-2.5 w-2.5" />}
                      </div>
                      <span className="font-mono text-xs font-bold text-blue-600">
                        +${priceOf(addon).toLocaleString()}
                      </span>
                    </div>
                    <span className="block text-xs font-bold text-slate-950">{addon.name}</span>
                    {addon.description && (
                      <span className="mt-1 block text-[11px] leading-relaxed text-slate-500 line-clamp-2">
                        {addon.description}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </Panel>

          {/* Step 4: Client Principal Details */}
          <Panel step="04" title="Client Principal & Proposal Context" desc="Provide commercial contact details to generate your formal PDF proposal.">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Your Full Name *"
                value={form.client_name}
                onChange={v => setForm({ ...form, client_name: v })}
                placeholder="e.g. Alex Morgan"
                required
              />
              <Input
                label="Work Email *"
                type="email"
                value={form.email}
                onChange={v => setForm({ ...form, email: v })}
                placeholder="alex@company.com"
                required
              />
              <Input
                label="Company / Enterprise Name"
                value={form.entity_name}
                onChange={v => setForm({ ...form, entity_name: v })}
                placeholder="e.g. Apex Technologies Ltd."
              />
              <Input
                label="Project Designation"
                value={form.project_title}
                onChange={v => setForm({ ...form, project_title: v })}
                placeholder="e.g. Apex Multi-Tenant Cloud Portal"
              />
              <div className="md:col-span-2">
                <Input
                  label="Registered Corporate Address"
                  value={form.address}
                  onChange={v => setForm({ ...form, address: v })}
                  placeholder="e.g. Victoria Island, Lagos / London, UK"
                />
              </div>
              <Textarea
                label="Core Business Goals & Success Metrics"
                value={form.goals}
                onChange={v => setForm({ ...form, goals: v })}
                placeholder="What operational outcomes or market targets should this build achieve?"
              />
              <Textarea
                label="Technical Integration Requirements / Notes"
                value={form.notes}
                onChange={v => setForm({ ...form, notes: v })}
                placeholder="Detail any third-party APIs (Paystack, Stripe, Twilio), legacy databases, or compliance requirements..."
              />
            </div>
          </Panel>
        </div>

        {/* Right Column: Live Investment Summary & Download Action */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <EstimateSummary total={total} totalNaira={totalNaira} label="Indicative Investment Scope" />

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900">Configured Line Items</p>
              <span className="font-mono text-[10px] text-slate-400">{selectedItems.length} items</span>
            </div>

            <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
              {selectedItems.map(item => (
                <div key={`${item.group}-${item.id}`} className="flex justify-between gap-3 border-b border-slate-100 pb-2.5 text-xs last:border-0">
                  <div className="min-w-0 flex-1">
                    <span className="block font-semibold text-slate-800 truncate">{item.name}</span>
                    <span className="block text-[10px] text-slate-400">{item.group}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-950">
                    ${Number(item.calculated_price || 0).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={submit}
              disabled={loading}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-600 disabled:opacity-60"
            >
              {loading ? 'Compiling Proposal...' : 'Download Executive Proposal PDF'}
              {loading ? <FileText className="h-4 w-4" /> : <Download className="h-4 w-4" />}
            </button>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Institutional Guarantee · CAC 9258709</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

function Panel({ step, title, desc, children }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-md">
            Stage {step}
          </span>
          <h2 className="text-lg font-semibold tracking-tight text-slate-950">{title}</h2>
        </div>
        {desc && <p className="mt-1 text-xs text-slate-500">{desc}</p>}
      </div>
      {children}
    </div>
  )
}

function Choice({ active, onClick, title, price, text }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition ${
        active
          ? 'border-2 border-slate-950 bg-slate-50/80 shadow-xs'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-950">{title}</span>
        <span className="font-mono text-xs font-bold text-blue-600">from ${price.toLocaleString()}</span>
      </div>
      {text && <span className="mt-2 block text-xs leading-relaxed text-slate-600">{text}</span>}
    </button>
  )
}

function Select({ label, value, onChange, items }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">{label}</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs text-slate-950 outline-none transition focus:border-slate-950 focus:bg-white"
      >
        {items.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </label>
  )
}

function Input({ label, value, onChange, placeholder = '', type = 'text', required }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
        {label}{required ? ' *' : ''}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs text-slate-950 outline-none transition focus:border-slate-950 focus:bg-white"
      />
    </label>
  )
}

function Textarea({ label, value, onChange, placeholder = '' }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">{label}</span>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-xs text-slate-950 outline-none transition focus:border-slate-950 focus:bg-white"
      />
    </label>
  )
}
