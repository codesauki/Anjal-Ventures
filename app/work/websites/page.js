import PlatformShell from '@/components/PlatformShell'
import { ProjectGrid } from '@/components/PlatformSections'
import { getPlatformData } from '@/lib/platform-data'

export const metadata = {
  title: 'Websites and Platforms - Anjal Ventures',
}

export default async function WebsitesWorkPage() {
  const { settings, projects } = await getPlatformData()
  return (
    <PlatformShell settings={settings}>
      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Websites and Platforms</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-normal text-slate-950 md:text-7xl">Corporate websites, portals, marketplaces, and SaaS systems.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Website projects support landscape hero media, outcomes, live links, and deeper case-study pages.</p>
        </div>
      </section>
      <ProjectGrid projects={projects} title="Web and platform projects" filter="websites" />
    </PlatformShell>
  )
}
