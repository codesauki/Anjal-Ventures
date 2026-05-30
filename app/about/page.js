import PlatformShell from '@/components/PlatformShell'
import { CtaBand, ProcessBand, SectionIntro } from '@/components/PlatformSections'
import { getPlatformData } from '@/lib/platform-data'

export const metadata = {
  title: 'About - Anjal Ventures',
}

export default async function AboutPage() {
  const { settings } = await getPlatformData()
  return (
    <PlatformShell settings={settings}>
      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-blue-700">About</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-normal text-slate-950 md:text-7xl">A Nigerian product studio building serious digital infrastructure.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{settings.about_text}</p>
        </div>
      </section>
      <section className="bg-slate-50 px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Operating Principles" title="Premium work needs structure." />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Ownership', 'Clients should understand, own, and confidently operate the systems we ship.'],
              ['Reliability', 'Every build needs clear data, deployment, security, and support decisions.'],
              ['Taste', 'Design should feel intentional, restrained, and worthy of the company it represents.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-lg border border-slate-200 bg-white p-6">
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
