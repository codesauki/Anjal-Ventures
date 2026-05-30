'use client'

import AdminSidebar from '@/components/AdminSidebar'
import toast, { Toaster } from 'react-hot-toast'
import { Mail, MessageCircle, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function AdminQuotations() {
  const [quotations, setQuotations] = useState([])
  const [expanded, setExpanded] = useState(null)

  const load = async () => {
    const res = await fetch('/api/admin/quotations')
    const data = await res.json()
    setQuotations(Array.isArray(data) ? data : [])
  }

  useEffect(() => { load() }, [])

  const remove = async (id) => {
    if (!confirm('Delete this proposal record?')) return
    await fetch(`/api/admin/quotations?id=${id}`, { method: 'DELETE' })
    toast.success('Proposal deleted')
    load()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-right" />
      <AdminSidebar />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Proposals</p>
          <h1 className="text-3xl font-semibold tracking-normal text-slate-950">Quotations and proposal requests</h1>
          <p className="mt-2 text-sm text-slate-500">{quotations.length} total records from quote builder and legacy forms.</p>
        </div>

        <div className="space-y-4">
          {quotations.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">No proposals yet.</div>
          ) : quotations.map(q => {
            const items = safeJson(q.selected_items, [])
            const payload = safeJson(q.proposal_payload, {})
            return (
              <article key={q.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <button onClick={() => setExpanded(expanded === q.id ? null : q.id)} className="flex w-full items-start justify-between gap-4 text-left">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">{q.reference || `AV-${q.id}`}</span>
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{q.quote_type || 'project'}</span>
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{q.status || 'new'}</span>
                    </div>
                    <h2 className="text-lg font-semibold text-slate-950">{q.project_title || q.client_name || 'Untitled proposal'}</h2>
                    <p className="mt-1 text-sm text-slate-500">{[q.client_name, q.entity_name, q.email, q.phone].filter(Boolean).join(' / ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-700">${Number(q.total_amount || 0).toLocaleString()}</p>
                    <p className="mt-1 text-xs text-slate-500">{new Date(q.created_at).toLocaleDateString()}</p>
                  </div>
                </button>

                {expanded === q.id && (
                  <div className="mt-5 border-t border-slate-100 pt-5">
                    <div className="grid gap-5 lg:grid-cols-[1fr_.8fr]">
                      <div className="rounded-lg bg-slate-50 p-4">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Selected scope</p>
                        <div className="space-y-2">
                          {items.length === 0 ? <p className="text-sm text-slate-500">No line items stored.</p> : items.map((item, index) => (
                            <div key={`${item.id || item.name}-${index}`} className="flex justify-between gap-4 border-b border-slate-200 pb-2 text-sm last:border-0">
                              <span className="text-slate-700">{item.name}</span>
                              <span className="font-bold text-slate-950">${Number(item.calculated_price || item.base_price || 0).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-4">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Notes</p>
                        <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">{q.notes || payload?.notes || 'No notes provided.'}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {q.email && <a href={`mailto:${q.email}?subject=Your Anjal Ventures Proposal`} className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-bold text-white"><Mail className="h-4 w-4" />Email</a>}
                      {q.phone && <a href={`https://wa.me/${String(q.phone).replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" />WhatsApp</a>}
                      <button onClick={() => remove(q.id)} className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-700"><Trash2 className="h-4 w-4" />Delete</button>
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </main>
    </div>
  )
}

function safeJson(value, fallback) {
  if (!value) return fallback
  if (typeof value !== 'string') return value
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}
