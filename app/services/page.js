import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  Globe2,
  Layers3,
  Lock,
  MonitorSmartphone,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from 'lucide-react'
import PlatformShell from '@/components/PlatformShell'
import { CtaBand } from '@/components/PlatformSections'
import { getPlatformData } from '@/lib/platform-data'

export const metadata = {
  title: 'Engineering Services & Architecture - Anjal Ventures',
  description:
    'Institutional digital product engineering. Enterprise web platforms, iOS & Android applications, SaaS infrastructure, AI automation, and high-concurrency cloud systems.',
}

const DISCIPLINES = [
  {
    id: 'web-platforms',
    number: '01',
    icon: Globe2,
    badge: 'Core Infrastructure',
    title: 'Web Platforms & Distributed Cloud Systems',
    tagline: 'High-throughput, sub-second web platforms engineered for enterprise scale.',
    description:
      'We architect corporate portals, distributed web applications, e-commerce engines, and internal tooling designed for instantaneous load times, bulletproof uptime, and zero-compromise security.',
    deliverables: [
      'Next.js 14 full-stack architectures with distributed Server-Side Rendering (SSR)',
      'Enterprise component systems engineered with strict atomic design standards',
      'Headless CMS & multi-channel content infrastructure with instant cache revalidation',
      'Core Web Vitals 95+ guarantee with edge CDN caching and asset optimization',
      'Enterprise SEO architecture, structured JSON-LD schemas, and OpenGraph pipelines',
      'Comprehensive administrative dashboards with real-time audit logging and analytics',
    ],
    technologies: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Cloudflare', 'Vercel Enterprise'],
    quoteCategory: 'Corporate Website',
    quoteHref: '/quote',
  },
  {
    id: 'mobile-engineering',
    number: '02',
    icon: Smartphone,
    badge: 'Native & Cross-Platform',
    title: 'Mobile Applications (iOS & Android)',
    tagline: 'Production-grade mobile apps with Apple App Store and Google Play validation.',
    description:
      'From customer-facing consumer apps to field-operations tooling, we design, build, and publish resilient mobile applications with offline-first synchronization, biometric security, and native device hardware integration.',
    deliverables: [
      'Dual-platform iOS and Android production builds compiled from clean codebases',
      'Hardware integration: Biometric auth (FaceID / Fingerprint), camera, GPS, and Bluetooth',
      'Offline-first architecture with localized SQLite/Hive caching and automatic sync resolution',
      'Direct App Store Review and Google Play Store compliance, submission, and release',
      'Push notification infrastructure with targeted user segmentation and deep linking',
      'Granular in-app telemetry, crash reporting, and user behavioral analytics',
    ],
    technologies: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'Apple StoreKit', 'Google Play Billing'],
    quoteCategory: 'Mobile Application',
    quoteHref: '/app-studio',
  },
  {
    id: 'saas-systems',
    number: '03',
    icon: Layers3,
    badge: 'Multi-Tenant Architecture',
    title: 'SaaS Systems & Multi-Tenant Portals',
    tagline: 'Scalable subscription platforms with isolated multi-tenant data models.',
    description:
      'We turn proprietary operational workflows into multi-tenant software platforms. Engineered with strict tenant isolation, granular role-based access controls (RBAC), and recurring multi-currency payment pipelines.',
    deliverables: [
      'Multi-tenant database schema modeling with strict organizational data isolation',
      'Automated subscription and billing engines integrated with Paystack, Stripe, and Flutterwave',
      'Comprehensive Role-Based Access Control (RBAC) with granular team permissions',
      'Self-service customer onboarding, workspace management, and invitation flows',
      'Automated PDF invoice generation, payment receipts, and financial reporting',
      'Public API access keys and developer webhooks for client ecosystem expansion',
    ],
    technologies: ['PostgreSQL', 'Prisma / Drizzle', 'Next.js', 'Paystack API', 'Stripe Billing', 'Redis', 'Docker'],
    quoteCategory: 'SaaS Platform',
    quoteHref: '/quote',
  },
  {
    id: 'ai-automation',
    number: '04',
    icon: Sparkles,
    badge: 'Machine Intelligence',
    title: 'AI Workflows & Process Automation',
    tagline: 'Deterministic automation and LLM pipelines that eliminate manual overhead.',
    description:
      'We integrate artificial intelligence into real business operations. From intelligent document ingestion and automated customer service to multi-step data transformation pipelines and autonomous background daemons.',
    deliverables: [
      'Custom Retrieval-Augmented Generation (RAG) engines powered by vector databases',
      'Automated document intelligence for parsing receipts, invoices, identity docs, and contracts',
      'Self-healing background worker daemons for periodic data reconciliation and synchronization',
      'Automated multi-channel notifications across WhatsApp, SMS, and transactional email',
      'Custom webhook ingestion hubs connecting legacy ERPs, CRMs, and payment gateways',
      'Human-in-the-loop review queues for high-stakes operational compliance',
    ],
    technologies: ['Python', 'LangChain', 'OpenAI API', 'Claude API', 'pgvector', 'n8n', 'FastAPI', 'Redis Queue'],
    quoteCategory: 'Custom System',
    quoteHref: '/quote',
  },
  {
    id: 'backend-infrastructure',
    number: '05',
    icon: Database,
    badge: 'High-Concurrency Systems',
    title: 'Enterprise Backend & API Infrastructure',
    tagline: 'Transactional integrity, normalized schemas, and high-concurrency microservices.',
    description:
      'Mission-critical platforms require backends that never drop a transaction. We engineer high-availability RESTful and GraphQL APIs backed by rigorously normalized PostgreSQL databases and in-memory caching.',
    deliverables: [
      'Relational schema design with 3NF normalization, foreign key constraints, and custom indexes',
      'High-throughput REST and GraphQL endpoints documented with interactive OpenAPI specs',
      'Redis distributed caching layer for microsecond response times on high-load endpoints',
      'Asynchronous task workers and durable message queues for intensive computational jobs',
      'DDoS mitigation, rate-limiting, and cryptographic request signature validation',
      'Comprehensive database migration regimens with zero-downtime schema upgrades',
    ],
    technologies: ['PostgreSQL', 'Node.js', 'Go', 'Redis', 'GraphQL', 'OpenAPI / Swagger', 'Docker'],
    quoteCategory: 'Custom System',
    quoteHref: '/quote',
  },
  {
    id: 'devops-security',
    number: '06',
    icon: ShieldCheck,
    badge: 'Institutional Governance',
    title: 'DevOps, Security Hardening & Cloud Governance',
    tagline: 'Automated CI/CD, container orchestration, and disaster recovery regimens.',
    description:
      'We ensure that your digital infrastructure is unassailable, compliant, and continuously operational. We implement automated deployment pipelines, automated snapshot backups, and strict security controls.',
    deliverables: [
      'Automated GitHub Actions CI/CD pipelines with linting, testing, and atomic deployments',
      'Containerized application environments using multi-stage Docker builds',
      'Automated daily and point-in-time PostgreSQL database backup and recovery protocols',
      'Strict SSL/TLS encryption, Content Security Policies (CSP), and CORS enforcement',
      'Production monitoring, error-tracking, uptime alerts, and infrastructure health dashboards',
      'Complete disaster recovery runbooks and institutional technical handover documentation',
    ],
    technologies: ['Docker', 'AWS (ECS, RDS, S3)', 'GitHub Actions', 'Cloudflare', 'PostgreSQL', 'Linux Hardening'],
    quoteCategory: 'Custom System',
    quoteHref: '/quote',
  },
]

