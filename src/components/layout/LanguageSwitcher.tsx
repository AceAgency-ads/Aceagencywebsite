'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { routing } from '@/i18n/routing'

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('LanguageSwitcher')

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div
      className="flex items-center gap-2"
      role="navigation"
      aria-label="Language switcher"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          disabled={locale === loc}
          className={`px-3 py-1 rounded text-sm font-body transition-colors ${
            locale === loc
              ? 'bg-electric-violet text-white cursor-default'
              : 'bg-brand-grey/30 text-brand-black hover:bg-electric-violet/10'
          }`}
          aria-current={locale === loc ? 'true' : undefined}
          aria-label={loc === locale ? t('currentLanguage') : t('switchTo')}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
