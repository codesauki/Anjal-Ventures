import Link from 'next/link'
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Code2,
  Cpu,
  FileCheck,
  Globe2,
  Layers,
  Lock,
  Mail,
  MapPin,
  Scale,
  Server,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react'
import PlatformShell from '@/components/PlatformShell'
import { CtaBand } from '@/components/PlatformSections'
import { getPlatformData } from '@/lib/platform-data'

export const metadata = {
  title: 'Studio Manifesto & Institutional Governance - Anjal Ventures',
  description:
    'The engineering manifesto, corporate governance, technical benchmarks, and regional heritage of Anjal Ventures. Registered Nigerian technology enterprise (CAC: 9258709 · D-U-N-S: 352294840).',
}

const MANIFESTO_PILLARS = [
  {
    number: '01',
    title: 'High-Conviction Engineering',
    tagline: 'We reject fragile templates, low-code shortcuts, and throwaway prototypes.',
    description:
      'The modern web is inundated with fragile systems that look attractive on day one and disintegrate under genuine production loads. At Anjal Ventures, we architect every software system from first principles. We write typed, maintainable, and thoroughly tested code designed to process real transactions, handle peak user concurrency, and scale without compounding technical debt.',
  },
  {
    number: '02',
    title: 'Unconditional Code Ownership',
    tagline: 'Zero proprietary vendor lock-in. Full intellectual property transfer.',
    description:
      'We believe software commissioned by a client should be fully owned by the client. Upon project handover, we transfer complete source code repositories, Figma design systems, database schemas, and cloud deployment runbooks. Your company retains 100% intellectual property rights, enabling your internal teams or future partners to operate, extend, or audit the system autonomously.',
  },
  {
    number: '03',
    title: 'Regional Roots, Global Benchmarks',
    tagline: 'Pioneering world-class digital infrastructure from Damaturu, Yobe State.',
    description:
      'Headquartered in Damaturu, Northern Nigeria, Anjal Ventures is living proof that tier-1 software engineering is not confined to legacy coastal tech hubs. We combine deep regional understanding with international technical standards, building resilient digital infrastructure that powers ambitious enterprises across Nigeria, Africa, and global markets.',
  },
  {
    number: '04',
    title: 'Operational Longevity',
    tagline: 'Software engineered to operate reliably for decades, not months.',
    description:
      'A digital product is not a static marketing asset; it is an active operational machine. We engineer resilient database schemas, automated error recovery, comprehensive audit logging, and strict data validation into every layer of our stack. The systems we deploy are built to survive framework lifecycles and business pivots.',
  },
]

const OPERATING_PRINCIPLES = [
  {
    icon: Code2,
    title: 'Ownership & Sovereignty',
    description: 'Clients should understand, own, and confidently operate every system we ship. We build assets, not dependencies.',
  },
  {
    icon: ShieldCheck,
    title: 'Architectural Reliability',
    description: 'Every build requires deliberate data models, failover redundancy, automated backups, and zero single points of failure.',
  },
  {
    icon: Sparkles,
    title: 'Aesthetic Restraint',
    description: 'Luxury digital design is understated, precise, and functional. We favor typographic clarity over gratuitous decoration.',
  },
  {
    icon: Zap,
    title: 'Engineering Velocity',
    description: 'Rapid, disciplined iteration through modular component architecture, automated CI/CD pipelines, and continuous testing.',
  },
  {
    icon: Lock,
    title: 'Defense-in-Depth',
    description: 'Security is embedded at every layer: sanitized inputs, encrypted payloads, isolated environments, and strict RBAC.',
  },
  {
    icon: Scale,
    title: 'Radical Transparency',
    description: 'Honest architectural advice, transparent milestone billing, guaranteed deliverables, and zero hidden technical fees.',
  },
]

