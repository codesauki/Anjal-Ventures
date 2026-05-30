'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  BarChart3,
  BriefcaseBusiness,
  Calculator,
  FileText,
  Inbox,
  Layers3,
  LogOut,
  MessageSquareQuote,
  Settings,
  Smartphone,
  Star,
  Users,
  WalletCards,
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: BarChart3 },
  { href: '/admin/projects', label: 'Projects', icon: BriefcaseBusiness },
  { href: '/admin/app-studio', label: 'App Studio', icon: Smartphone },
  { href: '/admin/services', label: 'Services', icon: Layers3 },
  { href: '/admin/pricing', label: 'Pricing', icon: WalletCards },
  { href: '/admin/calculator', label: 'Quote Catalog', icon: Calculator },
  { href: '/admin/quotations', label: 'Proposals', icon: FileText },
  { href: '/admin/contacts', label: 'Leads', icon: Inbox },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
  { href: '/admin/users', label: 'Admin Users', icon: Users },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-5">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-slate-200">
            <Image src="/logo.png" alt="Anjal Ventures" fill className="object-contain p-1.5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-950">Anjal Ventures</p>
            <p className="text-xs text-slate-500">Operations console</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Platform</p>
        <div className="space-y-1">
          {navItems.map(item => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${active ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>

      <div className="border-t border-slate-200 p-4">
        <Link href="/" target="_blank" className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">
          <MessageSquareQuote className="h-4 w-4" />
          View website
        </Link>
        <button onClick={handleLogout} disabled={loggingOut} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">
          <LogOut className="h-4 w-4" />
          {loggingOut ? 'Signing out...' : 'Sign out'}
        </button>
      </div>
    </aside>
  )
}
