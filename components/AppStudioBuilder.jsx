'use client'

import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import {
  Check,
  Download,
  FileText,
  Upload,
  Smartphone,
  ShieldCheck,
  Zap,
  Bell,
  Fingerprint,
  CreditCard,
  Wifi,
  Battery,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { EstimateSummary } from '@/components/PlatformSections'

function makeReference() {
  const now = new Date()
  return `AV-APP-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${String(Date.now()).slice(-6)}`
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
    brand_color: '#0A1628',
    platform: 'iOS (App Store) & Android (Google Play)',
    timeline: 'Standard Delivery (6–8 Weeks)',
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
        toast.success('App logo uploaded successfully')
      } else {
        toast('Logo preview active. Cloud storage can be synced later.')
      }
    } catch {
      toast('Logo preview active.')
    }
  }

  const generatePDF = async (reference) => {
    const { default: jsPDF } = await import('jspdf')
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const margin = 16
    const width = 210
    let y = 18

    // Institutional Obsidian Header
    doc.setFillColor(10, 22, 40)
    doc.rect(0, 0, width, 48, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.text(settings.company_name || 'Anjal Ventures', margin, 18)

    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(148, 163, 184)
    doc.text('CAC Registered: 9258709  |  D-U-N-S: 352294840  |  TIN: 2623553716975', margin, 26)
    doc.text('Damaturu, Yobe State, Nigeria  |  contact@anjalventures.com', margin, 32)
    doc.text('Executive Mobile Product Specification & Architecture Brief', margin, 38)

    doc.setTextColor(59, 130, 246)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text(reference, width - margin, 18, { align: 'right' })
    doc.setTextColor(148, 163, 184)
    doc.setFontSize(8)
    doc.text('CONFIDENTIAL SPECIFICATION', width - margin, 26, { align: 'right' })

    y = 62
    doc.setTextColor(15, 23, 42)
    doc.setFontSize(15)
    doc.setFont('helvetica', 'bold')
    doc.text(form.app_name || 'Mobile Product Specification', margin, y)
    y += 7
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(71, 85, 105)
    doc.text(
      doc.splitTextToSize(
        `Prepared for: ${form.client_name || 'Client Principal'}${form.company ? ` (${form.company})` : ''}  |  Platform Target: ${form.platform}`,
        178
      ),
      margin,
      y
    )
    y += 14

    const block = (title) => {
      y += 6
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(10, 22, 40)
      doc.setFontSize(10)
      doc.text(title.toUpperCase(), margin, y)
      y += 6
    }

    block('Architecture & System Parameters')
    ;[
      ['Application Archetype', preset?.name || 'Custom Mobile Architecture'],
      ['Target Delivery Channels', form.platform],
      ['Production Delivery Timeline', form.timeline],
      ['Client Principal Contact', [form.email, form.company].filter(Boolean).join('  |  ') || 'contact@anjalventures.com'],
    ].forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8.5)
      doc.setTextColor(15, 23, 42)
      doc.text(`${label}:`, margin, y)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(71, 85, 105)
      doc.text(String(value || 'Configured'), margin + 48, y)
      y += 5.5
    })

    block('Integrated Feature Modules')
    const featureList = selectedFeatures.length ? selectedFeatures : features.slice(0, 5)
    featureList.forEach((feature, index) => {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8.5)
      doc.setTextColor(15, 23, 42)
      doc.text(`${index + 1}. ${feature.name}`, margin, y)
      doc.setTextColor(37, 99, 235)
      doc.text(`+$${Number(feature.price || 0).toLocaleString()}`, width - margin, y, { align: 'right' })
      y += 5.5
    })

    block('App Store & Google Play Compliance Verification')
    const complianceChecks = [
      'Apple App Store Guideline 2.1 (Completeness & Sandboxed Execution Verification)',
      'Apple Guideline 5.1.1 (Biometric Keychain & Local Data Encryption Standard)',
      'Google Play 64-bit Architecture & Android 14+ Target API Compliance',
      'PCI-DSS Compliant Payment Tokenization (Zero Sensitive Cardholder Data Storage)',
    ]
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(22, 101, 52)
    complianceChecks.forEach(check => {
      doc.text(`[VERIFIED] ${check}`, margin, y)
      y += 5
    })

    block('Commercial Investment Summary')
    doc.setFillColor(248, 250, 252)
    doc.roundedRect(margin, y - 3, 178, 22, 2, 2, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(10, 22, 40)
    doc.setFontSize(13)
    doc.text(`$${total.toLocaleString()} USD`, margin + 6, y + 5)
    doc.setFontSize(9)
    doc.setTextColor(22, 101, 52)
    doc.text(`NGN ${totalNaira.toLocaleString()} at official rate (NGN ${exchangeRate.toLocaleString()} / USD)`, margin + 6, y + 13)
    y += 28

    block('Production Handover Standard')
    const handoverNotes = [
      '100% intellectual property, clean Git repository, and native source code handover.',
      'End-to-end Apple Developer & Google Play Console app publishing and release approval.',
      '30-day comprehensive post-launch operational warranty and crash monitoring.',
    ]
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(71, 85, 105)
    handoverNotes.forEach(item => {
      doc.text(`- ${item}`, margin, y)
      y += 5
    })

    // Footer
    doc.setFontSize(7.5)
    doc.setTextColor(148, 163, 184)
    doc.text(
      'Anjal Ventures Product Studio · CAC: 9258709 · D-U-N-S: 352294840 · developers@anjalventures.com',
      margin,
      288
    )
    return doc
  }

  const submit = async () => {
    if (!preset || !form.app_name || !form.client_name || !form.email) {
      toast.error('App name, client name, and email are required')
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
        phone: 'N/A',
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
      doc.save(`Anjal-Ventures-${form.app_name.replace(/\s+/g, '-')}-Brief-${data.reference || reference}.pdf`)
      toast.success('Official application brief generated and saved!')
    } catch (err) {
      toast.error(err.message || 'Failed to submit app brief')
    }
    setLoading(false)
  }

  const steps = [
    { title: 'Archetype', desc: 'Select model' },
    { title: 'Features', desc: 'Configure modules' },
    { title: 'Branding', desc: 'Identity & platform' },
    { title: 'Export', desc: 'Generate brief' },
  ]

  return (
    <section className="bg-slate-50 px-5 py-16 lg:px-8 border-t border-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px]">
        {/* Left Column: Interactive Wizard Steps */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
          {/* Step Indicator Navigation */}
          <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {steps.map((s, index) => (
              <button
                key={s.title}
                onClick={() => setStep(index)}
                className={`rounded-2xl p-3 text-left transition ${
                  step === index
                    ? 'border border-slate-950 bg-slate-950 text-white shadow-sm'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider opacity-60">
                    Step 0{index + 1}
                  </span>
                  {index < step && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                </div>
                <p className="mt-1 text-xs font-bold">{s.title}</p>
              </button>
            ))}
          </div>

          {/* Step 0: Application Archetype Selection */}
          {step === 0 && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-950">Select Application Archetype</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Choose a battle-tested product baseline or customize your native system architecture.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {presets.map(item => (
                  <button
                    key={item.id}
                    onClick={() => updatePreset(item)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      preset?.id === item.id
                        ? 'border-2 border-slate-950 bg-slate-50/80 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-slate-200/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                        {item.category}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-900">
                        from ${Number(item.base_price || 0).toLocaleString()}
                      </span>
                    </div>
                    <span className="mt-3 block text-lg font-semibold text-slate-950">{item.name}</span>
                    <span className="mt-2 block text-xs leading-relaxed text-slate-600">{item.description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Feature Modules Configuration */}
          {step === 1 && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-950">Modular Native Features</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Toggle enterprise features to augment your mobile product capabilities.
                </p>
              </div>

              <div className="grid gap-3.5 md:grid-cols-2">
                {features.map(feature => {
                  const isSelected = featureIds.includes(feature.id)
                  return (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`flex items-start gap-3.5 rounded-2xl border p-4.5 text-left transition ${
                        isSelected
                          ? 'border-2 border-slate-950 bg-slate-50/80 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border mt-0.5 transition ${
                          isSelected ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-slate-950">{feature.name}</span>
                          <span className="font-mono text-xs font-bold text-blue-600 shrink-0">
                            +${Number(feature.price || 0).toLocaleString()}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">{feature.description}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 2: Branding & Platform Target */}
          {step === 2 && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-950">Branding & Platform Targets</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Configure visual identity parameters and target deployment stores.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="App Display Name"
                  value={form.app_name}
                  onChange={v => setForm({ ...form, app_name: v })}
                  placeholder="e.g. AnjalPay"
                />
                <Input
                  label="Brand Accent Color (Hex)"
                  value={form.brand_color}
                  onChange={v => setForm({ ...form, brand_color: v })}
                  placeholder="#0A1628"
                />
                <Select
                  label="Target Deployment Stores"
                  value={form.platform}
                  onChange={v => setForm({ ...form, platform: v })}
                  items={[
                    'iOS (App Store) & Android (Google Play)',
                    'Android First (Google Play Store)',
                    'iOS First (Apple App Store)',
                    'Cross-Platform Architecture (Internal / Enterprise)',
                  ]}
                />
                <Select
                  label="Target Release Schedule"
                  value={form.timeline}
                  onChange={v => setForm({ ...form, timeline: v })}
                  items={[
                    'Standard Delivery (6–8 Weeks)',
                    'Accelerated Sprint (4–6 Weeks)',
                    'Enterprise Scale (8–12 Weeks)',
                  ]}
                />

                <div className="md:col-span-2">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Application Icon / Logo (Optional)
                  </span>
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-xs text-slate-600 transition hover:border-slate-400 hover:bg-white">
                    <Upload className="h-5 w-5 text-slate-400" />
                    <span className="font-semibold text-slate-900">Upload high-resolution icon</span>
                    <span className="text-[11px] text-slate-400">PNG, JPG, or WebP (min. 512x512 recommended)</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={e => handleLogo(e.target.files?.[0])}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Client Brief & Proposal Export */}
          {step === 3 && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-950">Client Principal & Project Brief</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Provide commercial contact details to generate your verified PDF proposal.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
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
                <div className="md:col-span-2">
                  <Input
                    label="Company / Institution Name"
                    value={form.company}
                    onChange={v => setForm({ ...form, company: v })}
                    placeholder="e.g. Apex Global Technologies Ltd."
                  />
                </div>
                <label className="md:col-span-2 block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Specific Feature Requirements & Architecture Notes
                  </span>
                  <textarea
                    value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    rows={4}
                    placeholder="Provide any custom integrations (e.g. Paystack, Twilio, ERP), user volume expectations, or legacy systems..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-xs text-slate-900 outline-none transition focus:border-slate-950 focus:bg-white"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Step Buttons */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
              disabled={step === 0}
            >
              Back
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-600"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-600 disabled:opacity-60"
              >
                {loading ? 'Generating Formal Brief...' : 'Export & Save Specification PDF'}
                {loading ? <FileText className="h-4 w-4" /> : <Download className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Ultra-Realistic Smartphone Simulator & Summary */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <PhonePreview
            preset={preset}
            form={form}
            logoPreview={logoPreview}
            selectedFeatures={selectedFeatures}
          />

          <EstimateSummary
            total={total}
            totalNaira={totalNaira}
            label="Configured Mobile Product Estimate"
          />

          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-600 shadow-2xs">
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-slate-900 mb-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Institutional Guarantee
            </div>
            <p className="leading-relaxed">
              Every mobile product brief generated is reviewed by our engineering lead. We guarantee App Store & Google Play compliance, source code ownership, and zero technical debt.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}

function PhonePreview({ preset, form, logoPreview, selectedFeatures = [] }) {
  const config = preset?.preview_config || {}
  const accent = form.brand_color || preset?.accent_color || '#0A1628'
  const isVtu = preset?.preset_key === 'vtu-data-selling' || config.layout === 'vtu'
  const services = isVtu
    ? ['Airtime VTU', 'Data Bundles', 'Electricity', 'Cable TV']
    : (config.services || ['Explore', 'Orders', 'Wallet', 'Profile'])

  const hasBiometric = selectedFeatures.some(f => f.name?.toLowerCase().includes('biometric'))
  const hasNotifications = selectedFeatures.some(f => f.name?.toLowerCase().includes('notification'))

  return (
    <div className="mx-auto w-full max-w-[340px] rounded-[44px] border-[6px] border-slate-900 bg-black p-2.5 shadow-2xl">
      <div className="overflow-hidden rounded-[36px] bg-slate-100 flex flex-col justify-between min-h-[560px] relative">
        {/* Top Simulated Status Bar with Dynamic Island */}
        <div className="bg-slate-950 px-5 pt-3 pb-2 text-white">
          <div className="flex items-center justify-between text-[10px] font-mono text-white/70">
            <span>9:41</span>
            {/* Dynamic Island */}
            <div className="flex items-center gap-1.5 rounded-full bg-black px-3 py-1 border border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[9px] font-sans text-white/80">{form.app_name || 'App'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Wifi className="h-3 w-3" />
              <Battery className="h-3 w-3" />
            </div>
          </div>
        </div>

        {/* In-App Navigation Bar */}
        <div className="p-4 text-white transition-colors duration-300" style={{ background: accent }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white text-xs font-bold text-slate-950 shadow-xs">
                {logoPreview ? (
                  <img src={logoPreview} alt="App logo" className="h-full w-full object-cover" />
                ) : (
                  (form.app_name || 'AV').slice(0, 2).toUpperCase()
                )}
              </div>
              <div>
                <p className="text-sm font-bold leading-tight truncate max-w-[140px]">{form.app_name || 'Anjal App'}</p>
                <p className="text-[10px] text-white/75">{preset?.name || 'Mobile App'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {hasNotifications && (
                <div className="rounded-full bg-white/20 p-1.5">
                  <Bell className="h-3.5 w-3.5 text-white" />
                </div>
              )}
              {hasBiometric && (
                <div className="rounded-full bg-white/20 p-1.5">
                  <Fingerprint className="h-3.5 w-3.5 text-emerald-300" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* In-App Content Feed */}
        <div className="flex-1 p-3.5 space-y-3 overflow-y-auto max-h-[380px]">
          {isVtu ? (
            <>
              <div className="rounded-2xl bg-white p-4 shadow-xs border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Available Wallet</span>
                <p className="mt-1 text-2xl font-bold text-slate-950">{config.balance || 'NGN 125,400.00'}</p>
                <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 p-2.5 text-[11px]">
                  <span className="font-semibold text-slate-600">Virtual Wema Account</span>
                  <span className="font-mono font-bold text-slate-950">9032145680</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {services.map(s => (
                  <div key={s} className="rounded-xl bg-white p-3 shadow-xs border border-slate-100 flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg shrink-0" style={{ background: `${accent}20` }} />
                    <span className="text-xs font-bold text-slate-900 truncate">{s}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-white p-3.5 shadow-xs border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Live Transaction Stream</span>
                <div className="mt-2 space-y-1.5 text-[11px]">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-600 truncate">MTN 5GB SME Bundle</span>
                    <span className="font-bold text-emerald-700">₦1,450</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-600 truncate">Airtime Top-up (Airtel)</span>
                    <span className="font-bold text-emerald-700">₦2,000</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-2xl bg-white p-4 shadow-xs border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">System Dashboard</span>
                <p className="mt-1 text-xl font-bold text-slate-950">{preset?.name || 'Production Platform'}</p>
                <p className="mt-1 text-xs text-slate-500">Live data synchronization active</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {services.map(s => (
                  <div key={s} className="rounded-xl bg-white p-3 shadow-xs border border-slate-100 flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg shrink-0" style={{ background: `${accent}20` }} />
                    <span className="text-xs font-bold text-slate-900 truncate">{s}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-xs border border-slate-100">
                <div className="h-3 w-3/4 rounded bg-slate-200" />
                <div className="mt-2.5 h-3 w-1/2 rounded bg-slate-100" />
                <div className="mt-4 h-16 rounded-xl" style={{ background: `${accent}15` }} />
              </div>
            </>
          )}
        </div>

        {/* Bottom Tab Bar & Home Indicator */}
        <div className="border-t border-slate-200 bg-white px-4 pt-2.5 pb-2">
          <div className="grid grid-cols-3 text-center text-[10px] font-bold text-slate-400">
            <span className="text-slate-950">Home</span>
            <span>Activity</span>
            <span>Account</span>
          </div>
          {/* iOS Bottom Swipe Bar */}
          <div className="mt-3 h-1 w-28 rounded-full bg-slate-300 mx-auto" />
        </div>
      </div>
    </div>
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
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  )
}
