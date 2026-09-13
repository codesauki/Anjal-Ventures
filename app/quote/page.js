import { Toaster } from 'react-hot-toast'
import PlatformShell from '@/components/PlatformShell'
import QuoteBuilder from '@/components/QuoteBuilder'
import { getPlatformData } from '@/lib/platform-data'
import { CheckCircle2, ShieldCheck, Zap, Coins } from 'lucide-react'

export const metadata = {
  title: 'Enterprise Architecture Estimator & Proposal Engine - Anjal Ventures',
  description:
    'Configure your project scope, select scale and technical add-ons, view transparent USD & NGN pricing, and download an executive proposal PDF.',
}

export default async function QuotePage() {
  const { settings, calculator } = await getPlatformData()

  return (
    <PlatformShell settings={settings}>
      <Toaster position="top-right" />
      {/* Executive Obsidian Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 px-5 py-24 text-white lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Transparent Scope & Investment
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-white/50">
              Live FX: ₦{Number(settings.exchange_rate || 1400).toLocaleString()} / $1 USD
            </span>
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[1.04] tracking-tight md:text-7xl">
            Configure your project scope and proposal in minutes.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
            Select your architectural archetype, configure concurrency and velocity, add specialized capabilities, and instantly download a formal, itemized proposal PDF with milestone schedules and institutional warranties.
          </p>

          {/* Value Guarantee Ribbons */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 text-left">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Coins className="h-4 w-4 shrink-0" />
                Transparent Pricing
              </p>
              <p className="mt-2 text-xs text-white/60">
                Fixed-price certainty with granular line-item deliverables.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                Institutional Proof
              </p>
              <p className="mt-2 text-xs text-white/60">
                Proposals certified with CAC: 9258709 and D-U-N-S: 352294840.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Zap className="h-4 w-4 shrink-0" />
                Instant PDF Export
              </p>
              <p className="mt-2 text-xs text-white/60">
                Formal executive proposal ready for internal stakeholder review.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Zero Tech Debt
              </p>
              <p className="mt-2 text-xs text-white/60">
                Full code ownership, comprehensive tests, and 30-day warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Quote Builder Configurator */}
      <QuoteBuilder settings={settings} calculator={calculator} />
    </PlatformShell>
  )
}