const LIFECYCLE_STEPS = [
  {
    phase: 'Phase 01',
    title: 'Technical Discovery & ADRs',
    desc: 'We define the technical blueprint before writing a single line of code. We produce Architecture Decision Records (ADRs), database entity schemas, threat models, and user workflow diagrams.',
    icon: Terminal,
  },
  {
    phase: 'Phase 02',
    title: 'Interface Systems & Interactive Flow',
    desc: 'Design engineered with mathematical spacing, Apple-inspired clarity, and design token libraries. Every state, empty state, validation, and micro-interaction is mapped and verified.',
    icon: MonitorSmartphone,
  },
  {
    phase: 'Phase 03',
    title: 'Test-Driven Full-Stack Engineering',
    desc: 'Implementation following strict domain-driven architecture. Clean separation of concerns between presentation, business logic, data persistence, and external APIs.',
    icon: Cpu,
  },
  {
    phase: 'Phase 04',
    title: 'Security Auditing & Load Testing',
    desc: 'Rigorous pre-release validation. Database query optimization, stress testing under simulated concurrent traffic, cross-browser audits, and mobile device laboratory checks.',
    icon: Lock,
  },
  {
    phase: 'Phase 05',
    title: 'Zero-Downtime Launch & Handover',
    desc: 'Atomic deployment to production infrastructure. Complete code repository handover, administrative operating manuals, stakeholder walkthroughs, and proactive uptime monitoring.',
    icon: Rocket,
  },
]

