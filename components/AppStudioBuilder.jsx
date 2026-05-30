'use client'

import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Check, Download, FileText, Upload } from 'lucide-react'
import { EstimateSummary } from '@/components/PlatformSections'

function makeReference() {
  const now = new Date()
  return `APP-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${String(Date.now()).slice(-6)}`
}

export default function AppStudioBuilder({ settings = {}, presets = [] }) {
  const exchangeRate = Number(settings.exchange_rate || 1400)
  const [step, setStep] = useState(0)
  const [preset, setPreset] = useState(presets[0] || null)
  const [featureIds, setFeatureIds] = useState([])
  const [logoPreview, setLogoPreview] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [form, setForm] = useState({
    app_name: 'AnjalPay',
    client_name: '',
    company: '',
    email: '',
    phone: '',
    brand_color: '',
    platform: 'Android first',
    timeline: 'Standard delivery',
    notes: '',
  })
  const [loading, setLoading] = useState(false)

  const features = preset?.features || []
  const selectedFeatures = features.filter(feature => featureIds.includes(feature.id))
  const total = useMemo(() => {
    return Math.round(Number(preset?.base_price || 0) + selectedFeatures.reduce((sum, feature) => sum + Number(feature.price || 0), 0))
  }, [preset, selectedFeatures])
  const totalNaira = Math.round(total * exchangeRate)

  const updatePreset = (item) => {
    setPreset(item)
    setFeatureIds([])
    if (item?.preset_key === 'vtu-data-selling') {
      setForm(prev => ({ ...prev, app_name: prev.app_name || 'AnjalPay' }))
    }
  }

  const toggleFeature = (id) => {
    setFeatureIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id])
  }

  const handleLogo = async (file) => {
    if (!file) return
    const localUrl = URL.createObjectURL(file)
    setLogoPreview(localUrl)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/app-studio/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok && data.url) {
        setLogoUrl(data.url)
      } else {
        toast('Logo preview is active; storage upload is not configured yet.')
      }
    } catch {
      toast('Logo preview is active; upload can be completed after storage is configured.')
    }
  }

  const generatePDF = async (reference) => {
    const { default: jsPDF } = await import('jspdf')
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const margin = 16
    const width = 210
    let y = 18

    doc.setFillColor(7, 17, 31)
    doc.rect(0, 0, width, 44, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(21)
    doc.text(settings.company_name || 'Anjal Ventures', margin, 18)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(203, 213, 225)
    doc.text('App Studio product brief and proposal', margin, 29)
    doc.setTextColor(96, 165, 250)
    doc.setFont('helvetica', 'bold')
    doc.text(reference, width - margin, 18, { align: 'right' })

    y = 58
    doc.setTextColor(15, 23, 42)
    doc.setFontSize(16)
    doc.text(form.app_name || 'Mobile application', margin, y)
    y += 8
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(71, 85, 105)
    doc.text(doc.splitTextToSize(`${preset?.name || 'Custom app'} for ${form.client_name}${form.company ? `, ${form.company}` : ''}.`, 178), margin, y)
    y += 16

    const block = (title) => {
      y += 7
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(15, 23, 42)
      doc.setFontSize(10)
      doc.text(title.toUpperCase(), margin, y)
      y += 7
    }

    block('Configuration')
    ;[
      ['Preset', preset?.name],
      ['Platform', form.platform],
      ['Timeline', form.timeline],
      ['Contact', [form.email, form.phone].filter(Boolean).join(' | ')],
    ].forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(15, 23, 42)
      doc.text(`${label}:`, margin, y)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(71, 85, 105)
      doc.text(String(value || 'Pending'), margin + 28, y)
      y += 6
    })

    block('Selected features')
    const featureList = selectedFeatures.length ? selectedFeatures : features.slice(0, 4)
    featureList.forEach((feature, index) => {
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(15, 23, 42)
      doc.text(`${index + 1}. ${feature.name}`, margin, y)
      doc.setTextColor(37, 99, 235)
      doc.text(`$${Number(feature.price || 0).toFixed(0)}`, width - margin, y, { align: 'right' })
      y += 6
    })

    block('Investment')
    doc.setFillColor(241, 245, 249)
    doc.roundedRect(margin, y - 4, 178, 22, 2, 2, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(15, 23, 42)
    doc.setFontSize(13)
    doc.text(`$${total.toLocaleString()} USD`, margin + 5, y + 4)
    doc.setFontSize(9)
    doc.setTextColor(22, 101, 52)
    doc.text(`NGN ${totalNaira.toLocaleString()} at NGN ${exchangeRate.toLocaleString()} / USD`, margin + 5, y + 12)
    y += 30

    block('Next steps')
    const nextSteps = [
      'Confirm the app category, launch platform, and required integrations.',
      'Complete product discovery and screen-level scope definition.',
      'Approve proposal, timeline, and payment structure before development begins.',
    ]
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(71, 85, 105)
    nextSteps.forEach(item => { doc.text(doc.splitTextToSize(`- ${item}`, 178), margin, y); y += 7 })
    if (form.notes) {
      block('Client notes')
      doc.text(doc.splitTextToSize(form.notes, 178), margin, y)
    }
    doc.setFontSize(8)
    doc.setTextColor(148, 163, 184)
    doc.text('Prepared by Anjal Ventures App Studio', margin, 288)
    return doc
  }

  const submit = async () => {
    if (!preset || !form.app_name || !form.client_name) {
      toast.error('App name and client name are required')
      return
    }
    setLoading(true)
    try {
      const reference = makeReference()
      const payload = {
        preset_key: preset.preset_key,
        app_name: form.app_name,
        client_name: form.client_name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        logo_url: logoUrl,
        configuration: { ...form, preset: preset.name, preview_config: preset.preview_config },
        selected_features: selectedFeatures,
        total_amount: total,
        total_naira: totalNaira,
      }
      const res = await fetch('/api/app-studio/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      const doc = await generatePDF(data.reference || reference)
      doc.save(`Anjal-Ventures-App-Brief-${data.reference || reference}.pdf`)
      toast.success('App brief generated and saved')
    } catch (err) {
      toast.error(err.message || 'Failed to submit app brief')
    }
    setLoading(false)
  }

  const steps = ['Preset', 'Features', 'Brand', 'Contact']

  return (
    <section className="bg-slate-50 px-5 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_420px]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-6 flex flex-wrap gap-2">
            {steps.map((label, index) => (
              <button key={label} onClick={() => setStep(index)} className={`rounded-lg px-3 py-2 text-sm font-bold ${step === index ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {index + 1}. {label}
              </button>
            ))}
          </div>

          {step === 0 && (
            <div className="grid gap-3 md:grid-cols-2">
              {presets.map(item => (
                <button key={item.id} onClick={() => updatePreset(item)} className={`rounded-lg border p-5 text-left transition ${preset?.id === item.id ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  <span className="text-sm font-bold text-blue-700">{item.category}</span>
                  <span className="mt-2 block text-xl font-semibold text-slate-950">{item.name}</span>
                  <span className="mt-3 block text-sm leading-6 text-slate-600">{item.description}</span>
                  <span className="mt-5 block text-sm font-bold text-slate-950">from ${Number(item.base_price || 0).toLocaleString()}</span>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-3 md:grid-cols-2">
              {features.map(feature => (
                <button key={feature.id} onClick={() => toggleFeature(feature.id)} className={`rounded-lg border p-5 text-left transition ${featureIds.includes(feature.id) ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  <span className="mb-5 flex h-5 w-5 items-center justify-center rounded-md border border-slate-300">
                    {featureIds.includes(feature.id) && <Check className="h-3.5 w-3.5 text-blue-700" />}
                  </span>
                  <span className="text-sm font-bold text-slate-950">{feature.name}</span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">{feature.description}</span>
                  <span className="mt-4 block text-sm font-bold text-blue-700">+${Number(feature.price || 0).toLocaleString()}</span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="App name" value={form.app_name} onChange={v => setForm({ ...form, app_name: v })} />
              <Input label="Brand color" value={form.brand_color} onChange={v => setForm({ ...form, brand_color: v })} placeholder={preset?.accent_color || '#2563EB'} />
              <Select label="Platform" value={form.platform} onChange={v => setForm({ ...form, platform: v })} items={['Android first', 'Android and iOS', 'Cross-platform MVP']} />
              <Select label="Timeline" value={form.timeline} onChange={v => setForm({ ...form, timeline: v })} items={['Standard delivery', 'Accelerated delivery', 'Flexible delivery']} />
              <label className="md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">App logo</span>
                <span className="flex cursor-pointer items-center justify-center gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-sm font-semibold text-slate-600 hover:border-blue-500">
                  <Upload className="h-4 w-4" />
                  Upload logo
                  <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={e => handleLogo(e.target.files?.[0])} />
                </span>
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Client name" value={form.client_name} onChange={v => setForm({ ...form, client_name: v })} />
              <Input label="Company" value={form.company} onChange={v => setForm({ ...form, company: v })} />
              <Input label="Email" value={form.email} onChange={v => setForm({ ...form, email: v })} />
              <Input label="Phone" value={form.phone} onChange={v => setForm({ ...form, phone: v })} />
              <label className="md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Notes</span>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={4} className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-600" />
              </label>
            </div>
          )}

          <div className="mt-6 flex justify-between border-t border-slate-100 pt-5">
            <button onClick={() => setStep(Math.max(0, step - 1))} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-40" disabled={step === 0}>Back</button>
            {step < steps.length - 1 ? (
              <button onClick={() => setStep(Math.min(steps.length - 1, step + 1))} className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Continue</button>
            ) : (
              <button onClick={submit} disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60">
                {loading ? 'Generating...' : 'Download app brief'}
                {loading ? <FileText className="h-4 w-4" /> : <Download className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <PhonePreview preset={preset} form={form} logoPreview={logoPreview} />
          <EstimateSummary total={total} totalNaira={totalNaira} label="App estimate" />
        </aside>
      </div>
    </section>
  )
}

function PhonePreview({ preset, form, logoPreview }) {
  const config = preset?.preview_config || {}
  const accent = form.brand_color || preset?.accent_color || '#2563EB'
  const isVtu = preset?.preset_key === 'vtu-data-selling' || config.layout === 'vtu'
  const services = isVtu ? ['Airtime', 'Data', 'Electricity', 'Cable TV'] : (config.services || ['Home', 'Orders', 'Wallet', 'Profile'])

  return (
    <div className="mx-auto w-full max-w-[360px] rounded-[2rem] border border-slate-300 bg-slate-950 p-3 shadow-xl">
      <div className="overflow-hidden rounded-[1.5rem] bg-slate-100">
        <div className="flex items-center justify-between px-5 py-4 text-white" style={{ background: accent }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white text-xs font-bold text-slate-900">
              {logoPreview ? <img src={logoPreview} alt="App logo" className="h-full w-full object-cover" /> : (form.app_name || 'AV').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold">{form.app_name || 'Anjal App'}</p>
              <p className="text-xs text-white/70">{isVtu ? 'Wallet services' : preset?.category || 'Mobile app'}</p>
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-white/20" />
        </div>

        {isVtu ? (
          <div className="space-y-4 p-4">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold text-slate-500">Wallet balance</p>
              <p className="mt-1 text-2xl font-bold text-slate-950">{config.balance || 'NGN 125,400'}</p>
              <div className="mt-4 rounded-lg bg-slate-100 p-3">
                <p className="text-xs font-semibold text-slate-500">Mock funding account</p>
                <p className="mt-1 text-sm font-bold text-slate-950">{config.accountNumber || '9032145680'}</p>
                <p className="text-xs text-slate-500">{config.bank || 'Sterling Bank'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {services.map(label => (
                <div key={label} className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-5 h-8 w-8 rounded-lg" style={{ background: `${accent}22` }} />
                  <p className="text-sm font-bold text-slate-950">{label}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="mb-3 text-sm font-bold text-slate-950">Recent transactions</p>
              {['MTN Data bundle', 'Airtime top-up', 'Electricity token'].map((item, index) => (
                <div key={item} className="flex justify-between border-b border-slate-100 py-2 text-xs last:border-0">
                  <span className="text-slate-600">{item}</span>
                  <span className="font-bold text-slate-950">NGN {(index + 1) * 1200}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 p-4">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold text-slate-500">Today</p>
              <p className="mt-1 text-2xl font-bold text-slate-950">{preset?.name || 'Custom app'}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {services.map(label => (
                <div key={label} className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-5 h-8 w-8 rounded-lg" style={{ background: `${accent}22` }} />
                  <p className="text-sm font-bold text-slate-950">{label}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="h-3 w-3/4 rounded bg-slate-200" />
              <div className="mt-3 h-3 w-1/2 rounded bg-slate-200" />
              <div className="mt-5 h-20 rounded-lg" style={{ background: `${accent}18` }} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 border-t border-slate-200 bg-white px-3 py-3 text-center text-xs font-bold text-slate-500">
          <span className="text-slate-950">Home</span>
          <span>Transactions</span>
          <span>Profile</span>
        </div>
      </div>
    </div>
  )
}

function Input({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <input value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-600" />
    </label>
  )
}

function Select({ label, value, onChange, items }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <select value={value} onChange={e => onChange(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-600">
        {items.map(item => <option key={item} value={item}>{item}</option>)}
      </select>
    </label>
  )
}
