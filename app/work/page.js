import Link from 'next/link'
import { CheckCircle2, MonitorSmartphone, Smartphone, Terminal } from 'lucide-react'
import PlatformShell from '@/components/PlatformShell'
import { CtaBand, ProjectGrid } from '@/components/PlatformSections'
import { getPlatformData } from '@/lib/platform-data'

export const metadata = {
  title: 'Selected Work & Case Studies - Anjal Ventures',
  description:
    'Production web platforms, mobile applications, and enterprise cloud systems designed, engineered, and maintained by Anjal Ventures.',
}

export default async function WorkPage() {
  const { settings, projects } = await getPlatformData()
  const appsCount = projects.filter(p => p.project_type === 'mobile-app').length
  const webCount = projects.filter(p => p.project_type === 'website' || p.project_type === 'saas').length

  return (
    <PlatformShell settings={settings}>
      {/* Executive Portfolio Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 px-5 py-24 text-white lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Verified Production Portfolio
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-white/50">
              Damaturu HQ · Global Client Reach
            </span>
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[1.04] tracking-tight md:text-7xl">
            Platforms, apps, and digital products built to operate.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
            Every engagement in our portfolio represents a real business problem solved with architectural rigor, high-conviction interface design, and clean full-stack code. We build for organizations that value operational longevity over quick prototypes.
          </p>

          {/* Portfolio Metric Indicators */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-3xl font-bold text-white">{projects.length || '12'}+</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/50">Total Shipped Systems</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-3xl font-bold text-emerald-400">{appsCount || '4'}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/50">Mobile App Releases</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-3xl font-bold text-blue-400">{webCount || '8'}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/50">Web & Cloud Platforms</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-3xl font-bold text-amber-400">99.95%</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/50">Target Uptime Standard</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <ProjectGrid
        projects={projects}
        title="All Published Systems & Case Studies"
        intro="Browse our verified client deployments across mobile applications, web platforms, and digital enterprise systems."
        filter="all"
      />

      <CtaBand settings={settings} />
    </PlatformShell>
  )
}
