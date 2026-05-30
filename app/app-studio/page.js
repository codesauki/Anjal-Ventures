import { Toaster } from 'react-hot-toast'
import PlatformShell from '@/components/PlatformShell'
import AppStudioBuilder from '@/components/AppStudioBuilder'
import { getPlatformData } from '@/lib/platform-data'

export const metadata = {
  title: 'App Studio - Anjal Ventures',
  description: 'Design a mobile app concept, choose features, preview the interface, and generate an app proposal PDF.',
}

export default async function AppStudioPage() {
  const { settings, appStudio } = await getPlatformData()
  return (
    <PlatformShell settings={settings}>
      <Toaster position="top-right" />
      <section className="bg-slate-950 px-5 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-blue-200">App Studio</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-normal md:text-7xl">Shape an app idea into a product brief.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">Choose a preset, select features, preview the phone interface, and download a professional app brief.</p>
        </div>
      </section>
      <AppStudioBuilder settings={settings} presets={appStudio} />
    </PlatformShell>
  )
}
