import Link from "next/link";
import { Locale, ResourceKey } from "@/lib/i18n/resources";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

type HeaderProps = {
  locale: Locale;
  dictionary: Record<ResourceKey, string>;
};

export default function Header({ locale, dictionary }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-ink">
            {dictionary.siteTitle}
          </span>
          <span className="text-xs text-ink/60">{dictionary.siteTagline}</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-ink/80">
          <nav className="flex flex-wrap items-center gap-4">
            <Link href="/">{dictionary.navHome}</Link>
            <Link href="/about">{dictionary.navAbout}</Link>
            <Link href="/items">{dictionary.navItems}</Link>
            <Link href="/settings">{dictionary.navSettings}</Link>
            <Link href="/login">{dictionary.navLogin}</Link>
          </nav>
          <LanguageSwitcher currentLocale={locale} dictionary={dictionary} />
        </div>
      </div>
    </header>
  );
}
