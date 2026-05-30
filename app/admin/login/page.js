'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Lock, Mail } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(data.error || 'Invalid admin credentials')
      }
    } catch {
      setError('Connection error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white flex items-center justify-center px-6 py-12">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="relative w-full max-w-5xl grid lg:grid-cols-[1.1fr_.9fr] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur">
        <section className="hidden lg:flex min-h-[620px] flex-col justify-between border-r border-white/10 p-10">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-2xl bg-white p-2">
              <Image src="/logo.png" alt="Anjal Ventures" fill className="object-contain p-2" />
            </div>
            <div>
              <p className="text-sm font-semibold">Anjal Ventures</p>
              <p className="text-xs text-white/45">Enterprise operations console</p>
            </div>
          </div>
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-blue-200/70">Premium Platform</p>
            <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-normal">
              Control projects, proposals, app studio leads, and live website content.
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm text-white/60">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">Projects</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">Proposals</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">App Studio</div>
          </div>
        </section>

        <section className="bg-white p-8 text-slate-950 sm:p-12">
          <div className="mb-10 lg:hidden">
            <div className="relative mb-4 h-14 w-14">
              <Image src="/logo.png" alt="Anjal Ventures" fill className="object-contain" />
            </div>
            <p className="text-sm font-semibold text-slate-500">Anjal Ventures Admin</p>
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-blue-600">Secure Access</p>
          <h2 className="mb-3 text-3xl font-semibold tracking-normal">Sign in to admin</h2>
          <p className="mb-8 text-sm leading-6 text-slate-500">
            Use your database-backed admin account. If this is the first login, the owner account is bootstrapped from environment credentials.
          </p>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
              <span className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-500 focus-within:bg-white">
                <Mail className="h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="owner@anjalventures.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
              <span className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-500 focus-within:bg-white">
                <Lock className="h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoFocus
                />
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? 'Authenticating...' : 'Sign in'}
            </button>
          </form>

          <a href="/" className="mt-8 inline-flex text-sm font-semibold text-slate-500 hover:text-slate-900">
            Return to website
          </a>
        </section>
      </div>
    </main>
  )
}