const ENGAGEMENT_TIERS = [
  {
    name: 'Launch Sprint',
    timeline: '2 – 4 Weeks',
    purpose: 'Rapid market entry & validation',
    description:
      'A concentrated engineering sprint focused on taking a specific product MVP, landing system, or corporate platform from concept to production on an aggressive timeline.',
    features: [
      'Fully functional production web or mobile product',
      'Core user workflows and authentication',
      'Database architecture and admin content portal',
      'Automated CI/CD deployment to cloud hosting',
      '30-day post-launch warranty and bug fixes',
    ],
    idealFor: 'Startups, new product launches, time-sensitive corporate initiatives',
    cta: 'Start a Sprint',
    href: '/quote',
  },
  {
    name: 'Production System Build',
    timeline: '6 – 12 Weeks',
    featured: true,
    purpose: 'Complete end-to-end digital product',
    description:
      'Our primary studio model. We architect, design, engineer, test, and ship complete digital platforms featuring web portals, native mobile apps, and enterprise administrative tools.',
    features: [
      'Dual iOS and Android apps + full-stack web platform',
      'Advanced multi-tenant backend with PostgreSQL & Redis',
      'Integrated payment gateways and billing automation',
      'Apple App Store and Google Play publishing and approval',
      'Detailed API documentation and architectural runbooks',
      '60-day intensive operational support and handover',
    ],
    idealFor: 'Growing enterprises, venture-backed companies, scaling businesses',
    cta: 'Commission System Build',
    href: '/quote',
  },
  {
    name: 'Dedicated Studio Pod',
    timeline: 'Monthly Retainer',
    purpose: 'Continuous platform evolution',
    description:
      'An embedded engineering and design pod acting as your dedicated technology team. For platforms that require continuous feature deployment, infrastructure scaling, and dedicated SLAs.',
    features: [
      'Dedicated senior full-stack engineers and UI architects',
      'Bi-weekly release cycles and sprint planning',
      'Guaranteed 4-hour critical incident response SLA',
      'Proactive security auditing and infrastructure optimization',
      'Direct communication channel with engineering leadership',
      'Flexible sprint allocation based on business priorities',
    ],
    idealFor: 'Mature platforms, mission-critical operations, long-term partners',
    cta: 'Inquire About Pods',
    href: '/contact',
  },
]

