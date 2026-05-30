import PlatformShell from '@/components/PlatformShell'
import { ProjectGrid } from '@/components/PlatformSections'
import { getPlatformData } from '@/lib/platform-data'

export const metadata = {
  title: 'Mobile Apps - Anjal Ventures',
}

export default async function AppsWorkPage() {
  const { settings, projects } = await getPlatformData()
  return (
    <PlatformShell settings={settings}>
      <section className="bg-slate-950 px-5 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-blue-200">Apps</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-normal md:text-7xl">Mobile products with real interfaces and real workflows.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">App projects support four portrait screenshots, store links, platform notes, and case-study outcomes.</p>
        </div>
      </section>
      <ProjectGrid projects={projects} title="Mobile app projects" filter="apps" />
    </PlatformShell>
  )
}
