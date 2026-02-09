import { getDictionary } from "@/lib/i18n/resources";
import { getLocaleFromCookie } from "@/lib/i18n/locale";

export default async function AboutPage() {
  const locale = await getLocaleFromCookie();
  const dictionary = getDictionary(locale);

  return (
    <section className="grid gap-6">
      <h1 className="text-3xl font-semibold text-ink">{dictionary.aboutTitle}</h1>
      <p className="max-w-2xl text-base text-ink/70">{dictionary.aboutBody}</p>
      <ul className="max-w-2xl list-disc space-y-2 pl-5 text-base text-ink/70">
        <li>{dictionary.aboutDetailAuth}</li>
        <li>{dictionary.aboutDetailGraph}</li>
        <li>{dictionary.aboutDetailLang}</li>
        <li>{dictionary.aboutDetailContainer}</li>
      </ul>
    </section>
  );
}
