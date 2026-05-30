import PlatformShell from '@/components/PlatformShell'
import { CtaBand, ProjectGrid } from '@/components/PlatformSections'
import { getPlatformData } from '@/lib/platform-data'

export const metadata = {
  title: 'Work - Anjal Ventures',
  description: 'Selected websites, apps, platforms, and case studies by Anjal Ventures.',
}

export default async function WorkPage() {
  const { settings, projects } = await getPlatformData()
  return (
    <PlatformShell settings={settings}>
      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Work</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-normal text-slate-950 md:text-7xl">Platforms, apps, and digital products built to operate.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Projects can be managed from admin with website landscapes, app portrait screenshots, outcomes, and live links.</p>
        </div>
      </section>
      <ProjectGrid projects={projects} title="All published work" filter="all" />
      <CtaBand settings={settings} />
    </PlatformShell>
  )
}
