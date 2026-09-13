'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  Database,
  Gauge,
  Globe2,
  GraduationCap,
  Layers3,
  MonitorSmartphone,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import { formatMoney } from '@/lib/format'
import { normalizeCacNumber } from '@/lib/company'
import ProjectStoreBadges from '@/components/StoreBadges'

const iconMap = {
  globe: Globe2,
  smartphone: Smartphone,
  layers: Layers3,
  sparkles: Sparkles,
  briefcase: BriefcaseBusiness,
  'graduation-cap': GraduationCap,
  platform: MonitorSmartphone,
}

export function SectionIntro({ eyebrow, title, text, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto mb-12 max-w-3xl text-center' : 'mb-12 max-w-3xl'}>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-blue-700">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-normal text-slate-950 md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg">{text}</p>}
    </div>
  )
}

export function Hero({ settings = {} }) {
  const cacNum = normalizeCacNumber(settings.company_cac)
  const dunsNum = settings.company_duns || '352294840'
  const defaultBadge = `CAC Registered: ${cacNum} · D-U-N-S: ${dunsNum} · Active`
  const badge = settings.hero_badge && !settings.hero_badge.includes('BN') ? settings.hero_badge : defaultBadge
  const title = settings.hero_title || 'We build the digital products businesses actually use.'
  const description =
    settings.hero_description ||
    'From websites and mobile apps to marketplaces, SaaS platforms, digital automations and internal systems, Anjal Ventures turns ideas into working digital products for individuals, businesses and organisations — designed, built and maintained from Nigeria.'
  const tagline = settings.hero_tagline || 'Built for people. Built for businesses. Built to work.'

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
      <div className="absolute inset-0">
        <Image src="/hero-bg.png" alt="" fill priority className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#07111f_0%,rgba(7,17,31,.93)_46%,rgba(7,17,31,.55)_100%)]" />
      </div>
      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {badge}
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-tight md:text-7xl">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75">
            {description}
          </p>
          <p className="mt-4 text-base font-semibold tracking-wide text-blue-200/90 md:text-lg">
            {tagline}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/app-studio" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-50">
              Design an app
              <Smartphone className="h-4 w-4" />
            </Link>
            <Link href="/work" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
              View work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-lg border border-white/12 bg-white/[0.06] p-5 backdrop-blur">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm font-semibold text-white/70">Studio operating system</p>
              <Gauge className="h-5 w-5 text-emerald-300" />
            </div>
            <div className="grid gap-3">
              {[
                ['Discovery', 'Scope, users, data, risks'],
                ['Design', 'Flows, interface, content'],
                ['Engineering', 'Cloud, APIs, admin, QA'],
                ['Launch', 'Deployment, training, support'],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[110px_1fr] items-center gap-4 rounded-lg border border-white/10 bg-slate-950/35 p-3">
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="text-sm text-white/55">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              ['40+', 'Projects'],
              ['100%', 'Ownership'],
              ['24h', 'Response'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-white/12 bg-white/[0.06] p-4">
                <p className="text-2xl font-bold">{value}</p>
                <p className="mt-1 text-xs text-white/45">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ServicesGrid({ services = [] }) {
  return (
    <section className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Capabilities"
          title="Systems, not just pages."
          text="Each engagement combines product strategy, user experience, engineering, deployment, and support."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map(service => {
            const Icon = iconMap[service.icon] || MonitorSmartphone
            return (
              <div key={service.id || service.name} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md">
                <Icon className="mb-8 h-6 w-6 text-blue-700" />
                <h3 className="text-xl font-semibold text-slate-950">{service.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {(service.tags || []).slice(0, 4).map(tag => (
                    <span key={tag} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{tag}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function ProjectGrid({ projects = [], filter = 'all', title = 'Selected work', intro }) {
  const appsCount = projects.filter(p => p.project_type === 'mobile-app').length
  const websitesCount = projects.filter(p => p.project_type === 'website' || p.project_type === 'saas').length

  const filtered = projects.filter(project => {
    if (filter === 'all') return true
    if (filter === 'apps') return project.project_type === 'mobile-app'
    if (filter === 'websites') return project.project_type === 'website' || project.project_type === 'saas'
    return project.project_type === filter
  })

  return (
    <section className="bg-slate-50 px-5 py-24 lg:px-8 border-t border-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Studio Portfolio</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">{title}</h2>
            {intro && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">{intro}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/work"
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                filter === 'all'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-400'
              }`}
            >
              All Systems ({projects.length})
            </Link>
            <Link
              href="/work/apps"
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                filter === 'apps'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-400'
              }`}
            >
              Mobile Apps ({appsCount})
            </Link>
            <Link
              href="/work/websites"
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                filter === 'websites'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-400'
              }`}
            >
              Web & SaaS ({websitesCount})
            </Link>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center text-slate-500">
            <MonitorSmartphone className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <p className="text-base font-semibold text-slate-950">No published projects in this category yet</p>
            <p className="mt-1 text-sm text-slate-500">Case studies will appear here once published from the admin panel.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {filtered.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export function ProjectCard({ project }) {
  const media = project.media || []
  const portrait = media.filter(item => item.orientation === 'portrait').slice(0, 4)
  const primary = media.find(item => item.is_primary) || media[0]
  const href = `/work/${project.slug || project.id}`
  const hasStores = Boolean(project.app_store_url || project.play_store_url)
  const isApp = project.project_type === 'mobile-app'

  return (
    <Link href={href} className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs transition duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl">
      <div>
        {/* Device Frame Staging */}
        <div className="relative overflow-hidden bg-slate-950">
          {isApp ? (
            /* Smartphone Multi-Screen Device Mockup Frame */
            <div className="relative min-h-[300px] p-6 bg-gradient-to-b from-slate-900 to-slate-950">
              <div className="mb-3 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  iOS & Android Builds
                </span>
                <span>Production Release</span>
              </div>
              {portrait.length > 0 ? (
                <div className="grid grid-cols-4 gap-2.5">
                  {portrait.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="relative aspect-[9/19] overflow-hidden rounded-xl border border-white/20 bg-slate-800 shadow-lg transition duration-500 group-hover:scale-103"
                    >
                      <img src={item.url} alt={item.alt || project.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                  ))}
                </div>
              ) : primary?.url ? (
                <div className="mx-auto max-w-xs aspect-[9/16] overflow-hidden rounded-2xl border-2 border-white/20 bg-slate-800 shadow-2xl">
                  <img src={primary.url} alt={primary.alt || project.title} className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="flex h-56 items-center justify-center text-white/40">
                  <Smartphone className="h-12 w-12" />
                </div>
              )}
            </div>
          ) : (
            /* Browser Viewport Chrome Mockup */
            <div className="relative bg-slate-900">
              <div className="flex items-center justify-between border-b border-white/10 bg-slate-950 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="rounded-md border border-white/10 bg-white/5 px-3 py-0.5 text-[10px] font-mono text-white/50">
                  {project.url ? project.url.replace(/^https?:\/\//, '') : `${project.slug || 'system'}.anjalventures.com`}
                </div>
                <div className="w-10" />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                {primary?.url ? (
                  <img
                    src={primary.url}
                    alt={primary.alt || project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-103"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-white/40">
                    <MonitorSmartphone className="h-14 w-14" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Project Information */}
        <div className="p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-800">
                {project.project_type || 'Platform'}
              </span>
              {project.industry && (
                <span className="rounded-md border border-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                  {project.industry}
                </span>
              )}
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {project.status || 'Live'}
            </span>
          </div>

          <h3 className="text-2xl font-semibold tracking-tight text-slate-950 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {project.summary || project.description}
          </p>

          {/* Tags */}
          {(project.tags || []).length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map(t => (
                <span key={t} className="rounded-md bg-slate-50 border border-slate-200/80 px-2 py-0.5 font-mono text-[10px] text-slate-600">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer & Store Badges Action Bar */}
      <div className="border-t border-slate-100 px-7 py-4.5 bg-slate-50/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {hasStores ? (
            <ProjectStoreBadges
              appStoreUrl={project.app_store_url}
              playStoreUrl={project.play_store_url}
              stopPropagation={true}
            />
          ) : (
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {project.client_name ? `Client: ${project.client_name}` : 'Enterprise Platform'}
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-950 transition group-hover:text-blue-600 ml-auto">
            <span>Case study</span>
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export function ProcessBand() {
  return (
    <section className="border-y border-slate-200 bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Delivery Standard"
          title="A clear studio process from idea to launch."
          text="Strategy, interface design, engineering, deployment, and support stay connected from the first call."
        />
        <div className="grid gap-4 md:grid-cols-4">
          {[
            [Rocket, 'Scope', 'Define users, workflows, data, risks, and success criteria.'],
            [MonitorSmartphone, 'Prototype', 'Design high-confidence screens and key product flows.'],
            [Database, 'Build', 'Implement frontend, backend, admin, integrations, and QA.'],
            [ShieldCheck, 'Launch', 'Deploy, monitor, train, and support the operating team.'],
          ].map(([Icon, label, text]) => (
            <div key={label} className="rounded-lg border border-slate-200 p-5">
              <Icon className="mb-8 h-6 w-6 text-emerald-700" />
              <h3 className="font-semibold">{label}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PricingBand({ plans = [] }) {
  if (!plans.length) return null
  return (
    <section className="bg-slate-950 px-5 py-20 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Investment"
          title="Start small, scale into a serious platform."
          text="Pricing depends on scope, integrations, timeline, and support requirements."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map(plan => (
            <div key={plan.id} className={`rounded-lg border p-6 ${plan.is_featured ? 'border-blue-400 bg-blue-500/10' : 'border-white/12 bg-white/[0.04]'}`}>
              <p className="text-sm font-semibold text-white/60">{plan.name}</p>
              <p className="mt-4 text-4xl font-bold">{plan.price}</p>
              <p className="mt-2 min-h-10 text-sm text-white/55">{plan.price_note}</p>
              <div className="mt-8 space-y-3">
                {(plan.features || []).map(feature => (
                  <p key={feature} className="flex gap-2 text-sm text-white/70">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" />
                    {feature}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CtaBand({ settings = {} }) {
  return (
    <section className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-slate-200 bg-slate-50 p-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Start a serious build</p>
          <h2 className="text-3xl font-semibold tracking-normal md:text-4xl">Turn the next product idea into a structured proposal.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">Use App Studio for mobile ideas or the quote builder for websites, dashboards, and SaaS systems.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/app-studio" className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">
            App Studio
            <Smartphone className="h-4 w-4" />
          </Link>
          <Link href="/quote" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-sm font-bold text-slate-950 hover:border-slate-950">
            Quote builder
            <BarChart3 className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function EstimateSummary({ total, totalNaira, label = 'Estimated investment' }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-3 text-4xl font-bold text-slate-950">{formatMoney(total)}</p>
      <p className="mt-1 text-sm font-semibold text-emerald-700">{formatMoney(totalNaira, 'NGN')}</p>
    </div>
  )
}
