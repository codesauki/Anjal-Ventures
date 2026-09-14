import { Toaster } from 'react-hot-toast'
import PlatformShell from '@/components/PlatformShell'
import AppStudioBuilder from '@/components/AppStudioBuilder'
import { getPlatformData } from '@/lib/platform-data'
import { CheckCircle2, Smartphone, ShieldCheck, Zap } from 'lucide-react'

export const metadata = {
  title: 'Interactive Mobile App Studio | Anjal Solutions LTD',
  description:
    'Architect your mobile application brief in real time. Configure presets, native features, preview interface screens, and download an institutional proposal brief.',
}

export default async function AppStudioPage() {
  const { settings, appStudio } = await getPlatformData()

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
              Interactive Mobile Configurator
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-white/50">
              iOS (App Store) & Android (Google Play)
            </span>
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[1.04] tracking-tight md:text-7xl">
            Architect your mobile product brief in real time.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
            Select an application archetype, toggle modular enterprise features, preview the smartphone interface live, and download an executive product specification brief with transparent investment breakdown and store-readiness audit.
          </p>

          {/* Value Guarantee Ribbons */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 text-left">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Store Release SLA
              </p>
              <p className="mt-2 text-xs text-white/60">
                Guaranteed submission & approval on Apple App Store & Google Play.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                Enterprise Security
              </p>
              <p className="mt-2 text-xs text-white/60">
                Biometric gate, encrypted SQLite cache & hardened JWT auth tokens.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Zap className="h-4 w-4 shrink-0" />
                Instant Specification
              </p>
              <p className="mt-2 text-xs text-white/60">
                Generates a formal scope PDF with CAC & D-U-N-S verification.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-400">
                <Smartphone className="h-4 w-4 shrink-0" />
                100% IP Handover
              </p>
              <p className="mt-2 text-xs text-white/60">
                Complete Flutter / React Native source code in client repository.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Studio Builder */}
      <AppStudioBuilder settings={settings} presets={appStudio} />
    </PlatformShell>
  )
}