const TECH_BENCHMARKS = [
  {
    category: 'Frontend & UI Performance',
    icon: Globe2,
    specs: [
      'Next.js 14 App Router with React Server Components (RSC)',
      'Sub-second Largest Contentful Paint (LCP < 1.2s)',
      'Zero layout shift (CLS < 0.05) & 95+ Core Web Vitals score',
      'Atomic component architecture with strict Tailwind CSS tokens',
      'Universal accessibility (WCAG 2.1 AA compliant typography & contrast)',
    ],
  },
  {
    category: 'Backend & Data Architecture',
    icon: Server,
    specs: [
      'PostgreSQL with Prisma ORM and optimized relational indexing',
      'Redis in-memory caching for sub-millisecond query resolution',
      'Idempotent webhook processing with cryptographic verification',
      'Event-driven asynchronous queues for heavy computation & exports',
      'Immutable database audit logging for financial and operational records',
    ],
  },
  {
    category: 'Mobile Engineering & App Store Approval',
    icon: Smartphone,
    specs: [
      'Production Flutter & React Native cross-platform codebases',
      'Full compliance with Apple App Store Review & Google Play Policies',
      'Biometric authentication (Face ID, Touch ID, Android Biometrics)',
      'Offline-first SQLite caching with background state synchronization',
      'Automated App Store Connect & Google Play Console release workflows',
    ],
  },
  {
    category: 'Security, Cloud & DevOps',
    icon: Shield,
    specs: [
      'End-to-end TLS 1.3 encryption and automated SSL provisioning',
      'Strict Content Security Policy (CSP), CORS, and rate limiting',
      'GitHub Actions automated CI/CD pipeline with pre-commit linters',
      'Edge CDN caching via Cloudflare and Vercel Enterprise infrastructure',
      'Real-time error tracking and telemetry via Sentry and Datadog',
    ],
  },
]

