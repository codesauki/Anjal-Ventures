import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import PlatformShell from '@/components/PlatformShell'
import { CtaBand } from '@/components/PlatformSections'
import { getPlatformData } from '@/lib/platform-data'

export async function generateMetadata({ params }) {
  const { projects } = await getPlatformData()
  const project = projects.find(item => String(item.slug) === params.slug || String(item.id) === params.slug)
  return {
    title: project ? `${project.title} - Anjal Ventures` : 'Project - Anjal Ventures',
    description: project?.summary || project?.description || 'Anjal Ventures project case study.',
  }
}

export default async function ProjectDetailPage({ params }) {
  const { settings, projects } = await getPlatformData()
  const project = projects.find(item => String(item.slug) === params.slug || String(item.id) === params.slug)
  const media = project?.media || []
  const portrait = media.filter(item => item.orientation === 'portrait').slice(0, 4)
  const landscape = media.find(item => item.orientation !== 'portrait') || media[0]

  if (!project) {
    return (
      <PlatformShell settings={settings}>
        <section className="px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-semibold">Project not found</h1>
            <Link href="/work" className="mt-6 inline-flex rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white">View work</Link>
          </div>
        </section>
      </PlatformShell>
    )
  }

  return (
    <PlatformShell settings={settings}>
      <section className="bg-slate-950 px-5 py-20 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-blue-200">{project.project_type || 'project'}</p>
            <h1 className="text-5xl font-semibold tracking-normal md:text-7xl">{project.title}</h1>
            <p className="mt-6 text-lg leading-8 text-white/65">{project.summary || project.description}</p>
            {project.url && (
              <a href={project.url} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-950">
                Visit project
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
          <div className="overflow-hidden rounded-lg border border-white/12 bg-white/[0.04]">
            {project.project_type === 'mobile-app' && portrait.length > 0 ? (
              <div className="grid grid-cols-4 gap-3 p-4">
                {portrait.map(item => (
                  <div key={item.id} className="relative aspect-[9/19] overflow-hidden rounded-lg bg-white">
                    <img src={item.url} alt={item.alt || project.title} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            ) : landscape?.url ? (
              <div className="relative aspect-[16/10]">
                <img src={landscape.url} alt={landscape.alt || project.title} className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="aspect-[16/10] bg-white/5" />
            )}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <aside className="space-y-4">
            {[
              ['Client', project.client_name],
              ['Industry', project.industry],
              ['Role', project.role],
              ['Status', project.status],
            ].filter(([, value]) => value).map(([label, value]) => (
              <div key={label} className="rounded-lg border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">{value}</p>
              </div>
            ))}
          </aside>
          <div className="space-y-10">
            <CaseBlock title="Challenge" text={project.challenge || 'The engagement required a reliable digital product foundation that could present the brand, support operations, and scale beyond a basic website.'} />
            <CaseBlock title="Solution" text={project.solution || project.description} />
            {(project.outcomes || []).length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold">Outcomes</h2>
                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {project.outcomes.map(item => (
                    <div key={item} className="rounded-lg border border-slate-200 p-5 text-sm font-semibold text-slate-700">{item}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <CtaBand settings={settings} />
    </PlatformShell>
  )
}

function CaseBlock({ title, text }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-4 text-base leading-8 text-slate-600">{text}</p>
    </div>
  )
}
