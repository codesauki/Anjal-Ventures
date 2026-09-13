import PlatformShell from '@/components/PlatformShell'
import { CtaBand, ProjectGrid } from '@/components/PlatformSections'
import { getPlatformData } from '@/lib/platform-data'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Mobile Applications Portfolio - Anjal Ventures',
  description:
    'Production iOS and Android applications engineered by Anjal Ventures with Apple App Store and Google Play deployments.',
}

export default async function AppsWorkPage() {
  const { settings, projects } = await getPlatformData()
  const apps = projects.filter(p => p.project_type === 'mobile-app')

  return (
    <PlatformShell settings={settings}>
      {/* Mobile Apps Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 px-5 py-24 text-white lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Apple App Store & Google Play
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-white/50">
              Native & Cross-Platform Builds
            </span>
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[1.04] tracking-tight md:text-7xl">
            Mobile products with real interfaces and real workflows.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
            Explore our shipped mobile applications for iOS and Android. Engineered with offline-first synchronization, biometric security, camera integrations, push notification engines, and direct store compliance.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              ✓ App Store Review Compliant
            </span>
            <span className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              ✓ Google Play Store Verified
            </span>
            <span className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              ✓ Offline-First Data Synchronization
            </span>
            <span className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              ✓ Hardware & Biometrics Gateways
            </span>
          </div>
        </div>
      </section>

      <ProjectGrid
        projects={projects}
        title="Mobile Application Deployments"
        intro="Verified smartphone and tablet applications built and maintained for high user retention and security."
        filter="apps"
      />

      <CtaBand settings={settings} />
    </PlatformShell>
  )
}
