'use client'

import AdminSidebar from '@/components/AdminSidebar'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, BriefcaseBusiness, FileText, Inbox, Smartphone } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [messages, setMessages] = useState([])
  const [submissions, setSubmissions] = useState([])

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/projects').then(r => r.json()),
      fetch('/api/admin/contacts').then(r => r.json()),
      fetch('/api/admin/quotations').then(r => r.json()),
      fetch('/api/admin/app-studio').then(r => r.json()),
    ]).then(([projects, contacts, quotations, studio]) => {
      const safeContacts = Array.isArray(contacts) ? contacts : []
      const safeQuotes = Array.isArray(quotations) ? quotations : []
      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        apps: (Array.isArray(projects) ? projects : []).filter(p => p.project_type === 'mobile-app').length,
        contacts: safeContacts.length,
        unread: safeContacts.filter(c => !c.is_read).length,
        quotations: safeQuotes.length,
        appLeads: studio?.submissions?.length || 0,
      })
      setMessages(safeContacts.slice(0, 5))
      setSubmissions((studio?.submissions || []).slice(0, 5))
    }).catch(() => {})
  }, [])

  const tiles = [
    { label: 'Projects', value: stats?.projects ?? '-', icon: BriefcaseBusiness, href: '/admin/projects' },
    { label: 'Mobile apps', value: stats?.apps ?? '-', icon: Smartphone, href: '/admin/projects' },
    { label: 'Proposals', value: stats?.quotations ?? '-', icon: FileText, href: '/admin/quotations' },
    { label: 'Leads', value: stats?.contacts ?? '-', icon: Inbox, href: '/admin/contacts', badge: stats?.unread },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Admin</p>
            <h1 className="text-3xl font-semibold tracking-normal text-slate-950">Operations dashboard</h1>
            <p className="mt-2 text-sm text-slate-500">Manage the public platform, proposals, App Studio leads, and content.</p>
          </div>
          <Link href="/app-studio" target="_blank" className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
            Preview App Studio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {tiles.map(tile => {
            const Icon = tile.icon
            return (
              <Link key={tile.label} href={tile.href} className="relative rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
                <Icon className="mb-8 h-5 w-5 text-blue-700" />
                <p className="text-4xl font-bold text-slate-950">{tile.value}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500">{tile.label}</p>
                {tile.badge > 0 && <span className="absolute right-4 top-4 rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">{tile.badge}</span>}
              </Link>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Recent leads" href="/admin/contacts">
            {messages.length === 0 ? <Empty text="No contact leads yet." /> : messages.map(message => (
              <Row key={message.id} title={message.name} meta={[message.email, message.service].filter(Boolean).join(' / ')} value={new Date(message.created_at).toLocaleDateString()} />
            ))}
          </Panel>
          <Panel title="App Studio submissions" href="/admin/app-studio">
            {submissions.length === 0 ? <Empty text="No App Studio submissions yet." /> : submissions.map(item => (
              <Row key={item.id} title={item.app_name} meta={`${item.client_name || 'Client'} / ${item.preset_key || 'preset'}`} value={`$${Number(item.total_amount || 0).toLocaleString()}`} />
            ))}
          </Panel>
        </div>
      </main>
    </div>
  )
}

function Panel({ title, href, children }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">{title}</h2>
        <Link href={href} className="text-sm font-bold text-blue-700">Open</Link>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

function Row({ title, meta, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-slate-950">{title || 'Untitled'}</p>
        <p className="mt-1 truncate text-xs text-slate-500">{meta}</p>
      </div>
      <p className="text-xs font-bold text-slate-500">{value}</p>
    </div>
  )
}

function Empty({ text }) {
  return <p className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">{text}</p>
}
