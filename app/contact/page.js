import { Toaster } from 'react-hot-toast'
import PlatformShell from '@/components/PlatformShell'
import Contact from '@/components/Contact'
import { getPlatformData } from '@/lib/platform-data'

export const metadata = {
  title: 'Contact - Anjal Ventures',
}

export default async function ContactPage() {
  const { settings, services } = await getPlatformData()
  return (
    <PlatformShell settings={settings}>
      <Toaster position="top-right" />
      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Contact</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-normal text-slate-950 md:text-7xl">Talk to Anjal Ventures about your next system.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Share the project context and the team will follow up through email or WhatsApp.</p>
        </div>
      </section>
      <Contact settings={settings} services={services} />
    </PlatformShell>
  )
}