export default async function AboutPage() {
  const { settings } = await getPlatformData()
  const cac = (settings.company_cac || '9258709').replace(/^BN\s*[:\-\s]?\s*/i, '')
  const duns = settings.company_duns || '352294840'
  const tin = settings.company_tin || '2623553716975'
  const address = settings.company_address || 'No. 4, MJG Global Ventures Complex, Kolomi Ali Street, Sabon Pegi, Damaturu, Yobe State, Nigeria'
  const emailContact = settings.company_email || 'contact@anjalventures.com'
  const emailDev = settings.company_email_dev || 'developers@anjalventures.com'

  return (
    <PlatformShell settings={settings}>
      {/* 1. Obsidian Executive Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 px-5 py-24 text-white lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Studio Manifesto & Governance
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-white/50">
              CAC: {cac} · D-U-N-S: {duns}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-white/50">
              Damaturu HQ · Global Delivery
            </span>
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[1.04] tracking-tight md:text-7xl">
            A Nigerian product engineering studio building serious digital infrastructure.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
            Anjal Ventures is a registered Nigerian technology enterprise delivering institutional-grade web platforms, native mobile applications, and high-throughput cloud software. We exist to close the gap between visionary ambition and rock-solid software execution across Africa and international markets.
          </p>

          {/* Quick Institutional Credentials Ribbon */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Corporate Registration', value: `CAC #${cac}`, sub: 'Corporate Affairs Commission' },
              { label: 'Global Registry', value: `D-U-N-S #${duns}`, sub: 'Dun & Bradstreet Verified' },
              { label: 'Tax Identification', value: `TIN #${tin}`, sub: 'Federal Inland Revenue' },
              { label: 'Headquarters', value: 'Damaturu, Yobe', sub: 'Northern Nigeria Core' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">{item.label}</div>
                <div className="mt-1.5 font-mono text-base font-bold text-white sm:text-lg">{item.value}</div>
                <div className="mt-1 text-xs text-white/50">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Key Operational Metrics Strip */}
      <section className="border-b border-slate-200 bg-slate-50 px-5 py-8 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { metric: '40+', label: 'Shipped Systems', desc: 'Web portals, mobile apps & SaaS platforms deployed.' },
            { metric: '100%', label: 'IP Ownership', desc: 'Complete source code and database rights transferred.' },
            { metric: '99.9%', label: 'Uptime Reliability', desc: 'Engineered for continuous, multi-tenant operations.' },
            { metric: '< 1.2s', label: 'Global Latency', desc: 'Sub-second web performance and instant edge caching.' },
          ].map((item) => (
            <div key={item.label} className="border-l-2 border-slate-300 pl-4">
              <div className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">{item.metric}</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-900">{item.label}</div>
              <div className="mt-1 text-xs text-slate-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. The Studio Manifesto ("Built to Operate") */}
      <section className="bg-white px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">The Anjal Manifesto</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Built to operate. Why we reject throwaway software.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Most digital agencies treat software as temporary campaign collateral. At Anjal Ventures, we engineer digital systems as core capital assets. We build with the premise that software must survive real market stress, protect client data, and generate compounding value over years of operation.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {MANIFESTO_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-8 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <span className="font-mono text-sm font-bold text-blue-700">{pillar.number}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pillar</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">{pillar.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-blue-900">{pillar.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Institutional Governance & Verification Audit */}
      <section className="border-t border-slate-200 bg-slate-900 px-5 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-400">Institutional Governance</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Legal structure, regulatory filings, and corporate transparency.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/70">
              When enterprises, public institutions, and international founders partner with Anjal Ventures, they engage with a fully incorporated, compliant, and legally verifiable technology company.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="border-b border-white/10 bg-white/[0.04] px-6 py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm font-bold uppercase tracking-wider text-white">Public Verification Record</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-300">Active & In Good Standing</span>
                </div>
              </div>
            </div>

            <div className="divide-y divide-white/10">
              {[
                { label: 'Legal Corporate Name', value: 'Anjal Ventures', detail: 'Registered Technology & Software Enterprise' },
                {
                  label: 'CAC Registration Number',
                  value: cac,
                  detail: 'Corporate Affairs Commission, Federal Republic of Nigeria',
                },
                {
                  label: 'D-U-N-S Number (Dun & Bradstreet)',
                  value: duns,
                  detail: 'Global commercial business identity verification for international contracts',
                },
                {
                  label: 'Tax Identification Number (TIN)',
                  value: tin,
                  detail: 'Federal Inland Revenue Service (FIRS) active tax compliance',
                },
                {
                  label: 'Registered Corporate Headquarters',
                  value: address,
                  detail: 'Primary administrative, legal, and operational facilities in Damaturu, Yobe State',
                },
                {
                  label: 'Official General Inquiries',
                  value: emailContact,
                  detail: 'Direct institutional communications & client relations (24-hour response SLA)',
                },
                {
                  label: 'Engineering & Developer Inquiries',
                  value: emailDev,
                  detail: 'Technical architecture reviews, API integrations & security disclosures',
                },
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 gap-2 p-6 transition hover:bg-white/[0.02] md:grid-cols-3 md:items-center">
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/50">{row.label}</div>
                  <div className="font-mono text-base font-bold text-white md:col-span-1">{row.value}</div>
                  <div className="text-xs text-white/60 md:text-right">{row.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Engineering Standards & Technology Benchmarks */}
      <section className="bg-white px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Engineering Benchmarks</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Strict technical specifications applied to every build.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              We do not compromise on technical quality. Whether building an institutional website or a high-concurrency mobile application, our engineering deliverables conform to strict production benchmarks.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {TECH_BENCHMARKS.map((benchmark) => (
              <div
                key={benchmark.category}
                className="rounded-2xl border border-slate-200 bg-slate-50/40 p-8 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                    <benchmark.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-950">{benchmark.category}</h3>
                </div>

                <ul className="mt-6 space-y-3">
                  {benchmark.specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Studio Operating Principles */}
      <section className="border-t border-slate-200 bg-slate-50 px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Operating Code</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Six core principles guiding our product studio.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              These six operating principles dictate how we write software, communicate with clients, structure project milestones, and maintain our engineering culture.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OPERATING_PRINCIPLES.map((principle) => (
              <div
                key={principle.title}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-900">
                    <principle.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950">{principle.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">{principle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. The Damaturu Advantage & Regional Vision */}
      <section className="bg-white px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
                <MapPin className="h-3.5 w-3.5" />
                Regional Heritage & Vision
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                Anchor for digital transformation across Northern Nigeria and beyond.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-600">
                Over 70% of businesses across Northern Nigeria and regional commercial corridors remain undigitized or reliant on brittle manual operations. Anjal Ventures was founded with a dual mission: to provide regional enterprises with direct access to tier-1 digital engineering, while delivering world-class software to international clients from our Damaturu headquarters.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                By maintaining lean, focused operations in Yobe State, we offer our clients unparalleled attention, senior engineering dedication, and sustainable cost structures — without sacrificing a single millisecond of performance or a single line of security rigor.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-slate-800"
                >
                  Explore Shipped Systems
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-900 transition hover:bg-slate-50"
                >
                  Commission a Build
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 lg:p-10">
              <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Regional Footprint & Focus</h3>
              <div className="mt-6 space-y-6">
                {[
                  {
                    title: 'Enterprise & SME Digitization',
                    desc: 'Transforming traditional commercial, logistics, and retail businesses into modern, automated digital enterprises.',
                  },
                  {
                    title: 'Public Sector & Institutional Platforms',
                    desc: 'Architecting secure administrative portals, registries, and data management systems for institutional clients.',
                  },
                  {
                    title: 'Mobile Commerce & Financial Flows',
                    desc: 'Engineering low-bandwidth, offline-resilient mobile applications tailored for diverse African network realities.',
                  },
                  {
                    title: 'Pan-African & Global Software Export',
                    desc: 'Delivering production software solutions to clients across Lagos, Abuja, London, Dubai, and North America.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="border-l-2 border-blue-600 pl-4">
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Call to Action Band */}
      <CtaBand settings={settings} />
    </PlatformShell>
  )
}
