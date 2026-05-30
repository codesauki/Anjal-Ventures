'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Mail, Menu, Phone, X } from 'lucide-react'
import { useState } from 'react'

const nav = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/app-studio', label: 'App Studio' },
  { href: '/quote', label: 'Quote' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader({ settings = {} }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="relative h-10 w-10 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <Image src="/logo.png" alt="Anjal Ventures" fill className="object-contain p-1.5" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold tracking-normal text-slate-950">{settings.company_name || 'Anjal Ventures'}</span>
            <span className="hidden text-xs text-slate-500 sm:block">Product studio and digital infrastructure</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/quote" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-950">
            Start quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-800 lg:hidden"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
          <div className="grid gap-2">
            {nav.map(item => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export function SiteFooter({ settings = {} }) {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_.8fr_.8fr] lg:px-8">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="relative h-10 w-10 overflow-hidden rounded-lg bg-white">
              <Image src="/logo.png" alt="Anjal Ventures" fill className="object-contain p-1.5" />
            </span>
            <div>
              <p className="font-bold">{settings.company_name || 'Anjal Ventures'}</p>
              <p className="text-xs text-white/45">{settings.company_cac || 'BN 9258709'}</p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/60">
            {settings.footer_tagline || 'Premium digital products from Damaturu to the world.'}
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">Explore</p>
          <div className="grid gap-2 text-sm text-white/65">
            {nav.map(item => <Link key={item.href} href={item.href} className="hover:text-white">{item.label}</Link>)}
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">Contact</p>
          <div className="space-y-3 text-sm text-white/65">
            <a href={`mailto:${settings.company_email || 'anjalventures@gmail.com'}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="h-4 w-4" />
              {settings.company_email || 'anjalventures@gmail.com'}
            </a>
            <a href={`tel:${settings.company_phone || ''}`} className="flex items-center gap-2 hover:text-white">
              <Phone className="h-4 w-4" />
              {settings.company_phone || '+234 000 000 0000'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function PlatformShell({ settings, children }) {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SiteHeader settings={settings} />
      {children}
      <SiteFooter settings={settings} />
    </div>
  )
}