export default async function ServicesPage() {
  const { settings } = await getPlatformData()

  return (
    <PlatformShell settings={settings}>
      {/* Hero Architecture Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 px-5 py-24 text-white lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Institutional Engineering Disciplines
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-white/50">
              Damaturu HQ · Global Delivery
            </span>
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[1.04] tracking-tight md:text-7xl">
            High-conviction digital products. Engineered to operate at scale.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
            Anjal Ventures operates as an elite digital product studio and technology enterprise. We design, engineer, and maintain production-grade web platforms, native mobile applications, SaaS architectures, and automated infrastructure for ambitious teams across Nigeria and international markets.
          </p>

          {/* Quick Capability Matrix Strip */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {DISCIPLINES.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/25 hover:bg-white/[0.07]"
              >
                <item.icon className="h-5 w-5 text-blue-400 transition group-hover:scale-110" />
                <span className="mt-3 text-xs font-semibold leading-tight text-white/90">
                  {item.title.split('&')[0].trim()}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Delivery Guarantees Bar */}
      <section className="border-b border-slate-200 bg-slate-50 px-5 py-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 text-center md:grid-cols-4">
          {[
            ['100% IP Ownership', 'All source code, design files & databases transferred to client.'],
            ['Zero Technical Debt', 'Strict typing, automated linters, and clean architecture.'],
            ['Store Deployment SLA', 'Guaranteed App Store & Google Play compliance & approval.'],
            ['Enterprise Governance', 'CAC: 9258709 · D-U-N-S: 352294840 · Active Status.'],
          ].map(([title, desc]) => (
            <div key={title} className="p-3 text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                {title}
              </p>
              <p className="mt-1 text-xs text-slate-500 leading-normal">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deep Capability Catalogue */}
      <section className="bg-white px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Capabilities</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              End-to-end technical execution across six engineering pillars.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              We do not provide surface-level agency deliverables. Every engagement produces tested, scalable, documented software assets ready for long-term commercial operation.
            </p>
          </div>

          <div className="mt-16 space-y-16">
            {DISCIPLINES.map((item, idx) => (
              <div
                key={item.id}
                id={item.id}
                className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 md:p-10 lg:p-12"
              >
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-slate-400">{item.number}</span>
                      <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-700">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-blue-600">{item.tagline}</p>
                    <p className="mt-4 text-base leading-relaxed text-slate-600">{item.description}</p>

                    <div className="mt-8">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Technical Deliverables</p>
                      <ul className="mt-4 space-y-2.5">
                        {item.deliverables.map(deliv => (
                          <li key={deliv} className="flex items-start gap-3 text-sm text-slate-700">
                            <span className="mt-1 flex h-2 w-2 rounded-full bg-slate-900 shrink-0" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-6 md:p-8">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Supported Technology Stack</span>
                        <item.icon className="h-6 w-6 text-slate-900" />
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.technologies.map(tech => (
                          <span
                            key={tech}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-mono text-xs font-semibold text-slate-800 shadow-2xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-4">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                          <Zap className="h-4 w-4 text-amber-500" />
                          Production Standard
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-slate-600">
                          All code is delivered in client-owned repositories with continuous integration pipelines, comprehensive documentation, and automated testing suites.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 pt-6 border-t border-slate-200">
                      <Link
                        href={item.quoteHref}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-600"
                      >
                        Scope {item.title.split('&')[0].trim()}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                      >
                        Schedule Technical Consultation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Delivery Lifecycle Protocol */}
      <section className="border-y border-slate-200 bg-slate-950 px-5 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">Engineering Protocol</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              From architectural discovery to zero-downtime deployment.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/65">
              We follow a rigorous five-stage delivery protocol designed to eliminate architectural debt, manage risk, and guarantee on-time releases.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-5">
            {LIFECYCLE_STEPS.map((step, index) => (
              <div
                key={step.phase}
                className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold font-mono text-blue-300">
                    <span>{step.phase}</span>
                    <step.icon className="h-5 w-5 text-white/50" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-white/60">{step.desc}</p>
                </div>
                <div className="mt-6 border-t border-white/10 pt-4 text-[10px] font-bold uppercase tracking-widest text-white/35">
                  Stage 0{index + 1} of 05
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Engagement Models */}
      <section className="bg-white px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Engagement Frameworks</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Transparent partnership structures designed for accountability.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              Whether you need to rapidly launch an MVP or establish an ongoing engineering partnership, we offer structured engagement models tailored to your operating velocity.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {ENGAGEMENT_TIERS.map(tier => (
              <div
                key={tier.name}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition ${
                  tier.featured
                    ? 'border-2 border-slate-950 bg-slate-950 text-white shadow-2xl scale-102 lg:-translate-y-2'
                    : 'border border-slate-200 bg-white text-slate-950 shadow-sm hover:border-slate-300'
                }`}
              >
                <div>
                  {tier.featured && (
                    <span className="absolute -top-3.5 left-8 inline-block rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Most Popular Framework
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold tracking-tight">{tier.name}</h3>
                    <span
                      className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-md ${
                        tier.featured ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {tier.timeline}
                    </span>
                  </div>
                  <p className={`mt-2 text-xs font-semibold uppercase tracking-wider ${tier.featured ? 'text-blue-300' : 'text-blue-700'}`}>
                    {tier.purpose}
                  </p>
                  <p className={`mt-4 text-sm leading-relaxed ${tier.featured ? 'text-white/70' : 'text-slate-600'}`}>
                    {tier.description}
                  </p>

                  <div className={`mt-8 border-t pt-6 ${tier.featured ? 'border-white/15' : 'border-slate-100'}`}>
                    <p className={`text-xs font-bold uppercase tracking-wider ${tier.featured ? 'text-white/40' : 'text-slate-400'}`}>
                      Deliverables & Scope
                    </p>
                    <ul className="mt-4 space-y-3">
                      {tier.features.map(f => (
                        <li key={f} className="flex items-start gap-3 text-xs leading-normal">
                          <CheckCircle2
                            className={`h-4 w-4 shrink-0 mt-0.5 ${
                              tier.featured ? 'text-emerald-400' : 'text-emerald-600'
                            }`}
                          />
                          <span className={tier.featured ? 'text-white/90' : 'text-slate-700'}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-200/20">
                  <p className={`text-[11px] mb-4 ${tier.featured ? 'text-white/50' : 'text-slate-500'}`}>
                    <strong>Best for:</strong> {tier.idealFor}
                  </p>
                  <Link
                    href={tier.href}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${
                      tier.featured
                        ? 'bg-white text-slate-950 hover:bg-blue-50'
                        : 'bg-slate-950 text-white hover:bg-blue-700'
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instant Interactive Proposal CTA */}
      <section className="bg-slate-50 px-5 py-20 lg:px-8 border-t border-slate-200">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">Interactive Estimator</span>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                Ready to configure your project scope and budget?
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Use our automated Quote Builder to select your technology stack, target platforms, and feature modules to receive an immediate structured PDF proposal.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-600"
              >
                Launch Quote Builder
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/app-studio"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
              >
                Launch Mobile App Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand settings={settings} />
    </PlatformShell>
  )
}
