import Link from "next/link";
import HomeClient from "@/components/home/HomeClient";
import { getDictionary } from "@/lib/i18n/resources";
import { getLocaleFromCookie } from "@/lib/i18n/locale";

export default async function Home() {
  const locale = await getLocaleFromCookie();
  const dictionary = getDictionary(locale);

  return (
    <section className="grid gap-12">
      <div className="rounded-[32px] border border-black/10 bg-white/80 p-10 shadow-lift">
        <p className="text-sm uppercase tracking-[0.3em] text-ink/60">
          {dictionary.siteTagline}
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-ink md:text-5xl">
          {dictionary.heroTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-ink/70">
          {dictionary.heroSubtitle}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="inline-flex items-center justify-center rounded-full bg-coral px-5 py-2 text-sm font-semibold text-white shadow-lift"
            href="/login"
          >
            {dictionary.heroCtaPrimary}
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-ink/10 bg-white/60 px-5 py-2 text-sm font-semibold text-ink"
            href="/items"
          >
            {dictionary.heroCtaSecondary}
          </Link>
        </div>
      </div>
      <HomeClient dictionary={dictionary} />
    </section>
  );
}
