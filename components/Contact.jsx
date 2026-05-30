'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'

export default function Contact({ settings = {}, services = [] }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', budget: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      toast.error('Name, email, and message are required')
      return
    }
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const pubKey = settings?.emailjs_public_key
      const serviceId = settings?.emailjs_service_id
      const templateId = settings?.emailjs_template_id

      if (pubKey && serviceId && templateId && typeof window !== 'undefined') {
        try {
          if (!window._ejsInit) {
            const emailjs = (await import('@emailjs/browser')).default
            emailjs.init(pubKey)
            window._ejsInit = emailjs
          }
          await window._ejsInit.send(serviceId, templateId, {
            from_name: form.name,
            from_email: form.email,
            phone: form.phone || 'Not provided',
            service: form.service || 'Not specified',
            budget: form.budget || 'Not specified',
            message: form.message,
            to_email: settings?.company_email || 'contact@anjal.com',
          })
        } catch {
          toast.error('Message saved, but email notification failed.')
        }
      }

      setSent(true)
      toast.success("Message sent. We'll respond soon.")
      setForm({ name: '', email: '', phone: '', service: '', budget: '', message: '' })
    } catch {
      toast.error('Failed to send message. Please try again.')
    }
    setLoading(false)
  }

  const email1 = settings.company_email || 'anjalventures@gmail.com'
  const email2 = settings.company_email2 || 'contact@anjal.com'
  const wa = settings.company_whatsapp || '2348164135836'
  const address = settings.company_address || 'Damaturu, Yobe State, Nigeria'
  const phone = settings.company_phone || '+234 000 000 0000'

  return (
    <section id="contact" className="bg-slate-50 px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <aside>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Contact</p>
          <h2 className="text-4xl font-semibold tracking-normal text-slate-950">Start with a focused conversation.</h2>
          <p className="mt-5 text-base leading-7 text-slate-600">Share the business context, product idea, or system challenge. Anjal Ventures will respond with the right next step.</p>

          <div className="mt-10 space-y-4">
            <ContactLink icon={Mail} label="Primary email" value={email1} href={`mailto:${email1}`} />
            <ContactLink icon={Mail} label="Alternative email" value={email2} href={`mailto:${email2}`} />
            <ContactLink icon={Phone} label="Phone" value={phone} href={`tel:${phone}`} />
            <ContactLink icon={MessageCircle} label="WhatsApp" value="Chat on WhatsApp" href={`https://wa.me/${wa.replace(/[^0-9]/g, '')}`} />
            <ContactLink icon={MapPin} label="Location" value={address} />
          </div>
        </aside>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Full name" value={form.name} onChange={v => setForm({ ...form, name: v })} required />
            <Input label="Email" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} required />
            <Input label="Phone / WhatsApp" value={form.phone} onChange={v => setForm({ ...form, phone: v })} />
            <label>
              <span className="mb-2 block text-sm font-semibold text-slate-700">Service</span>
              <select className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-600" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                <option value="">Select service</option>
                {services.map(s => <option key={s.id || s.name} value={s.name}>{s.name}</option>)}
                <option value="Consultation">Consultation</option>
              </select>
            </label>
            <label className="md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Budget range</span>
              <select className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-600" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                <option value="">Select budget</option>
                <option>$100 - $300</option>
                <option>$300 - $700</option>
                <option>$700 - $2,000</option>
                <option>$2,000+</option>
                <option>To be scoped</option>
              </select>
            </label>
            <label className="md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Message</span>
              <textarea rows={6} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-600" />
            </label>
          </div>

          {sent && <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">Message sent. Thank you.</div>}

          <button onClick={handleSubmit} disabled={loading} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-60">
            {loading ? 'Sending...' : 'Send message'}
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

function ContactLink({ icon: Icon, label, value, href }) {
  const content = (
    <span className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4">
      <Icon className="mt-0.5 h-4 w-4 text-blue-700" />
      <span>
        <span className="block text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{label}</span>
        <span className="mt-1 block text-sm font-semibold text-slate-800">{value}</span>
      </span>
    </span>
  )
  if (!href) return content
  return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="block transition hover:-translate-y-0.5">{content}</a>
}

function Input({ label, value, onChange, type = 'text', required }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}{required ? ' *' : ''}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-600" />
    </label>
  )
}
