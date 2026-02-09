import { getDictionary } from "@/lib/i18n/resources";
import { getLocaleFromCookie } from "@/lib/i18n/locale";

export default async function SettingsPage() {
  const locale = await getLocaleFromCookie();
  const dictionary = getDictionary(locale);

  return (
    <section className="grid gap-6">
      <h1 className="text-3xl font-semibold text-ink">{dictionary.settingsTitle}</h1>
      <p className="max-w-2xl text-base text-ink/70">{dictionary.settingsBody}</p>
    </section>
  );
}
