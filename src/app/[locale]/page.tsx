import { getTranslations, setRequestLocale } from 'next-intl/server'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('HomePage')

  return (
    <main className="min-h-screen p-8 space-y-12">
      {/* Language Switcher */}
      <div className="flex justify-end">
        <LanguageSwitcher />
      </div>

      {/* Hero section with translated content */}
      <section className="text-center space-y-4">
        <h1 className="font-headline text-4xl md:text-6xl font-bold text-brand-black">
          {t('title')}
        </h1>
        <p className="font-subheading text-xl text-brand-black/70">
          {t('subtitle')}
        </p>
        <button className="bg-electric-violet text-white px-8 py-3 rounded-lg font-body text-lg hover:bg-cobalt-blue transition-colors">
          {t('cta')}
        </button>
      </section>

      {/* Stats grid */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
        {(
          [
            'projects',
            'businesses',
            'sales',
            'retention',
            'roi',
            'experience',
          ] as const
        ).map((key) => (
          <div
            key={key}
            className="text-center p-4 bg-brand-grey/30 rounded-lg"
          >
            <p className="font-secondary text-lg text-electric-violet">
              {t(`stats.${key}`)}
            </p>
          </div>
        ))}
      </section>

      {/* Brand colors verification */}
      <section className="space-y-4">
        <h2 className="font-subheading text-2xl">Brand Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-electric-violet text-white p-4 rounded-lg text-center text-sm">
            Electric Violet
          </div>
          <div className="bg-burgundy text-white p-4 rounded-lg text-center text-sm">
            Burgundy
          </div>
          <div className="bg-electric-mint text-brand-black p-4 rounded-lg text-center text-sm">
            Electric Mint
          </div>
          <div className="bg-cobalt-blue text-white p-4 rounded-lg text-center text-sm">
            Cobalt Blue
          </div>
          <div className="bg-brand-black text-white p-4 rounded-lg text-center text-sm">
            Brand Black
          </div>
          <div className="bg-brand-grey text-brand-black p-4 rounded-lg text-center text-sm">
            Brand Grey
          </div>
        </div>
      </section>

      {/* Typography verification */}
      <section className="space-y-2">
        <h2 className="font-subheading text-2xl">Typography</h2>
        <p className="font-headline text-xl">
          Glacial Indifference (Headlines)
        </p>
        <p className="font-subheading text-xl">Red Hat Display (Subheadings)</p>
        <p className="font-body text-xl">Poppins (Body Text)</p>
        <p className="font-secondary text-xl">Anton (Secondary Headlines)</p>
      </section>
    </main>
  )
}
