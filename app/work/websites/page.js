import PlatformShell from '@/components/PlatformShell'
import { CtaBand, ProjectGrid } from '@/components/PlatformSections'
import { getPlatformData } from '@/lib/platform-data'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Web Platforms & SaaS Showcase | Anjal Solutions LTD',
  description:
    'High-performance corporate websites, cloud portals, and SaaS platforms engineered by Anjal Solutions LTD.',
}

export default async function WebsitesWorkPage() {
  const { settings, projects } = await getPlatformData()

  return (
    <PlatformShell settings={settings}>
      {/* Web Platforms Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 px-5 py-24 text-white lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              Full-Stack Web & Cloud Systems
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-white/50">
              Next.js 14 · Distributed SSR · Headless CMS
            </span>
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[1.04] tracking-tight md:text-7xl">
            Web platforms and cloud architectures built for speed and authority.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
            Enterprise web systems engineered with sub-second page loads, distributed edge caching, intuitive content management, and robust administrative portals.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              ✓ Core Web Vitals 95+ Performance
            </span>
            <span className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              ✓ Edge Caching & Multi-Region CDN
            </span>
            <span className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              ✓ Multi-Role Admin & RBAC Workflows
            </span>
            <span className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              ✓ Automated Database Snapshots & CI/CD
            </span>
          </div>
        </div>
      </section>

      <ProjectGrid
        projects={projects}
        title="Web Platforms & SaaS Portals"
        intro="Verified cloud websites, enterprise dashboards, and web-based software platforms."
        filter="websites"
      />

      <CtaBand settings={settings} />
    </PlatformShell>
  )
}
