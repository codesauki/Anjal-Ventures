import PlatformShell from '@/components/PlatformShell'
import { CtaBand, ProcessBand, SectionIntro, ServicesGrid } from '@/components/PlatformSections'
import { getPlatformData } from '@/lib/platform-data'

export const metadata = {
  title: 'Services - Anjal Ventures',
  description: 'Premium web platforms, mobile apps, SaaS systems, AI automation, and digital operations from Anjal Ventures.',
}

export default async function ServicesPage() {
  const { settings, services } = await getPlatformData()
  return (
    <PlatformShell settings={settings}>
      <section className="bg-slate-950 px-5 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-blue-200">Services</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-normal md:text-7xl">Digital systems engineered for growth.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">From first website to full product platform, the service model is built around clarity, production quality, and long-term ownership.</p>
        </div>
      </section>
      <ServicesGrid services={services} />
      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Engagement Models" title="Choose the right level of partnership." text="We support fast launch builds, structured product development, and ongoing platform partnerships." />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Launch Sprint', 'A focused build for a website, landing system, or MVP with a clear deadline.'],
              ['Product Build', 'A complete web or mobile product with backend, admin workflows, and deployment.'],
              ['Platform Partner', 'Ongoing support for systems that need iterations, monitoring, analytics, and support.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-lg border border-slate-200 p-6">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProcessBand />
      <CtaBand settings={settings} />
    </PlatformShell>
  )
}
