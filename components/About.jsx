import { normalizeCompanyAddress, normalizeCacNumber } from '@/lib/company'

export default function About({ settings = {} }) {
  const aboutText = settings.about_text || 'Anjal Solutions LTD (formerly Anjal Ventures) is an incorporated Nigerian technology company delivering dependable digital solutions to businesses, institutions, and organisations across Nigeria and internationally.'
  const cac = normalizeCacNumber(settings.company_cac)
  const tin = settings.company_tin || '2623598796685'
  const address = normalizeCompanyAddress(settings.company_address)

  return (
    <section id="about" className="section bg-gradient-to-r from-apple-light via-white to-apple-light py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Content */}
          <div>
            <div className="inline-block mb-4 px-4 py-2 rounded-full text-xs font-semibold text-apple-blue bg-blue-50 border border-blue-100">
              About Anjal Solutions LTD (formerly Anjal Ventures)
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-apple-dark mb-8">
              Technology Partner for African Businesses
            </h2>
            <p className="text-lg text-apple-space-gray leading-relaxed mb-6 font-light">
              {aboutText}
            </p>
            <p className="text-base text-apple-space-gray leading-relaxed mb-12 font-light">
              Headquartered in {address}, we build practical, dependable digital solutions that help businesses grow and operate smoothly.
            </p>

            {/* Core values grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Mission', desc: 'Delivering affordable, cutting-edge digital solutions that transform ideas into scalable technology.' },
                { title: 'Vision', desc: 'Become a trusted pan-African technology partner for businesses and institutions.' },
                { title: 'Quality', desc: 'High engineering standards applied to every project with careful attention to detail.' },
                { title: 'Ownership', desc: 'Full code ownership transferred to clients. Zero vendor lock-in.' },
              ].map(v => (
                <div key={v.title} className="p-6 rounded-xl bg-white border border-apple-light-secondary hover:bg-apple-light hover:border-apple-space-gray transition-all shadow-sm">
                  <div className="font-semibold text-apple-dark text-sm mb-2">{v.title}</div>
                  <p className="text-xs text-apple-space-gray leading-relaxed font-light">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Info card */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-8">Company Information</h3>
            
            <div className="space-y-8">
              {/* Registration details */}
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Registration Details</div>
                <div className="space-y-3">
                  {[['CAC Registration', `RC ${cac}`], ['TIN', tin], ['Status', 'Active (CAMA 2020)']].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center pb-3 border-b border-gray-200 last:pb-0 last:border-0">
                      <span className="text-sm text-gray-600">{k}</span>
                      <span className="text-sm font-semibold text-black font-mono">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <a
                    href="/docs/certificate-anjal-solutions-ltd.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    View Official CAC Certificate (PDF) →
                  </a>
                </div>
              </div>

              {/* Key stats */}
              <div className="pt-8 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Key Metrics</div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { num: '40+', label: 'Projects' },
                    { num: '70%', label: 'North Africa' },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="text-2xl font-semibold text-black">{s.num}</div>
                      <div className="text-xs text-gray-600 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="mt-24 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { num: settings.stats_smes || '42', suffix: 'M+', label: 'African SMEs' },
              { num: settings.stats_undigitised || '70', suffix: '%', label: 'Digitization Gap' },
              { num: settings.stats_starting_price || '100', prefix: '$', suffix: '+', label: 'Website Pricing' },
              { num: settings.stats_services || '6', suffix: '+', label: 'Service Lines' },
            ].map((s, i) => (
              <div key={i} className="py-4 text-center">
                <div className="text-4xl font-semibold text-black mb-2">
                  {s.prefix}{s.num}{s.suffix}
                </div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
