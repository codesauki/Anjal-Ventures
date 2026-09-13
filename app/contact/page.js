import { Toaster } from 'react-hot-toast'
import PlatformShell from '@/components/PlatformShell'
import Contact from '@/components/Contact'
import { getPlatformData } from '@/lib/platform-data'

export const metadata = {
  title: 'Contact Engineering & Partnerships - Anjal Ventures',
  description: 'Connect directly with Anjal Ventures engineering and corporate leadership. Official communication channels for digital systems, cloud platforms, and mobile products.',
}

export default async function ContactPage() {
  const { settings, services } = await getPlatformData()
  return (
    <PlatformShell settings={settings}>
      <Toaster position="top-right" />
      <section className="border-b border-slate-200 bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Corporate & Technical Inquiries</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-normal text-slate-950 md:text-7xl">
            Talk to Anjal Ventures about your next system.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Direct communication channels for corporate clients, enterprise partnerships, and engineering collaborations.
          </p>
        </div>
      </section>
      <Contact settings={settings} services={services} />
    </PlatformShell>
  )
}
