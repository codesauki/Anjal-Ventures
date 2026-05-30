import { Toaster } from 'react-hot-toast'
import PlatformShell from '@/components/PlatformShell'
import QuoteBuilder from '@/components/QuoteBuilder'
import { getPlatformData } from '@/lib/platform-data'

export const metadata = {
  title: 'Quote Builder - Anjal Ventures',
  description: 'Create a structured project proposal and estimate for websites, apps, SaaS platforms, and digital systems.',
}

export default async function QuotePage() {
  const { settings, calculator } = await getPlatformData()
  return (
    <PlatformShell settings={settings}>
      <Toaster position="top-right" />
      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Quote Builder</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-normal text-slate-950 md:text-7xl">Create a structured proposal in minutes.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Select scope, configure delivery, add client details, and download a professional proposal PDF.</p>
        </div>
      </section>
      <QuoteBuilder settings={settings} calculator={calculator} />
    </PlatformShell>
  )
}
