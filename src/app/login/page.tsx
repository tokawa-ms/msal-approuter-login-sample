import LoginClient from "@/components/login/LoginClient";
import { getDictionary } from "@/lib/i18n/resources";
import { getLocaleFromCookie } from "@/lib/i18n/locale";

export default async function LoginPage() {
  const locale = await getLocaleFromCookie();
  const dictionary = getDictionary(locale);

  return (
    <section className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold text-ink">{dictionary.loginTitle}</h1>
        <p className="mt-2 text-base text-ink/70">{dictionary.loginLead}</p>
      </div>
      <LoginClient dictionary={dictionary} />
    </section>
  );
}
