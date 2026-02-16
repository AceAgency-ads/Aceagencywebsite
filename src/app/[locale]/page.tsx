import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { ShinyButton } from '@/components/ui/ShinyButton'
import { FadeIn } from '@/components/ui/FadeIn'
import { CountUp } from '@/components/ui/CountUp'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('HomePage')

  return (
    <main className="min-h-screen">
      {/* Language Switcher - Fixed position */}
      <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6 lg:right-8 lg:top-8">
        <LanguageSwitcher />
      </div>

      {/* Hero section with Unsplash image */}
      <section className="relative h-[50vh] w-full overflow-hidden md:h-[60vh] lg:h-[70vh]">
        <Image
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80"
          alt="Modern digital marketing workspace with team collaboration"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(37, 37, 35, 0.85), rgba(37, 37, 35, 0.6), transparent)',
          }}
        />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6 md:space-y-8">
            <h1 className="font-headline text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-7xl">
              {t('title')}
            </h1>
            <p className="font-subheading text-lg text-white/90 sm:text-xl md:text-2xl">
              {t('subtitle')}
            </p>
            <div className="pt-4">
              <ShinyButton className="bg-electric-violet text-white">
                {t('cta')}
              </ShinyButton>
            </div>
          </div>
        </div>
      </section>

      {/* Stats grid with CountUp animation */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
          {(
            [
              { key: 'projects', value: 200, suffix: '+' },
              { key: 'businesses', value: 50, suffix: '+' },
              { key: 'sales', value: 4, suffix: 'M+' },
              { key: 'retention', value: 95, suffix: '%' },
              { key: 'roi', value: 350, suffix: '%' },
              { key: 'experience', value: 6, suffix: '+' },
            ] as const
          ).map(({ key, value, suffix }) => (
            <div
              key={key}
              className="rounded-xl bg-brand-grey/20 p-4 text-center sm:p-6"
            >
              <div className="font-secondary text-2xl text-electric-violet sm:text-3xl lg:text-4xl">
                <CountUp value={value} suffix={suffix} duration={2.5} />
              </div>
              <p className="mt-2 text-xs text-brand-black/70 sm:text-sm">
                {t(`stats.${key}`).replace(/^\d+\+?\s*/, '').trim()}
              </p>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
